// Importamos el paquete express
const express = require("express");

// Creamos un objeto Router
const premios = express.Router();

/* 
const sqlite3 = require('sqlite3').verbose();

// Crear una nueva instancia de la base de datos
const db = new sqlite3.Database("../../data/premios.sql");

// Ejecutar una consulta SQL
db.all('SELECT * FROM campeonatos ', (error, rows) => {
  if (error) {
    throw error;
  }
  // Manipular los resultados de la consulta
  console.log(rows);
});

// Cerrar la conexión a la base de datos
db.close();
 */

const sqlite3 = require('sqlite3').verbose();

// Abrir la base de datos
let db = new sqlite3.Database('../../data/premios.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado a la base de datos.');
});

// Consultar datos de la tabla
db.all(`SELECT * FROM campeonatos`, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(`${row.id} - ${row.name}`);
  });
});

// Cerrar la base de datos
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conexión a la base de datos cerrada.');
});







// Exportamos el objeto Router
module.exports = premios;