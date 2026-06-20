import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NetworkService } from '../../services/network.service';
import { SendMoneyLessonAnswers, SendMoneyLessonRecord, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-enviar-dinero',
  templateUrl: 'enviar-dinero.page.html',
  styleUrls: ['enviar-dinero.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class EnviarDineroPage implements OnInit, OnDestroy {
  private networkService = inject(NetworkService);
  private storageService = inject(StorageService);
  private networkSubscription!: Subscription;

  isOnline = true;
  respuesta1 = '';
  respuesta2 = '';
  respuesta3 = '';
  mensaje = '';
  puntaje = 0;
  ultimaActualizacion = '';

  readonly pasos = [
    'Abre el módulo y confirma que estás enviando dinero a la persona correcta.',
    'Escribe el número celular del destinatario y revisa que no tenga errores.',
    'Ingresa el monto y valida que el saldo alcance antes de continuar.',
    'Lee el resumen final, confirma la operación y guarda el comprobante.'
  ];

  readonly opcionesPregunta1 = [
    { label: 'Revisar el número del destinatario antes de continuar', value: 'revisar-numero' },
    { label: 'Enviar sin verificar porque después se corrige', value: 'enviar-sin-verificar' },
    { label: 'Compartir la operación por redes sociales', value: 'compartir-redes' }
  ];

  readonly opcionesPregunta2 = [
    { label: 'Confirmar el monto antes de tocar enviar', value: 'confirmar-monto' },
    { label: 'Escribir cualquier valor y probar suerte', value: 'cualquier-valor' },
    { label: 'Cerrar la pantalla sin revisar nada', value: 'cerrar-pantalla' }
  ];

  readonly opcionesPregunta3 = [
    { label: 'Guardar el comprobante y verificar el estado de la operación', value: 'guardar-comprobante' },
    { label: 'Borrar la evidencia para no verla de nuevo', value: 'borrar-comprobante' },
    { label: 'Repetir el envío varias veces de inmediato', value: 'repetir-envio' }
  ];

  constructor() {
    void this.cargarLeccionGuardada();
  }

  ngOnInit() {
    this.networkSubscription = this.networkService.online$.subscribe(status => this.isOnline = status);
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  private async cargarLeccionGuardada() {
    const saved = await this.storageService.loadSendMoneyLesson();

    if (!saved) {
      return;
    }

    this.respuesta1 = saved.pregunta1;
    this.respuesta2 = saved.pregunta2;
    this.respuesta3 = saved.pregunta3;
    this.puntaje = saved.score;
    this.ultimaActualizacion = saved.savedAt;

    if (saved.completed) {
      this.mensaje = '✅ Ya completaste este módulo. Puedes volver a responder para mejorar tu puntaje.';
    }
  }

  async calificarRespuestas() {
    if (!this.respuesta1 || !this.respuesta2 || !this.respuesta3) {
      this.mensaje = '⚠️ Responde las 3 preguntas para evaluar lo aprendido.';
      return;
    }

    const correctas = {
      pregunta1: 'revisar-numero',
      pregunta2: 'confirmar-monto',
      pregunta3: 'guardar-comprobante'
    } satisfies SendMoneyLessonAnswers;

    let aciertos = 0;

    if (this.respuesta1 === correctas.pregunta1) aciertos += 1;
    if (this.respuesta2 === correctas.pregunta2) aciertos += 1;
    if (this.respuesta3 === correctas.pregunta3) aciertos += 1;

    this.puntaje = Math.round((aciertos / 3) * 100);

    const completed = aciertos === 3;

    const record: SendMoneyLessonRecord = {
      pregunta1: this.respuesta1,
      pregunta2: this.respuesta2,
      pregunta3: this.respuesta3,
      score: this.puntaje,
      completed,
      savedAt: new Date().toISOString()
    };

    await this.storageService.saveSendMoneyLesson(record);
    await this.storageService.saveModuleProgressForCurrentUser('sendMoney', this.puntaje / 100);

    this.ultimaActualizacion = record.savedAt;
    this.mensaje = completed
      ? '🎉 Respuestas correctas. Ya dominas los pasos básicos para enviar dinero.'
      : '👍 Buen intento. Revisa la guía y vuelve a intentarlo para mejorar tu puntaje.';
  }
}