import mysql from 'mysql';

const host = 'localhost';
const user = 'root';
const password = '2105';
const database = 'harold';

const conn = mysql.createConnection({
  host,
  user,
  password,
  database,
});

conn.connect((err) => {
  if (err) throw err;
  console.log('Conectado correctamente a la DB');
});

export default conn;
