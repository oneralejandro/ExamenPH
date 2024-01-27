import { Injectable } from '@angular/core';
import { Publicacion } from '../modelo/publicacion';
import { ConfiguracionService } from './configuracion.service';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  sqlite:SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  db!: SQLiteDBConnection
  plataforma:string = "";

  DB_NAME: string        = "lista_publicaciones";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string        = "no-encryption";
  DB_VERSION: number     = 2;
  DB_READ_ONLY: boolean  = false;
  
  TABLE_NAME: string     = "lista_publicaciones";
  COL_DESCRIPCION: string      = "descripcion";
  COL_TITULO: string      = "titulo";
  COL_FECHA: string = "fecha";
  DB_SQL_TABLAS: string  = `
  CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
    id INTEGER PRIMARY KEY,
    ${this.COL_DESCRIPCION} TEXT NOT NULL,
    ${this.COL_TITULO} TEXT NOT NULL,
    ${this.COL_FECHA} TEXT NOT NULL
    
  )
`;

  constructor(
    private configuracionService: ConfiguracionService
  ) { }

  private async _iniciarPluginWeb(): Promise<void> {    
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector("jeep-sqlite")
    if( jeepSqliteEl != null ) {      
      await this.sqlite.initWebStore()            
    }
}

  async iniciarPlugin() {    
    this.plataforma = Capacitor.getPlatform()
    if(this.plataforma == "web") {
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion();

    await this.db.execute(this.DB_SQL_TABLAS) 

    
  }

  async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency() 
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
    if(ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)      
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
    }
  await this.db.open()
}

  async obtenerPublicacionAleatoria(): Promise<Publicacion | null> {
    if (await this.getBorrarPublicacionesEnInicio()) {
      return null;
    }
    const publicaciones = await this.obtenerTodasLasPublicaciones();
    const indiceAleatorio = Math.floor( publicaciones.length);
    return publicaciones[indiceAleatorio];
  }

  async obtenerTodasLasPublicaciones(): Promise<Publicacion[]> {
    const sql = `SELECT * FROM ${this.TABLE_NAME}`;
    const resultado = await this.db.query(sql);
    return resultado?.values ?? [];
}



  async agregarPublicacion(publicacion:Publicacion) {
    const sql = `INSERT INTO ${this.TABLE_NAME}(${this.COL_DESCRIPCION}, ${this.COL_TITULO},${this.COL_FECHA})  VALUES (?, ?, ?)`;
    await this.db.run(sql, [publicacion.descripcion, publicacion.titulo, publicacion.fecha])
  }

  async eliminarPublicacion(id:number) {
    const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`;
    await this.db.run(sql, [id]);
  }

  async getBorrarPublicacionesEnInicio(): Promise<boolean> {
    const configuracion = await this.configuracionService.borrarPublicacionesInicio();
    return configuracion;
  }
}