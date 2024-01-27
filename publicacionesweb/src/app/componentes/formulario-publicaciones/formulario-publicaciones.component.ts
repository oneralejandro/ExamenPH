import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';
import { Publicacion } from 'src/app/modelo/publicacion';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { IonList, IonText, IonCard, IonCardContent, IonCardSubtitle, IonItem, IonInput, IonButton, IonLabel, IonIcon,IonThumbnail }  from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CamaraPage } from 'src/app/camara/camara/camara.page';

@Component({
  selector: 'app-formulario-publicaciones',
  templateUrl: './formulario-publicaciones.component.html',
  styleUrls: ['./formulario-publicaciones.component.scss'],
  standalone: true,
  imports: [FormsModule,CamaraPage, CommonModule, IonList, IonText, IonCard, IonCardContent, IonCardSubtitle, IonItem, IonInput, IonButton, IonLabel, IonIcon, IonThumbnail],
})

export class FormularioPublicacionesComponent  implements OnInit {

  @Output() onPublicacionAgregada = new EventEmitter<Publicacion>();

  nuevaPublicacion: Publicacion = { descripcion: '', titulo: '',fecha: '' };

  constructor(private publicacionesService: PublicacionesService) { 
    addIcons({
      addOutline
    })
  }

  ngOnInit() {
  }

  async onClick() {
    await this.publicacionesService.agregarPublicacion(this.nuevaPublicacion);
    this.onPublicacionAgregada.emit(this.nuevaPublicacion);  
    this.nuevaPublicacion = { descripcion: '', titulo: '', fecha: '' };
  }
}
