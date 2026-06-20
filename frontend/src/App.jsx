import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import Post from './Post';
import Navbar from "./Navbar";
import ListaPosts from './ListaPosts';
import Swal from "sweetalert2";
import RotaProtegida from "./RotaProtegida";

function App() {

  const navegar = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [posts, setPosts] = useState([]);
  const [carregandoUsuario, setCarregandoUsuario] = useState(true);

  function irParaLogin() {
    navegar("/login")
  }

  function irParaCadastro() {
    navegar("/cadastro")
  }

  function irParaNovoPost() {
    navegar(`/usuario/${usuarioLogado.id}/cadastroNovoPost`);
  }

  // USUÁRIOS
  async function carregarUsuarios() {
    try {
      const resposta = await fetch("https://dsw2-ulike-react.onrender.com/usuarios");
      if (!resposta.ok) {
        throw new Error();
      }
      const dados = await resposta.json();
      setUsuarios(dados);
    } catch (erro) {
      console.log(erro);
    }
  }

  // POSTS
  async function carregarPosts() {
    try {
      const r = await fetch("https://dsw2-ulike-react.onrender.com/posts");
      if (!r.ok) {
        throw new Error("Erro na requisição")
      }
      const dados = await r.json();
      setPosts(dados);
    } catch (erro) {
      console.log(erro)
    }
  }

  async function excluirPost(id) {

    const resultado = await Swal.fire({
      title: "Excluir post?",
      text: "Tem certeza que deseja excluir este post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar"
    });

    if (!resultado.isConfirmed) {
      return;
    }

    try {

      let options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usuario: usuarioLogado.id
        })
      }

      const resposta = await fetch(`http://localhost:3000/posts/${id}`, options);

      if (!resposta.ok) {
        throw new Error();
      }

      Swal.fire({
        title: "Post excluído!",
        icon: "success"
      });

      carregarPosts();

    } catch (erro) {
      console.log(erro)

      Swal.fire({
        title: "Erro",
        text: "Não foi possível excluir.",
        icon: "error"
      });
    }
  }

  async function editarPost(post) {

    const { value: form } = await Swal.fire({
      title: "Editar Post",
      html: `
    <textarea id="area-texto" class="area2-textarea">${post.texto}</textarea>
    <input id="area-img" class="area2-input" value="${post.img || ''}">
  `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          texto: document.querySelector("#area-texto").value,
          img: document.querySelector("#area-img").value
        };
      }
    });
    try {

      let options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usuario: post.usuario,
          texto: form.texto,
          img: form.img
        })
      }
      if (form) {
        const resposta = await fetch(`http://localhost:3000/posts/${post.id}`, options);

        if (!resposta.ok) {
          throw new Error();
        }

        await carregarPosts();

        Swal.fire({
          title: "Post editado!",
          icon: "success"
        });
      }

    } catch (erro) {
      console.log(erro)

      Swal.fire({
        title: "Erro",
        text: "Não foi possível editar.",
        icon: "error"
      });
    }
  }

  useEffect(() => {
    carregarUsuarios();
    carregarPosts();

    const usuarioId =
      localStorage.getItem("usuarioId");

    if (usuarioId) {
      const usuario = usuarios.find(
        u => u.id === Number(usuarioId)
      );

      if (usuario) {
        setUsuarioLogado(usuario);
      }
    }
  }, []);

  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId");

    if (!usuarioId) {
      setCarregandoUsuario(false);
      return;
    }

    const usuario = usuarios.find(
      u => u.id === Number(usuarioId)
    );

    if (usuario) {
      setUsuarioLogado(usuario);
    }

    setCarregandoUsuario(false);
  }, [usuarios]);

  function logout() {
    localStorage.removeItem("usuarioId");
    setUsuarioLogado(null);
    navegar("/");
  }

  return (
    <>
      <Navbar usuarioLogado={usuarioLogado} logout={logout} />
      <Routes>
        <Route path="/" element={<ListaPosts posts={posts} usuarioLogado={usuarioLogado} deletar={excluirPost} editar={editarPost} usuarios={usuarios} carregarPosts={carregarPosts} />} />
        <Route path="/login" element={<Login setUsuarioLogado={setUsuarioLogado} />} />
        <Route path="/cadastro" element={<Cadastro usuarios={usuarios} carregarUsuarios={carregarUsuarios} />} />
        <Route path="/usuario/:id/cadastroNovoPost" element={<RotaProtegida usuarioLogado={usuarioLogado}  carregandoUsuario={carregandoUsuario}> <Post usuarioLogado={usuarioLogado} carregarPosts={carregarPosts} /> </RotaProtegida>} />
      </Routes>
    </>
  )
}

export default App
