// import body_parser- an permetant d’analyser la demande et de créer l’objet req.body
import bodyParser from "body-parser";

//import express pour construire le REST apis
import express from "express";

// import cors - fournit un middleware Express pour activer CORS avec diverses options, connecter le frontend
import cors from "cors";

//import routes
import router from "./routes/routes.js";

import cookieParser from "cookie-parser";

//init Express
const app = express();

//utiliser l'Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//utiliser cors
app.use(cors());

//utiliser cookieParser
app.use(cookieParser());
// utiliser les routers
app.use(router);

app.get("/", function (req, res) {
  res.json({ message: "Bienvenue à api de formation" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
