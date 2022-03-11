import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/appUser.js";

const app = express();
app.use(bodyParser.json());

//every route inside the post route is accessed with /researcher
app.use("/appUser", usersRoutes);

app.get("/", (req, res) => {
  res.send("This is the home page!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
