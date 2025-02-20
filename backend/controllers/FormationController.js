import {
  getFormations,
  getFormationById,
  insertFormation,
  updateFormationById,
  deleteFormationById,
  getFormationByAuthorId,
  getFormationComments,
  postFormationComments
} from "../models/FormationModel.js";

// récupérer des formations
export const showFormations = (req, res) => {
  getFormations((err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch formations" });
    } else {
      res.status(200).json(results);
    }
  });
};

// récupérer un formation par l'id
export const showFormationById = (req, res) => {
  const id = req.params.id;
  getFormationById(id, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch formation" });
    } else {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ error: "Formation not found" });
      }
    }
  });
};

// créer un formation
export const createFormation = (req, res) => {
  const data = req.body;
  insertFormation(data, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to create formation" });
    } else {
      res
        .status(201)
        .json({ message: "Formation created successfully", id: results });
    }
  });
};

// mettre à jour un formation
export const updateFormation = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  updateFormationById(id, data, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to update formation" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Formation not found" });
      } else {
        res.status(200).json({ message: "Formation updated successfully" });
      }
    }
  });
};

// supprimér un formation
export const deleteFormation = (req, res) => {
  const id = req.params.id;
  deleteFormationById(id, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete formation" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Formation not found" });
      } else {
        res.status(200).json({ message: "Formation deleted successfully" });
      }
    }
  });
};

// récupérer des formations par l'author_id
export const showFormationByAuthorId = (req, res) => {
  const user_id = req.params.id;
  getFormationByAuthorId(user_id, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch formations" });
    } else {
      if (results && results.length > 0) {
        res.status(200).json(results);
      } else {
        res
          .status(404)
          .json({ error: "No formations found for the given author_id" });
      }
    }
  });
};

export const getFormationCommentsReq = (req, res) => {
  const id = req.params.id;
  console.log("getFormationCommentsReq");
  getFormationComments(id, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to get formation comments" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Formation not found/No comments" });
      } else {
        res.status(200).json(results);
      }
    }
  });

};

export const postFormationCommentsReq = (req, res) => {
  const data = req.body;
 
  postFormationComments(data, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to post formation comments" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Formation not found" });
      } else {
        res.status(200).json(results);
      }
    }
  });

}

