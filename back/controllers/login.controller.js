import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import { users } from "../data.js";

export const validateCredentials = (req, res) => {
  const credentials = req.body;

  const indexUser = users.findIndex((u) => u.email === credentials.user);

  if (indexUser >= 0 && credentials.password === users[indexUser].password) {
    const payload = {
      user: credentials.user,
    };

    const token = jwt.sign(payload, SECRET_KEY);
    
    res.json({
      status: 200,
      token: token,
      user: users[indexUser]
    });
  } else {
    res.json({
      status: 400,
      message: "Usuario o contraseña incorrectos",
    });
  }
};
