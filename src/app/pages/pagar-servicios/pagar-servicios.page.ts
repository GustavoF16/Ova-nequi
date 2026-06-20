import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NetworkService } from '../../services/network.service';
import { PayServicesAttempt, StorageService } from '../../services/storage.service';

type CrosswordAnswerKey = 'factura' | 'codigo' | 'saldo' | 'pago';

interface WordSearchWord {
  word: string;
  found: boolean;
}

@Component({
  selector: 'app-pagar-servicios',
  templateUrl: 'pagar-servicios.page.html',
  styleUrls: ['pagar-servicios.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class PagarServiciosPage implements OnInit, OnDestroy {
  private networkService = inject(NetworkService);
  private storageService = inject(StorageService);
  private networkSubscription!: Subscription;

  isOnline = true;
  crosswordAnswers: Record<CrosswordAnswerKey, string> = {
    factura: '',
    codigo: '',
    saldo: '',
    pago: ''
  };
  crosswordFeedback = '';
  crosswordScore = 0;

  wordSearchSelection: string[] = [];
  wordSearchFeedback = '';
  history: PayServicesAttempt[] = [];
  attempts = 0;
  correctAttempts = 0;

  readonly crosswordClues = [
    { key: 'factura' as const, clue: 'Documento que suele llegar por consumo de luz, agua o teléfono.' },
    { key: 'codigo' as const, clue: 'Dato que ingresas para validar un servicio o referencia.' },
    { key: 'saldo' as const, clue: 'Monto disponible en tu cuenta después de hacer el pago.' },
    { key: 'pago' as const, clue: 'Acción final para completar una transacción.' }
  ];

  readonly wordSearchWords: WordSearchWord[] = [
    { word: 'SERVICIO', found: false },
    { word: 'RECARGA', found: false },
    { word: 'FACTURA', found: false },
    { word: 'SALDO', found: false }
  ];

  readonly wordSearchGrid: string[][] = [
    ['S', 'E', 'R', 'V', 'I', 'C', 'I', 'O'],
    ['X', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
    ['R', 'E', 'C', 'A', 'R', 'G', 'A', 'J'],
    ['F', 'A', 'C', 'T', 'U', 'R', 'A', 'L'],
    ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
    ['S', 'A', 'L', 'D', 'O', 'W', 'X', 'Y'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
  ];

  readonly guideSteps = [
    'Reúne la referencia de pago y revisa que el servicio corresponda a tu nombre o contrato.',
    'Ingresa el código o número de cuenta del servicio exactamente como aparece en la factura.',
    'Confirma el valor total antes de enviar el dinero y revisa que el saldo sea suficiente.',
    'Guarda el comprobante y verifica que el pago quede registrado para futuras consultas.'
  ];

  ngOnInit() {
    this.networkSubscription = this.networkService.online$.subscribe(status => this.isOnline = status);
    void this.loadHistory();
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  async validateCrossword() {
    const normalized = {
      factura: this.clean(this.crosswordAnswers.factura),
      codigo: this.clean(this.crosswordAnswers.codigo),
      saldo: this.clean(this.crosswordAnswers.saldo),
      pago: this.clean(this.crosswordAnswers.pago)
    };

    const expected = {
      factura: 'FACTURA',
      codigo: 'CODIGO',
      saldo: 'SALDO',
      pago: 'PAGO'
    } satisfies Record<CrosswordAnswerKey, string>;

    const matched = (Object.keys(expected) as CrosswordAnswerKey[]).filter(key => normalized[key] === expected[key]).length;
    this.crosswordScore = Math.round((matched / 4) * 100);

    this.crosswordFeedback = matched === 4
      ? '✅ Crucigrama completo. Reconoces los elementos clave para pagar servicios.'
      : '🧠 Sigue intentándolo. Revisa las pistas y completa las palabras pendientes.';

    await this.saveAttempt();
  }

  toggleWord(word: WordSearchWord) {
    word.found = !word.found;
    this.wordSearchSelection = this.wordSearchWords.filter(item => item.found).map(item => item.word);
    this.updateWordSearchFeedback();
  }

  async finishWordSearch() {
    this.updateWordSearchFeedback();
    await this.saveAttempt();
  }

  getFoundCount(): number {
    return this.wordSearchWords.filter(item => item.found).length;
  }

  private updateWordSearchFeedback() {
    const foundCount = this.getFoundCount();
    if (foundCount === this.wordSearchWords.length) {
      this.wordSearchFeedback = '🎉 Encontraste todas las palabras clave de la sopa de letras.';
    } else {
      this.wordSearchFeedback = `Has encontrado ${foundCount} de ${this.wordSearchWords.length} palabras.`;
    }
  }

  private async saveAttempt() {
    const crosswordComplete = this.crosswordScore === 100;
    const wordSearchComplete = this.getFoundCount() === this.wordSearchWords.length;
    const completed = crosswordComplete && wordSearchComplete;

    const attempt: PayServicesAttempt = {
      crosswordAnswers: { ...this.crosswordAnswers },
      foundWords: [...this.wordSearchSelection],
      score: Math.round((this.crosswordScore + (this.getFoundCount() / this.wordSearchWords.length) * 100) / 2),
      completed,
      savedAt: new Date().toISOString()
    };

    await this.storageService.savePayServicesAttempt(attempt);
    await this.storageService.saveModuleProgressForCurrentUser('payServices', attempt.score / 100);
    this.history = await this.storageService.loadPayServicesHistory();
    this.attempts = this.history.length;
    this.correctAttempts = this.history.filter(item => item.completed).length;
  }

  private async loadHistory() {
    this.history = await this.storageService.loadPayServicesHistory();
    this.attempts = this.history.length;
    this.correctAttempts = this.history.filter(item => item.completed).length;
  }

  private clean(value: string): string {
    return value.trim().toUpperCase().replace(/\s+/g, '');
  }
}