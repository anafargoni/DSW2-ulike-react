import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./Login.css";

function Login({ setUsuarioLogado }) {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    const navegar = useNavigate();

    async function fazerLogin(e) {
        e.preventDefault();

        try {
            const resposta = await fetch(
                "http://localhost:3000/usuarios/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        login,
                        senha
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                Swal.fire({
                    title: "Erro",
                    text: dados.msg || "Usuário ou senha incorretos!",
                    icon: "error"
                });
                return;
            }

            if (dados.usuario) {
                setUsuarioLogado(dados.usuario);

                localStorage.setItem(
                    "usuarioId",
                    dados.usuario.id
                );

                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: `Bem-vindo, ${dados.usuario.nome}!`,
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true
                });

                setLogin("");
                setSenha("");

                navegar("/");

            } else {
                Swal.fire({
                    title: "Erro",
                    text: "Usuário ou senha incorretos!",
                    icon: "error"
                });
            }

        } catch (erro) {
            Swal.fire({
                title: "Erro",
                text: "Erro ao realizar login.",
                icon: "error"
            });
        }
    }

    return (
        <>
            <div className="login-page">
                <div className="login-card">
                    <h1 className="login-title">
                        Entrar
                    </h1>
                    <form onSubmit={fazerLogin} className="login-form">
                        <input
                            type="text"
                            placeholder="Login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            className="login-input"
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="login-input"
                        />
                        <button
                            type="submit"
                            className="login-btn"
                        >
                            Entrar
                        </button>

                    </form>

                </div>
            </div>
        </>
    )
}

export default Login;