import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/appUser.js";
import postsRoutes from "./routes/post.js";
import tagsRoutes from "./routes/post_tag.js";
import imagesRoutes from "./routes/postImageUploaded.js";

const app = express();
app.use(bodyParser.json());

//every route inside the post route is accessed with /researcher
app.use("/appUser", usersRoutes);
app.use("/post", postsRoutes);
app.use("/post_tag", tagsRoutes);
app.use("/postImageUploaded", imagesRoutes);

app.get("/", (req, res) => {
  res.send("This is the home page!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
