import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NetworkService } from '../../services/network.service';
import { ReceivePaymentsAttempt, StorageService } from '../../services/storage.service';

interface DraggableOption {
  id: string;
  label: string;
  hint: string;
}

@Component({
  selector: 'app-recibir-pagos',
  templateUrl: 'recibir-pagos.page.html',
  styleUrls: ['recibir-pagos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class RecibirPagosPage implements OnInit, OnDestroy {
  private networkService = inject(NetworkService);
  private storageService = inject(StorageService);
  private networkSubscription!: Subscription;

  isOnline = true;
  selectedOptionId: string | null = null;
  dropMessage = 'Arrastra la opción correcta hasta aquí.';
  feedback = '';
  history: ReceivePaymentsAttempt[] = [];
  attempts = 0;
  correctAttempts = 0;

  readonly correctOptionId = 'verify-sender';

  readonly guidePoints = [
    'Comparte tu número o QR solo desde la app y con personas de confianza para que te envíen el dinero correcto.',
    'Antes de aceptar, revisa el nombre del remitente, la referencia del pago y el valor esperado.',
    'Cuando el dinero llegue, confirma el saldo y abre el comprobante para verificar que la operación sí quedó registrada.',
    'Si algo no coincide, no compartas datos adicionales y conserva la operación dentro de la app como respaldo.'
  ];

  readonly options: DraggableOption[] = [
    {
      id: 'verify-sender',
      label: 'Verificar nombre y referencia del remitente',
      hint: 'Es el paso correcto porque protege tu cuenta y confirma quién envía el pago.'
    },
    {
      id: 'share-password',
      label: 'Compartir tu clave para recibir el pago más rápido',
      hint: 'Nunca debes hacerlo, porque tu clave no se comparte para recibir dinero.'
    },
    {
      id: 'ignore-proof',
      label: 'Ignorar el comprobante y confiar solo en el mensaje',
      hint: 'No confirma la operación ni te asegura que el dinero haya llegado.'
    }
  ];

  ngOnInit() {
    this.networkSubscription = this.networkService.online$.subscribe(status => this.isOnline = status);
    void this.loadHistory();
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  onDragStart(event: DragEvent, optionId: string) {
    this.selectedOptionId = optionId;
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', optionId);
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const optionId = event.dataTransfer?.getData('text/plain') || this.selectedOptionId;

    if (!optionId) {
      return;
    }

    this.selectedOptionId = optionId;
    const option = this.options.find(item => item.id === optionId);
    this.dropMessage = option ? `Has soltado: ${option.label}` : 'Opción recibida.';
  }

  async validarRespuesta() {
    if (!this.selectedOptionId) {
      this.feedback = '⚠️ Arrastra una opción al cuadro antes de validar.';
      return;
    }

    const isCorrect = this.selectedOptionId === this.correctOptionId;
    const attempt: ReceivePaymentsAttempt = {
      selectedOption: this.selectedOptionId,
      isCorrect,
      savedAt: new Date().toISOString()
    };

    await this.storageService.saveReceivePaymentsAttempt(attempt);
    await this.storageService.saveModuleProgressForCurrentUser('receivePayments', isCorrect ? 1 : 0.5);

    this.history = await this.storageService.loadReceivePaymentsHistory();
    this.attempts = this.history.length;
    this.correctAttempts = this.history.filter(item => item.isCorrect).length;
    this.feedback = isCorrect
      ? '🎉 Correcto. Ya identificaste la acción segura para recibir pagos.'
      : '👍 Intenta de nuevo: la opción correcta protege tu cuenta y confirma el remitente.';
    this.dropMessage = isCorrect
      ? 'Validación completada. Puedes volver a probar para mejorar tu historial.'
      : 'Arrastra la opción correcta nuevamente para mejorar tu resultado.';
  }

  private async loadHistory() {
    this.history = await this.storageService.loadReceivePaymentsHistory();
    this.attempts = this.history.length;
    this.correctAttempts = this.history.filter(item => item.isCorrect).length;
  }
}