import bcrypt from 'bcrypt';
import connection from '../../db/conn.js';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { generateToken } from '../../auth/authJwt.js';

export const registro = (req, res) => {
  try {
    const { usuario, correo, clave } = req.body;

    const saltRounds = 10;

    bcrypt.hash(clave, saltRounds).then((hash) => {
      connection.query(
        'INSERT INTO usuarios (alias, correo, clave) VALUES (?,?,?)',
        [usuario, correo, hash],
        (err, results) => {
          if (err) throw err;

          res.status(200).send({
            message: 'usuario registrado exitosamente',
            resStatus: 'ok',
            results,
          });

          connection.end();
        }
      );
    });
  } catch (e) {
    console.error(e);
  }
};

export const ingreso = (req, res) => {
  try {
    const { correo, clave } = req.body;
    const { error } = validateLogin(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    connection.query(
      'SELECT clave FROM usuarios WHERE correo = ?',
      [correo],
      (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
          res.send({ message: 'Credenciales incorrectas' });
        } else {
          const hash = results[0].clave;

          bcrypt.compare(clave, hash, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              connection.query(
                'SELECT * FROM usuarios WHERE correo = ?',
                [correo],
                async (err, results) => {
                  if (err) throw err;
                  const user = results[0];
                  const tokenSession = await generateToken(user);
                  res.send({
                    data: tokenSession,
                    message: 'Ingresó con éxito',
                  });
                }
              );
            } else {
              res.send({ message: 'Credenciales incorrectas' });
            }
          });
        }
      }
    );
  } catch (e) {
    console.error(e);
  }
};

export const validateLogin = (data) => {
  const schema = Joi.object({
    correo: Joi.string().email().required().label('Correo'),
    clave: Joi.string().required().label('clave'),
  });
  return schema.validate(data);
};
