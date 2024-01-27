import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Photo, CameraResultType, Camera } from '@capacitor/camera';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CamaraPage  {
  foto:Photo|null = null
  photo: any;
  
  
    async tomarFoto(){
      this.photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        saveToGallery: true,
        correctOrientation: true
      })
    }
  
    constructor(
      private router: Router,
    ) { }
  
    }