import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/appUser.js";
import postsRoutes from "./routes/post.js";

const app = express();
app.use(bodyParser.json());

//every route inside the post route is accessed with /researcher
app.use("/appUser", usersRoutes);
app.use("/post", postsRoutes);

app.get("/", (req, res) => {
  res.send("This is the home page!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
