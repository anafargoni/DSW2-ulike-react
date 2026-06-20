import Curtida from "./Curtida";
import ListaComentario from "./ListaComentario";
import Trash from "./Trash";
import Edit from "./Edit";
import "./ListaPost.css"
import BotaoComentario from "./BotaoComentario";
import { useState } from "react";

function ListaPosts({ posts, usuarioLogado, deletar, editar, usuarios, carregarPosts, data }) {

    const [comentarioAberto, setComentarioAberto] = useState(null);

    function tempoRelativo(dataISO) {
        const agora = new Date();
        const data = new Date(dataISO);

        const diffMs = agora - data; // diferença em milissegundos
        const segundos = Math.floor(diffMs / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);

        if (segundos < 60) return "agora";
        if (minutos < 60) return `${minutos} min atrás`;
        if (horas < 24) return `${horas} h atrás`;
        if (dias < 7) return `${dias} dias atrás`;

        return data.toLocaleDateString("pt-BR");
    }

    let cards = [];

    for (let post of posts) {

        let nomeUsuario = "Usuário";
        let fotoUsuario = null;

        for (let usuario of usuarios) {
            if (usuario.id === post.usuario) {
                nomeUsuario = usuario.nome;
                fotoUsuario = usuario.img;
                break;
            }
        }

        cards.push(
            <div key={post.id} className="masonry-item">

                <div className="card">

                    <div className="card-body">

                        <div className="usuario-post">

                            <div className="usuario-info">

                                {fotoUsuario ? (
                                    <img
                                        src={fotoUsuario}
                                        alt={nomeUsuario}
                                        className="foto-usuario-post"
                                    />
                                ) : (
                                    <div className="avatar-padrao-post">
                                        <i className="bi bi-person-fill"></i>
                                    </div>
                                )}

                                <h5 className="card-title mb-0">
                                    {nomeUsuario}
                                </h5>

                            </div>

                            {usuarioLogado?.id === post.usuario && (
                                <div className="dropdown">
                                    <button
                                        className="btn-menu-post"
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="bi bi-three-dots"></i>
                                    </button>

                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => editar(post)}
                                            >
                                                <Edit />
                                                Editar
                                            </button>
                                        </li>

                                        <li>
                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={() => deletar(post.id)}
                                            >
                                                <Trash />
                                                Deletar
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}

                        </div>

                        {post.img && (
                            <img
                                src={post.img}
                                className="card-img-top"
                                alt="Imagem do post"
                            />
                        )}

                        <p className="card-text">
                            {post.texto}
                        </p>

                        {post.editado && (
                            <small className="post-editado d-block ">
                                {usuarioLogado?.id === post.usuario
                                    ? "Você editou este post"
                                    : "Post editado"}
                            </small>
                        )}

                        <span>{tempoRelativo(post.data)}</span>

                        <div className="acoes-post">

                            <Curtida
                                usuarioLogado={usuarioLogado}
                                post={post}
                                carregarPosts={carregarPosts}
                            />

                            <BotaoComentario
                                aberto={comentarioAberto === post.id}
                                setAberto={() =>
                                    setComentarioAberto(
                                        comentarioAberto === post.id
                                            ? null
                                            : post.id
                                    )
                                }
                                qtd={post.comentarios?.length || 0}
                            />

                        </div>

                        {comentarioAberto === post.id && (
                            <ListaComentario
                                usuarioLogado={usuarioLogado}
                                post={post}
                                carregarPosts={carregarPosts}
                                usuarios={usuarios}
                                data={tempoRelativo}
                            />
                        )}


                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="masonry-grid">
                {cards}
            </div>
        </div>
    );
}

export default ListaPosts;