const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const usuario = require("./routes/usuarios");
const comentario = require("./routes/comentarios");
const post = require("./routes/posts");
const like = require("./routes/likes");

app.use("/usuarios", usuario);
app.use("/comentarios", comentario);
app.use("/posts", post);
app.use("/likes", like);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../doc.html"));
});

app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`);
});