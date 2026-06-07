import { Injectable } from '@angular/core';

import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private sqlite: SQLiteConnection =
  new SQLiteConnection(CapacitorSQLite);

  private db!: SQLiteDBConnection;

  constructor() {}

  async initDB() {

    // Crear conexión
    this.db = await this.sqlite.createConnection(
      'ova_nequi_db',
      false,
      'no-encryption',
      1,
      false
    );

    // Abrir base de datos
    await this.db.open();

    // Crear tabla progreso
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS progreso (
        id INTEGER PRIMARY KEY,
        porcentaje INTEGER
      );
    `);

    console.log('✅ Base de datos inicializada');
  }

  // ✅ Guardar progreso
  async guardarProgreso(porcentaje: number) {

    await this.db.run(
      `INSERT OR REPLACE INTO progreso
       (id, porcentaje)
       VALUES (1, ?);`,
      [porcentaje]
    );

    console.log('✅ Progreso guardado');
  }

  // ✅ Leer progreso
  async obtenerProgreso(): Promise<number> {

    const result = await this.db.query(
      `SELECT porcentaje
       FROM progreso
       WHERE id = 1;`
    );

    if (
      result.values &&
      result.values.length > 0
    ) {

      return result.values[0].porcentaje;

    }

    return 0;
  }

}