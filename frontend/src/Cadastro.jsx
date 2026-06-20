import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./Cadastro.css";

function Cadastro({ usuarios, carregarUsuarios }) {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");

  const navegar = useNavigate();

  async function fazerCadastro(e) {
    e.preventDefault();

    let usuarioExiste = false;

    for (let usuario of usuarios) {
      if (usuario.login === login) {
        usuarioExiste = true;
        break;
      }
    }

    if (usuarioExiste) {
      Swal.fire({
        title: "Erro ao cadastrar",
        text: "Usuário já existe!",
        icon: "error"
      });

      setNome("");
      setLogin("");
      setSenha("");
      setFotoPerfil("");

      return;
    }

    try {
      const resposta = await fetch(
        "http://localhost:3000/usuarios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            login,
            nome,
            senha,
            img: fotoPerfil || null
          })
        }
      );

      if (!resposta.ok) {
        const erro = await resposta.json();

        Swal.fire({
          title: "Erro",
          text: erro.msg,
          icon: "error"
        });

        return;
      }

      const usuario = await resposta.json();

      console.log(usuario);

      Swal.fire({
        title: "Usuário Cadastrado",
        icon: "success"
      });

      setNome("");
      setLogin("");
      setSenha("");
      setFotoPerfil("");

      await carregarUsuarios();
      navegar("/login");

    } catch (erro) {
      console.error("Erro encontrado:", erro);
    }
  }

  return (
    <>
      
      <div className="cadastro-page">
        <div className="cadastro-card">
          <h1 className="cadastro-title">Cadastro</h1>

          <form className="cadastro-form" onSubmit={fazerCadastro}>
            <input className="cadastro-input" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
            <input  className="cadastro-input"  type="text"  placeholder="Login"  value={login}  onChange={(e) => setLogin(e.target.value)} />
            <input  className="cadastro-input"  type="password"  placeholder="Senha"   value={senha}  onChange={(e) => setSenha(e.target.value)} />
            <input  className="cadastro-input"  type="text"  placeholder="URL da foto"  value={fotoPerfil}  onChange={(e) => setFotoPerfil(e.target.value)}/>
            <button className="cadastro-btn" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div> 
    </>
  );
}

export default Cadastro;