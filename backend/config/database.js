import dotenv from "dotenv";
import mysql from "mysql2";
import elasticsearch from "elasticsearch";

// pour utiliser des variables environnementaux dans le fichier .env
dotenv.config();

// créer la connexion à la base de données
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT_DATABASE,
});

db.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database!");
});

export default db;

//connecter avec elasticsearch
const elasticClient = new elasticsearch.Client({
  node: process.env.NODE,
  maxRetries: 5,
  requestTimeout: 60000,
});

export { elasticClient };

// //Interroger des données à partir de MySQL
// db.query("SELECT * FROM formations", (err, results) => {
//   if (err) {
//     console.error("Erreur de requête MySQL :", err);
//     return;
//   }
//   console.log("Données de MySQL :", results);

//   /////////////////////Elasticsearch/////////////////
//   //  Se connecter à Elasticsearch

//   const elasticClient = new elasticsearch.Client({
//     node: "http://localhost:9200",
//     maxRetries: 5,
//     requestTimeout: 60000,
//   });

//   // Enregistrer des données de MySQL vers Elasticsearch
//   results.forEach((result) => {
//     elasticClient.exists(
//       {
//         index: "formation_data",
//         id: result.id,
//       },
//       (err, exists) => {
//         if (err) {
//           console.error("Error checking if data exists in Elasticsearch:", err);
//           return;
//         }

//         if (!exists) {
//           elasticClient.index(
//             {
//               index: "formation_data",
//               id: result.id,
//               body: result,
//             },
//             (err, response) => {
//               if (err) {
//                 console.error("Error indexing data into Elasticsearch:", err);
//                 return;
//               }
//               console.log("Data indexed into Elasticsearch:", response);
//             }
//           );
//         }
//       }
//     );
//   });

//   db.end();
// });
