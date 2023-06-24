import mysql from 'mysql';


const dbOptions = {
  user,
  password,
  host,
  database
}

const connection = mysql.createConnection(dbOptions);

connection.connect(err => {
  if (err) throw err;
  console.log('Conectado correctamente a la DB');
})

export default connection