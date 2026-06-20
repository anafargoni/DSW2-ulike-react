const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: "https://dsw-2-ulike-react.vercel.app"
}));

const usuario = require("./routes/usuarios");
const comentario = require("./routes/comentarios");
const post = require("./routes/posts");
const like = require("./routes/likes");

app.use("/usuarios", usuario);
app.use("/comentarios", comentario);
app.use("/posts", post);
app.use("/likes", like);

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(port, () => {
  console.log(`Servidor executando em ${port}`);
});
