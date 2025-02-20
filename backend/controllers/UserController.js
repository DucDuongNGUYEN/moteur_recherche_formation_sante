import {
  getAllUsersFromDatabase,
  deleteUserById,
  updateRoleById,
  updateUserById,
} from "../models/UserModel.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersFromDatabase();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteUserById(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    await updateRoleById(id, role);
    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { user_name, user_email, user_password } = req.body;
  try {
    await updateUserById(id, { user_name, user_email, user_password });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
