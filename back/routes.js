import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./config/config.js";
import express from "express";
import { validateCredentials } from "./controllers/login.controller.js"
import { addUser, getUserById, getUsers, removeUser, updateUser } from "./controllers/user.controller.js"

export const routes = (app) => {
    app.route('/api/login')
        .post(validateCredentials)
        
    app.route('/api/users')
        .get(checkToken, getUsers)

    app.route('/api/user')
        .get(checkToken, getUserById)
        .post(addUser)
        .delete(checkToken, removeUser)
        .put(checkToken, updateUser)
}

const checkToken = express.Router();
checkToken.use((req, res, next) => {
    const token = req.header('Authorization');

    if(token){
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if(err){
                return res.json({
                    status: 400,
                    message: 'Token inválido'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            status: 400,
            message: 'Token necesario'
        });
    }
});