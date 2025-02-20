// import db from "../config/database.js";
// // récupérer des formations
// export const getFormations = (result) => {
//   db.query("SELECT * FROM formations", (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result(null, results);
//     }
//   });
// };

// //récupérer un formation par l'id.
// export const getFormationById = (id, result) => {
//   db.query("SELECT * FROM formations WHERE id = ?", [id], (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result(null, results[0]);
//     }
//   });
// };

// //insérer un formation
// export const insertFormation = (data, result) => {
//   db.query("INSERT INTO formations SET?", data, (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result(null, results[0]);
//     }
//   });
// };

// // mettre à jour  un formation
// export const updateFormationById = (data, id, result) => {
//   db.query(
//     "UPDATE formations SET type_structure =?, type_formation=?, titre =?, theme =?, public_cible=?, region=?, lieux=?, categorie_duree=?, duree=?, structure=?, responsable =?, diplome=?, prix=?, financement_possible=?,lien=? WHERE id=?",
//     [
//       data.type_structure,
//       data.type_formation,
//       data.titre,
//       data.theme,
//       data.public_cible,
//       data.region,
//       data.lieux,
//       data.categorie_duree,
//       data.duree,
//       data.structure,
//       data.responsable,
//       data.diplome,
//       data.prix,
//       data.financement_possible,
//       data.lien,
//       id,
//     ],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         result(err, null);
//       } else {
//         result(null, results);
//       }
//     }
//   );
// };

// // supprimer un formation par l'id
// export const deleteFormationById = (id, result) => {
//   db.query("DELETE FROM formations WHERE id=?", id, (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result(null, results);
//     }
//   });
// };

import db from "../config/database.js";

// récupérer tous les formations
export const getFormations = (result) => {
  db.query("SELECT * FROM formations", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// récupérer une formation par l'id
export const getFormationById = (id, result) => {
  db.query("SELECT * FROM formations WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

// ajouter une nouvelle formation
export const insertFormation = (data, result) => {
  db.query("INSERT INTO formations SET ?", data, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results.insertId);
    }
  });
};

// // mettre à jour une formation par l'id
// export const updateFormationById = (id, data, result) => {
//   db.query(
//     "UPDATE formations SET type_structure = ?, type_formation = ?, titre = ?, theme = ?, public_cible = ?, region = ?, lieux = ?, categorie_duree = ?, duree = ?, structure = ?, responsable = ?, diplome = ?, prix = ?, financement_possible = ?, lien = ? WHERE id = ?",
//     [
//       data.type_structure,
//       data.type_formation,
//       data.titre,
//       data.theme,
//       data.public_cible,
//       data.region,
//       data.lieux,
//       data.categorie_duree,
//       data.duree,
//       data.structure,
//       data.responsable,
//       data.diplome,
//       data.prix,
//       data.financement_possible,
//       data.lien,
//       id,
//     ],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         result(err, null);
//       } else {
//         result(null, results);
//       }
//     }
//   );
// };

// mettre à jour une formation par l'id
export const updateFormationById = (id, data, result) => {
  db.query(
    "UPDATE formations SET type_structure = ?, type_formation = ?, titre = ?, theme = ?, public_cible = ?, region = ?, lieux = ?, categorie_duree = ?, duree = ?, structure = ?, responsable = ?, diplome = ?, prix = ?, financement_possible = ?, lien = ? WHERE id = ?",
    [
      data.type_structure,
      data.type_formation,
      data.titre,
      data.theme,
      data.public_cible,
      data.region,
      data.lieux,
      data.categorie_duree,
      data.duree,
      data.structure,
      data.responsable,
      data.diplome,
      data.prix,
      data.financement_possible,
      data.lien,
      data.code_commentaire,
      id,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// supprimer une formation par l'id
export const deleteFormationById = (id, result) => {
  db.query("DELETE FROM formations WHERE id = ?", id, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// récupérer des formations par l'author_id
export const getFormationByAuthorId = (user_id, result) => {
  db.query(
    "SELECT * FROM formations WHERE user_id = ?",
    [user_id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const getFormationComments = (id, result) => {
  db.query("SELECT * FROM comments WHERE id_formation = ?", id, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const postFormationComments = (data, result) => {
  
    db.query("INSERT INTO comments SET ?", data, (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    });

};

