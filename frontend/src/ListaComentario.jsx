import { useState } from "react";
import Swal from "sweetalert2";
import Comentario from "./Comentario";
import "./Comentario.css";

function ListaComentario({
    usuarioLogado,
    post,
    carregarPosts,
    usuarios,
    data
}) {

    const [texto, setTexto] = useState("");
    const [aberto, setAberto] = useState(false);

    async function enviarComentario(e) {
        e.preventDefault();

        if (!usuarioLogado) {
            Swal.fire({
                title: "Erro",
                text: "Faça login para comentar!",
                icon: "error"
            });
            return;
        }

        let vazio = true;

        for (let c of texto) {
            if (c !== " ") {
                vazio = false;
                break;
            }
        }

        if (vazio) {
            Swal.fire({
                title: "Erro",
                text: "Digite um comentário!",
                icon: "error"
            });
            return;
        }

        try {

            const resposta = await fetch(
                "http://localhost:3000/comentarios",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        usuario: usuarioLogado.id,
                        post: post.id,
                        texto: texto
                    })
                }
            );

            if (!resposta.ok) {
                throw new Error();
            }

            await carregarPosts();
            setTexto("");

        } catch (erro) {
            console.log(erro);
        }
    }

    async function editarComentario(comentario) {

        if (
            !usuarioLogado ||
            comentario.usuario !== usuarioLogado.id
        ) {
            Swal.fire({
                title: "Erro",
                text: "Você não pode editar esse comentário!",
                icon: "error"
            });
            return;
        }

        const { value } = await Swal.fire({
            title: "Editar comentário",
            input: "text",
            inputValue: comentario.texto,
            showCancelButton: true
        });

        if (!value) return;

        try {

            const resposta = await fetch(
                "http://localhost:3000/comentarios/" + comentario.id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        usuario: comentario.usuario,
                        texto: value
                    })
                }
            );

            if (!resposta.ok) {
                throw new Error();
            }

            await carregarPosts();

        } catch (erro) {
            console.log(erro);
        }
    }

    async function excluirComentario(comentario) {

        if (
            !usuarioLogado ||
            comentario.usuario !== usuarioLogado.id
        ) {
            Swal.fire({
                title: "Erro",
                text: "Você não pode excluir esse comentário!",
                icon: "error"
            });
            return;
        }

        try {

            const resposta = await fetch(
                "http://localhost:3000/comentarios/" + comentario.id,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        usuario: usuarioLogado.id
                    })
                }
            );

            if (!resposta.ok) {
                throw new Error();
            }

            await carregarPosts();

        } catch (erro) {
            console.log(erro);
        }
    }

    let qtd =
        post.comentarios
            ? post.comentarios.length
            : 0;

    let lista = [];

    if (post.comentarios) {

        for (let comentario of post.comentarios) {

            let nomeUsuario = "Usuário";
            let fotoUsuario = null;

            if (usuarios) {

                for (let u of usuarios) {

                    if (u.id === comentario.usuario) {
                        nomeUsuario = u.nome;
                        fotoUsuario = u.img;
                        break;
                    }

                }

            }

            lista.push(
                <Comentario
                    key={comentario.id}
                    comentario={comentario}
                    nomeUsuario={nomeUsuario}
                    usuarioLogado={usuarioLogado}
                    fotoUsuario={fotoUsuario}
                    editarComentario={editarComentario}
                    excluirComentario={excluirComentario}
                    data={data}
                />
            );
        }

    }

    return (
        <div className="comentarios-container">

            {usuarioLogado && (
                <form
                    onSubmit={enviarComentario}
                    className="comentario-form"
                >
                    <div className="input-wrapper">
                        <input
                            type="text"
                            value={texto}
                            placeholder="Escreva um comentário..."
                            onChange={(e) => setTexto(e.target.value)}
                            className="input-comentario"
                        />

                        <button
                            type="submit"
                            className="btn-enviar"
                        >
                            <i className="bi bi-send-fill"></i>
                        </button>
                    </div>
                </form>
            )}

            {lista}

        </div>
    );
}

export default ListaComentario;