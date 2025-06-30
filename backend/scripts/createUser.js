const bcrypt = require('bcrypt');
const pool = require('../src/config/db');

async function createUser() {
  try {
    // Primero crear dependencia si no existe
    const dependenciaResult = await pool.query(
      "INSERT INTO dependencias (nombre) VALUES ('Sistemas') ON CONFLICT DO NOTHING RETURNING id_dependencia"
    );
    
    let dependenciaId;
    if (dependenciaResult.rows.length > 0) {
      dependenciaId = dependenciaResult.rows[0].id_dependencia;
    } else {
      const existingDep = await pool.query("SELECT id_dependencia FROM dependencias WHERE nombre = 'Sistemas'");
      dependenciaId = existingDep.rows[0].id_dependencia;
    }

    // Encriptar contraseña
    const password = 'admin123';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Crear usuario admin
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, usuario, password_hash, rol, dependencia_id, correo, contacto) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      ['Administrador', 'admin', passwordHash, 'admin', dependenciaId, 'admin@sistema.com', '123456789']
    );

    console.log('Usuario creado exitosamente:');
    console.log(`Usuario: admin`);
    console.log(`Contraseña: ${password}`);
    console.log(`Rol: admin`);

    await pool.end();
  } catch (error) {
    console.error(' Error:', error.message);
    await pool.end();
  }
}

createUser(); 