import { Component, OnInit, Input } from '@angular/core';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';
import { Publicacion } from 'src/app/modelo/publicacion';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { IonText, IonContent, IonCard, IonCardContent, IonLabel, IonButton, IonList, IonItem, IonGrid, IonCol, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonRow } from '@ionic/angular/standalone';
import { ListaPublicacionesComponent } from '../lista-publicaciones/lista-publicaciones.component';



@Component({
  selector: 'app-publicaciones',
  templateUrl: './app-publicaciones.component.html',
  styleUrls: ['./app-publicaciones.component.scss'],
  standalone: true,
  imports: [CommonModule, IonText, IonContent, IonCard, IonCardContent, IonLabel, IonButton, IonList, IonItem, IonGrid, IonRow, IonCol, IonIcon, ListaPublicacionesComponent]
})
export class AppPublicacionesComponent  implements OnInit {
[x: string]: any;

  @Input() publicacionAleatoria: Publicacion | null = null;
  @Input() borrarPublicacionesEnInicio: boolean = false;

  constructor( 
    private publicacionesService: PublicacionesService,
    private configuracionService: ConfiguracionService
  ) { }

  async ngOnInit() {
    this.borrarPublicacionesEnInicio = await this.configuracionService.borrarPublicacionesInicio();
    this.obtenerPublicacionAleatoria();
  }

  async obtenerPublicacionAleatoria(): Promise<void> {
    if (this.borrarPublicacionesEnInicio) {
      this.publicacionAleatoria = null;
    } else {
      this.publicacionAleatoria = await this.publicacionesService.obtenerPublicacionAleatoria();
    }
  }
}

