import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private readonly KEY_BORRAR_INICIO = "BORRAR"

  constructor() { }

  async borrarPublicacionesInicio(): Promise<boolean> {
    const resultado = await Preferences.get({ key: this.KEY_BORRAR_INICIO }); 
    return resultado?.value == "true" ?? false;
  }

  async setBorrarPublicacionesInicio(borrarPublicacionesEnInicio: boolean): Promise<void> {
    await Preferences.set({
      key: this.KEY_BORRAR_INICIO,
      value: borrarPublicacionesEnInicio ? "true" : "false"
    });
  }
}
