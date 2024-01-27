import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';
import { Publicacion } from 'src/app/modelo/publicacion';
import { CommonModule } from '@angular/common';
import { IonText, IonCol, IonRow, IonGrid, IonList, IonItem, IonButton, IonIcon,  } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { GestionPublicacionesPage } from 'src/app/paginas/gestion-publicaciones/gestion-publicaciones.page';

@Component({
  selector: 'app-lista-publicaciones',
  templateUrl: './lista-publicaciones.component.html',
  styleUrls: ['./lista-publicaciones.component.scss'],
  standalone: true,
  imports: [CommonModule, IonText, IonCol, IonRow, IonGrid, IonList, IonItem, IonButton, IonIcon, ListaPublicacionesComponent, GestionPublicacionesPage ]
})
export class ListaPublicacionesComponent  implements OnInit {

  @Input() publicaciones: Publicacion[] = [];

  @Output() publicacionEliminada = new EventEmitter<number>();

  constructor(
    private publicacionesService: PublicacionesService
  ) {
    addIcons({
      trashOutline
    })
  }

  async ngOnInit() {
    await this.publicacionesService.iniciarPlugin()
    await this._actualizar()
  }

  async _actualizar() {
    this.publicaciones = await this.publicacionesService.obtenerTodasLasPublicaciones()
  }
    
}
