import { Component } from '@angular/core';
import { IonLabel, IonFabButton, IonFab, IonCardContent, IonCard, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline, addCircle} from 'ionicons/icons';
import { PublicacionesService } from '../servicios/publicaciones.service';
import { Publicacion } from '../modelo/publicacion';
import { RouterModule } from '@angular/router';
import { ConfiguracionService } from '../servicios/configuracion.service';
import { CommonModule } from '@angular/common';
import { AppPublicacionesComponent } from '../componentes/app-publicaciones/app-publicaciones.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ AppPublicacionesComponent, CommonModule, IonLabel, RouterModule, IonFabButton, IonFab, IonCardContent, IonCard, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  publicacionAleatoria: Publicacion | null = null;
  borrarPublicacionesEnInicio: boolean = false;

  constructor(
    private publicacionesService: PublicacionesService,
    private configuracionService: ConfiguracionService) 
    {
    addIcons({
      settingsOutline,
      addCircle
    })
  }

  async ngOnInit() {
    this.borrarPublicacionesEnInicio = await this.configuracionService.borrarPublicacionesInicio();
    if (!this.borrarPublicacionesEnInicio) {
      await this.obtenerPublicacionAleatoria();
    }
  }

  async obtenerPublicacionAleatoria(): Promise<void> {
    if (this.borrarPublicacionesEnInicio) {
      this.publicacionAleatoria = null;
    } else {
      this.publicacionAleatoria = await this.publicacionesService.obtenerPublicacionAleatoria();
    }
  }
}
