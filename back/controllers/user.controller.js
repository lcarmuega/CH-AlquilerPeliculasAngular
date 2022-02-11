import { users } from "../data.js";

export const getUsers = (req, res) => {
  res.send(users);
};

export const getUserById = (req, res) => {
  const id = req.query.id;
  const indexUser = users.findIndex( u => u.id == id );

  if (indexUser >= 0) {
    res.send({
      status: 200,
      user: users[indexUser],
    });
  } else {
    res.send({
      status: 400,
      message: "ID inválido",
    });
  }
};

export const addUser = (req, res) => {
  let user = req.body;

  if(user.nombre !== "" && user.email !== "" && user.password !== "" && (user.rol === "user" || user.rol === "admin")){
    let indexEmail = users.findIndex( u => u.email === user.email );
    
    if(indexEmail < 0){
      user = {
        "nombre": user.nombre,
        "email": user.email,
        "password": user.password,
        "rol": user.rol,
        "id": users.length + 1
      };
      users.push(user);
  
      res.send({
        status: 200,
        user
      });
    } else {
      res.send({
        status: 400,
        message: "El email ingresado ya está registrado",
      });
    }    
  } else { 
    res.send({
      status: 400,
      message: "Los datos son obligatorios",
    });
  }
};

export const removeUser = (req, res) => {
  const id = req.query.id;
  const indexUser = users.findIndex( u => u.id == id );

  if (indexUser >= 0) {
    users.splice(indexUser, 1),
      res.send({
        status: 200,
        users,
      });
  } else {
    res.send({
      status: 400,
      message: "ID inválido",
    });
  }
};

export const updateUser = (req, res) => {
  const id = req.query.id;
  const user = req.body;
  const indexUser = users.findIndex( u => u.id == id );

  if (indexUser >= 0 && user.nombre !== "" && user.email !== "" && user.password !== "" && (user.rol === "user" || user.rol === "admin")) {
    users[indexUser].nombre = req.body.nombre;
    users[indexUser].email = req.body.email;
    users[indexUser].password = req.body.password;
    users[indexUser].rol = req.body.rol;
    res.send({
      status: 200,
      user: users[indexUser],
    });
  } else {
    res.send({
      status: 400,
      message: "Datos inválidos",
    });
  }
};
