import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { routes } from "./routes.js";

const PORT = 3000;
const HOSTNAME = 'localhost';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
routes(app);

app.listen(PORT, HOSTNAME, () => {
    console.log('api server online at http://' + HOSTNAME + ':' + PORT);
});