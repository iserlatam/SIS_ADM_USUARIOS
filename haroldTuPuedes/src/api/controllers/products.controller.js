import conn from '../../db/conn.js';

export const getProducts = (req, res) => {
  try {
    conn.query('SELECT * FROM products', (err, results) => {
      if (err) throw err;
      res.json({ data: results });
    });
  } catch (e) {
    console.error(e);
  }
};

export const getProductById = (req, res) => {
  const { id } = req.params;

  try {
    conn.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
      if (err) throw err;
      res.json({
        data: results,
        message: `Datos recopilados para producto No. ${id}`,
      });
    });
  } catch (e) {
    console.error(e);
  }
};

export const getProductByName = (req, res) => {
  const { nombre } = req.params;

  try {
    conn.query(
      'SELECT * FROM products WHERE nombre = ?',
      [nombre],
      (err, results) => {
        if (err) throw err;
        res.json({
          data: results,
          message: `Nombre del producto: ${nombre} recopilado con éxito`,
        });
      }
    );
  } catch (e) {
    console.error(e);
  }
};

export const postProduct = (req, res) => {
  const { precio } = req.body;

  let nombre = req.body.nombre

  const fixedNombre = nombre.toLowerCase()
  nombre = fixedNombre

  try {
    conn.query(
      'INSERT INTO products(nombre, precio) VALUES (?,?)',
      [nombre, precio],
      (err, results) => {
        if (err) throw err;
        res.json({ message: 'ok' });
      }
    );
  } catch (error) {}
};
