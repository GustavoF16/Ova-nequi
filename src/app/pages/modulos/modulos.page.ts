import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-modulos',
  templateUrl: 'modulos.page.html',
  styleUrls: ['modulos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class ModulosPage implements OnInit, AfterViewInit, OnDestroy {
  private networkService = inject(NetworkService);
  isOnline = true;
  private networkSubscription!: Subscription;

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('subtitleTrack', { static: false }) subtitleTrack!: ElementRef<HTMLTrackElement>;

  captionNotice: string = 'Subtítulos en español cargados automáticamente.';

  ngOnInit() {
    this.networkSubscription = this.networkService.online$.subscribe(
      (status: boolean) => this.isOnline = status
    );
  }

  ngAfterViewInit() {
    this.setSubtitleTrack('assets/spanish-subtitles.vtt');
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  onSubtitleFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    if (!file.name.toLowerCase().endsWith('.vtt')) {
      this.captionNotice = 'Solo se admite un archivo VTT para subtítulos.';
      return;
    }

    const url = URL.createObjectURL(file);
    this.setSubtitleTrack(url);
    this.captionNotice = `Subtítulos cargados: ${file.name}`;
  }

  private setSubtitleTrack(src: string) {
    if (!this.subtitleTrack) {
      return;
    }

    const track = this.subtitleTrack.nativeElement as any;
    track.src = src;
    track.mode = 'showing';

    const video = this.videoPlayer?.nativeElement;
    if (video && video.textTracks.length) {
      (video.textTracks[0] as any).mode = 'showing';
    }
  }
}
