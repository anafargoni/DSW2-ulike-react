import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import "./Post.css";

function Post({ usuarioLogado, carregarPosts }) {
    const { id } = useParams();

    const [texto, setTexto] = useState("");
    const [img, setImg] = useState("");

    const navegar = useNavigate();

    if (Number(id) !== usuarioLogado.id) {
        return <h2>Acesso negado</h2>;
    }

    async function cadastrarPost(e) {
        e.preventDefault();

        let textoVazio = true;

        for (let caractere of texto) {
            if (caractere !== " ") {
                textoVazio = false;
                break;
            }
        }

        if (textoVazio && img === "") {
            Swal.fire({
                title: "Erro",
                text: "Digite um texto ou informe uma imagem",
                icon: "error"
            });
            return;
        }

        const resultado = await Swal.fire({
            title: "Publicar post?",
            text: texto || "Post com imagem",
            imageUrl: img || undefined,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Publicar",
            cancelButtonText: "Cancelar"
        });

        if (!resultado.isConfirmed) {
            return;
        }

        try {
            const resposta = await fetch(
                "http://localhost:3000/posts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        usuario: usuarioLogado.id,
                        texto,
                        img
                    })
                }
            );

            if (!resposta.ok) {
                throw new Error();
            }

            await carregarPosts();

            Swal.fire({
                title: "Publicado!",
                text: "Seu post foi publicado com sucesso.",
                icon: "success"
            });

            setTexto("");
            setImg("");

            navegar("/");

        } catch (erro) {
            Swal.fire({
                title: "Erro",
                text: "Não foi possível publicar o post.",
                icon: "error"
            });
        }
    }

    return (
        <div className="post-page">
            <div className="post-card">
                <h1 className="post-title">
                    Novo Post
                </h1>

                <form
                    onSubmit={cadastrarPost}
                    className="post-form"
                >
                    <textarea
                        className="post-textarea"
                        placeholder="O que você está pensando?"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                    />

                    <input
                        type="text"
                        className="post-input"
                        placeholder="URL da imagem (opcional)"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                    />

                    {img && (
                        <img
                            src={img}
                            alt="Prévia"
                            className="post-preview"
                        />
                    )}

                    <button
                        type="submit"
                        className="post-btn"
                    >
                        Publicar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Post;