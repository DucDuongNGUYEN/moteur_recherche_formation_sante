import db from "../config/database.js";

// // récupérer tout les utilisateurs
// export const getAllUser = (result) => {
//   db.query("SELECT * FROM users", (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result(null, results[0]);
//     }
//   });
// };

// //récupérer un seul utilisateur
// export const getUserByEmail = (data, result) => {
//   db.query(
//     "SELECT user_id, user_name, user_password FROM users WHERE user_email=?",
//     data,
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         result(err, null);
//       } else {
//         result(null, results[0]);
//       }
//     }
//   );
// };

// //insérer l'utilisateur
// export const insertUser = (data, result) => {
//   db.query("INSERT INTO users SET ?", data, (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result(null, results[0]);
//     }
//   });
// };

// // Get a user by email
// export const getUserByEmail = (user_email) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       "SELECT * FROM users WHERE user_email = ?",
//       [user_email],
//       (error, results) => {
//         if (error) {
//           return reject(error);
//         }
//         resolve(results[0] || null);
//       }
//     );
//   });
// };

// // Insert a new user
// export const insertUser = (user) => {
//   return new Promise((resolve, reject) => {
//     db.query("INSERT INTO users SET ?", user, (error) => {
//       if (error) {
//         return reject(error);
//       }
//       resolve();
//     });
//   });
// };

// récupérer tout les utilisateurs
export const getAllUsersFromDatabase = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE user_id=?", id, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Retrieve a single user by email
export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE user_email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};
// Insert a user
export const insertUser = (user) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO users SET ?", user, (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const updateRoleById = (id, role) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET role = ? WHERE user_id = ?",
      [role, id],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const updateUserById = (id, userData) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET user_name = ?, user_email = ?, user_password = ? WHERE user_id = ?",
      [userData.user_name, userData.user_email, userData.user_password, id],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};
