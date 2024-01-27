import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListaPublicacionesComponent } from 'src/app/componentes/lista-publicaciones/lista-publicaciones.component';
import { FormularioPublicacionesComponent } from 'src/app/componentes/formulario-publicaciones/formulario-publicaciones.component';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';
import { Publicacion } from 'src/app/modelo/publicacion';

@Component({
  selector: 'app-gestion-publicaciones',
  templateUrl: './gestion-publicaciones.page.html',
  styleUrls: ['./gestion-publicaciones.page.scss'],
  standalone: true,
  imports: [FormularioPublicacionesComponent, ListaPublicacionesComponent, IonicModule, CommonModule, FormsModule]
})
export class GestionPublicacionesPage implements OnInit {

  listaPublicaciones: Publicacion[] = [];

  constructor(
    private publicacionesService: PublicacionesService
  ) { }

  async ngOnInit() {
    
    await this._actualizarPublicaciones
  }

  async manejarPublicacionEliminada(id: number){
    console.log(`Publicacion Eliminada en la posición ${id}`);
    await this.publicacionesService.eliminarPublicacion(id);
    await this._actualizarPublicaciones();
  }

  async onCrearPublicacion(nuevaPublicacion: Publicacion) {
    this.publicacionesService.agregarPublicacion(nuevaPublicacion);
    await this._actualizarPublicaciones(); 
  }

  async _actualizarPublicaciones() {
    this.listaPublicaciones = await this.publicacionesService.obtenerTodasLasPublicaciones();
  }
}

