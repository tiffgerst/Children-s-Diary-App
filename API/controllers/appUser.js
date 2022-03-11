import mssql from "mssql";
import config from "../dbConfig.js";
const { connect, query } = mssql;

//Finds one user by their ID from the databse
export const singleUser = async (req, res) => {
  const id = req.params.id;

  try {
    await connect(config);
    const result = await query`SELECT * FROM appUser WHERE UserID = ${id}`;
    res.json(result.recordset).status(200);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Updates User pincode
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const avatar = req.body.avatarID;

  try {
    await connect(config);
    const result =
      await query`UPDATE appUser SET avatarID = ${avatar} WHERE UserID = ${id}`;
    res.send(`User:${id} has changed their avatar to  ${avatar}.`).status(200);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

//Adds user to database
export const createUser = async (req, res) => {
  const user = req.body;
  const pass = user.passwordHash;

  try {
    await connect(config);
    await query`INSERT INTO appUser(passwordHash) VALUES (${pass})`;
    res.send(`POST REACHED. User was added to the database.`).status(200);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Deletes a user by their userID
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await connect(config);
    const result = await query`DELETE FROM appUser WHERE UserID = ${id}`;
    res.send(`Deleted user: ${id} from the database.`).status(200);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
