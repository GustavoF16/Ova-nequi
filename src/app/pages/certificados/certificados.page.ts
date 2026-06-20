import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { jsPDF } from 'jspdf';
import { Subscription } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-certificados',
  templateUrl: 'certificados.page.html',
  styleUrls: ['certificados.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class CertificadosPage implements OnInit, OnDestroy {
  private networkService = inject(NetworkService);
  private storageService = inject(StorageService);

  isOnline = true;
  private networkSubscription!: Subscription;

  nombre: string = '';
  cedula: string = '';
  fecha: string = new Date().toLocaleDateString();
  mensaje: string = '';

  constructor() {}

  ngOnInit() {
    this.networkSubscription = this.networkService.online$.subscribe(
      status => this.isOnline = status
    );
  }

  ionViewWillEnter() {
    this.cargarCertificado();
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  async cargarCertificado() {
    this.nombre = '';
    this.cedula = '';

    const login = await this.storageService.loadLogin();

    if (login?.email) {
      const user = await this.storageService.loadUserProfile(login.email);

      if (user) {
        this.nombre = `${user.nombre ?? ''} ${user.apellido ?? ''}`.trim();
        this.cedula = user.cedula ?? '';
      }
    }

    const saved = await this.storageService.loadCertificate();

    if (saved) {
      this.fecha = saved.fecha;
    }
  }

  async generarCertificado() {
    await this.storageService.saveCertificate({
      nombre: this.nombre,
      fecha: this.fecha
    });

    await this.storageService.saveModuleProgressForCurrentUser('certificate', 1);

    this.mensaje = '✅ Certificado generado correctamente';
  }

  descargarPDF() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    const frameInset = 20;
    const title = 'Certificado de finalización';
    const recipient = this.nombre || 'Participante';
    const documentNumber = this.cedula ? `C.C. ${this.cedula}` : '';
    const course = 'Uso básico de Nequi';
    const issued = `Emitido el ${this.fecha}`;
    const body = [
      'Este certificado acredita que el participante ha completado',
      `el curso ${course} con éxito.`
    ];

    doc.setLineWidth(2);
    doc.setDrawColor('#0d6efd');
    doc.rect(frameInset, frameInset, pageWidth - frameInset * 2, pageHeight - frameInset * 2, 'S');

    doc.setFillColor('#0d6efd');
    doc.rect(margin, margin, pageWidth - margin * 2, 70, 'F');

    doc.setFontSize(16);
    doc.setTextColor('#ffffff');
    doc.text('OVA NEQUI', margin + 12, margin + 42);

    doc.setFontSize(10);
    doc.text('Aprendizaje financiero accesible', margin + 12, margin + 58);

    doc.setFontSize(24);
    doc.setTextColor('#111827');
    doc.text(title, pageWidth / 2, 150, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor('#64748b');
    doc.text('Documento oficial de finalización', pageWidth / 2, 170, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.setDrawColor('#0d6efd');
    doc.line(margin, 190, pageWidth - margin, 190);

    doc.setFontSize(14);
    doc.setTextColor('#212529');
    doc.text('Otorgado a:', margin + 10, 230);

    doc.setFontSize(28);
    doc.setTextColor('#0d6efd');
    doc.text(recipient, margin + 10, 270);

    if (documentNumber) {
      doc.setFontSize(14);
      doc.setTextColor('#475569');
      doc.text(documentNumber, margin + 10, 295);
    }

    doc.setFontSize(16);
    doc.setTextColor('#111827');
    const splitText = doc.splitTextToSize(body.join(' '), pageWidth - margin * 2 - 20);
    doc.text(splitText, margin + 10, 330);

    doc.setFontSize(18);
    doc.setTextColor('#0d6efd');
    doc.text(course, margin + 10, 390);

    doc.setFontSize(12);
    doc.setTextColor('#475569');
    doc.text(issued, margin + 10, 430);

    doc.setFontSize(10);
    doc.setTextColor('#64748b');
    doc.text('Certificado generado desde OVA NEQUI', margin + 10, pageHeight - 40);
    doc.text('www.ova-nequi.example', pageWidth - margin - 10, pageHeight - 40, { align: 'right' });

    doc.save('certificado-nequi.pdf');

    this.mensaje = '📄 PDF descargado correctamente';
  }
}