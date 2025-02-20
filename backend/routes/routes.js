import express from "express";

//import des fonctions de Controllers
// import { showUser, createAccount } from "../controllers/UserController.js";
import {
  registerUser,
  loginUser,
  requestRefreshToken,
  logoutUser,
} from "../controllers/AuthController.js";

import {
  getAllUsers,
  deleteUser,
  updateUser,
  updateRole,
} from "../controllers/UserController.js";

import {
  verifyToken,
  verifyTokenAdminAuth,
  verifyTokenFormateurAuth,
  verifyTokenUserAuth,
} from "../middleware/Auth.js";

import {
  showFormations,
  showFormationById,
  createFormation,
  updateFormation,
  deleteFormation,
  showFormationByAuthorId,
  getFormationCommentsReq, 
  postFormationCommentsReq
} from "../controllers/FormationController.js";

//la fonction pour rechercher des bases de données dans l'index Formations
import { searchIndex } from "../controllers/searchIndex.js";

const router = express.Router();
//Créer les APIs
////////////////// USER /////////////////

// // récupérer un utilisateur par email
// router.get("/api/users/:email", showUser);

// // créer un utilisateur
// router.post("/api/users", createAccount);
router.post("/api/users/register", registerUser);

//LOGIN user by mail
router.post("/api/users/login", loginUser);

//récupérer tous utilisateurs
router.get("/api/users", verifyTokenAdminAuth, getAllUsers);

//supprimer un utilisateur
router.delete("/api/users/:id", verifyTokenAdminAuth, deleteUser);

//mettre à jour user_name, user_email, user_password
router.put("/api/users/:id", verifyTokenUserAuth, updateUser);

// mettre à jour le rôle d'utilisateur
router.patch("/api/users/role/:id", verifyTokenAdminAuth, updateRole);

///////////////// REFRESH ///////////////
router.post("/api/refresh", requestRefreshToken);

//LOG OUT
router.post("/api/users/logout", verifyToken, logoutUser);

///////////////// FORMATION /////////////

//récupérer tous les formations
router.get("/api/formations", showFormations);

//récupérer un formation par l'id
router.get("/api/formations/:id", showFormationById);

//créer un formation
router.post("/api/formations/", verifyTokenFormateurAuth, createFormation);

//mettre à jour un formation
router.put("/api/formations/:id", verifyTokenFormateurAuth, updateFormation);

//supprimer un formation
router.delete("/api/formations/:id", verifyTokenFormateurAuth, deleteFormation);

//récupérer des formations by l'author_id
router.get(
  "/api/formations/author_id/:id",
  verifyTokenFormateurAuth,
  showFormationByAuthorId
);

//récupérer les commentaires d'une formation
router.get("/api/formations/:id/comments", getFormationCommentsReq)

//ajouter un commentaire
router.post("/api/formations/:id/comments/", postFormationCommentsReq)

///////////////////// ELASTICSEARCH //////////////////
router.get("/:index/_search", searchIndex);

export default router;
