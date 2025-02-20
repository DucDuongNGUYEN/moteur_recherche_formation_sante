import { elasticClient } from "../config/database.js";

export const searchIndex = (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).send("Bad Request: missing q parameter");
  }

  elasticClient
    .search({
      index: "formation_data",
      // type: "_doc",
      body: {
        query: {
          bool: {
            should: [
              {
                match: {
                  public_cible: {
                    query: q,
                    boost: 3, // Définir une priorité plus élevée
                  },
                },
              },
              {
                match: {
                  theme: {
                    query: q,
                    boost: 2, // Définir une priorité plus élevée
                  },
                },
              },
              {
                match: {
                  type_structure: {
                    query: q,
                    boost: 3, // Définir une priorité plus élevée
                  },
                },
              },
              {
                match: {
                  type_formation: {
                    query: q,
                    boost: 2, // Définir une priorité plus élevée
                  },
                },
              },
              {
                match: {
                  titre: {
                    query: q,
                    boost: 1,
                  },
                },
              },
              // Les autres champs n’ont pas de priorité particulière
              {
                multi_match: {
                  query: q,
                  fields: [
                    "structure",
                    "region",
                    "categorie_duree",
                    "financement_possible",
                  ],
                  fuzziness: "AUTO",
                  analyzer: "ngram_analyzer",
                },
              },
            ],
          },
        },
        highlight: {
          fields: {
            titre: {},
            region: {},
            theme: {},
            type_structure: {},
            type_formation: {},
            categorie_duree: {},
            public_cible: {},
            financement_possible: {},
          },
        },
      },
    })
    .then((response) => {
      const data = response.hits.hits.map((hit) => hit._source);
      res.send(data);
    })
    .catch((err) => {
      console.error("Error retrieving data from Elasticsearch:", err);
      res.status(500).send("Internal Server Error");
    });
};

// import { elasticClient } from "../config/database.js";

// export const searchIndex = (req, res) => {
//   const { q } = req.query;

//   if (!q) {
//     return res.status(400).send("Bad Request: missing q parameter");
//   }

//   elasticClient
//     .search({
//       index: "formation_data",
//       type: "_doc",
//       body: {
//         query: {
//           multi_match: {
//             query: q,
//             fields: [
//               "titre",
//               "structure",
//               "region",
//               "theme",
//               "type_structure",
//               "type_formation",
//               "categorie_duree",
//               "public_cible",
//               "financement_possible",
//             ],
//             fuzziness: "AUTO",
//             analyzer: "ngram_analyzer",
//             // analyzer: "custom_analyzer",
//           },
//           match_phrase_prefix: {
//             categorie_duree: {
//               query: ["jour", "jours"],
//               max_expansions: 4,
//             },
//           },
//         },
//         highlight: {
//           fields: {
//             titre: {},
//             region: {},
//             theme: {},
//             type_structure: {},
//             type_formation: {},
//             categorie_duree: {},
//             public_cible: {},
//             financement_possible: {},
//           },
//         },
//       },
//     })
//     .then((response) => {
//       const data = response.hits.hits.map((hit) => hit._source);
//       res.send(data);
//     })
//     .catch((err) => {
//       console.error("Error retrieving data from Elasticsearch:", err);
//       res.status(500).send("Internal Server Error");
//     });
// };

// import { elasticClient } from "../config/database.js";

// export const searchIndex = (req, res) => {
//   const { q } = req.query;

//   if (!q) {
//     return res.status(400).send("Bad Request: missing q parameter");
//   }

//   elasticClient
//     .search({
//       index: "formation_data",
//       body: {
//         query: {
//           multi_match: {
//             query: q,
//             fields: [
//               "titre",
//               "structure",
//               "region",
//               "theme",
//               "type_structure",
//               "type_formation",
//               "categorie_duree",
//               "public_cible",
//               "financement_possible",
//             ],
//             fuzziness: "AUTO",
//             analyzer: "custom_analyzer",
//           },
//         },
//         highlight: {
//           fields: {
//             titre: {},
//             region: {},
//             theme: {},
//             type_structure: {},
//             type_formation: {},
//             categorie_duree: {},
//             public_cible: {},
//             financement_possible: {},
//           },
//         },
//       },
//       settings: {
//         analysis: {
//           analyzer: {
//             custom_analyzer: {
//               tokenizer: "standard",
//               filter: ["lowercase", "stemmer"],
//             },
//           },
//           filter: {
//             stemmer: {
//               type: "stemmer",
//               language: "french",
//             },
//           },
//         },
//       },
//     })
//     .then((response) => {
//       const data = response.body.hits.hits.map((hit) => hit._source);
//       res.send(data);
//     })
//     .catch((err) => {
//       console.error("Error retrieving data from Elasticsearch:", err);
//       res.status(500).send("Internal Server Error");
//     });
// };

// import { elasticClient } from "../config/database.js";

// export const searchIndex = (req, res) => {
//   const { q } = req.query;

//   if (!q) {
//     return res.status(400).send("Bad Request: missing q parameter");
//   }

//   elasticClient
//     .search({
//       index: "formation_data",
//       type: "_doc",
//       body: {
//         query: {
//           bool: {
//             must: [
//               {
//                 multi_match: {
//                   query: q,
//                   fields: [
//                     "titre",
//                     "structure",
//                     "region",
//                     "theme",
//                     "type_structure",
//                     "type_formation",
//                     "categorie_duree",
//                     "public_cible",
//                     "financement_possible",
//                   ],
//                   fuzziness: "AUTO",
//                   analyzer: "ngram_analyzer",
//                 },
//               },
//               {
//                 bool: {
//                   should: [
//                     {
//                       match_phrase_prefix: {
//                         categorie_duree: {
//                           query: "jour",
//                           max_expansions: 1,
//                         },
//                       },
//                     },
//                     {
//                       match_phrase_prefix: {
//                         categorie_duree: {
//                           query: "jours",
//                           max_expansions: 1,
//                         },
//                       },
//                     },
//                   ],
//                 },
//               },
//             ],
//           },
//         },
//         highlight: {
//           fields: {
//             titre: {},
//             region: {},
//             theme: {},
//             type_structure: {},
//             type_formation: {},
//             categorie_duree: {},
//             public_cible: {},
//             financement_possible: {},
//           },
//         },
//       },
//     })
//     .then((response) => {
//       const data = response.hits.hits.map((hit) => hit._source);
//       res.send(data);
//     })
//     .catch((err) => {
//       console.error("Error retrieving data from Elasticsearch:", err);
//       res.status(500).send("Internal Server Error");
//     });
// };
