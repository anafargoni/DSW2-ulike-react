import Trash from "./Trash";
import Edit from "./Edit";

function Comentario({ comentario, nomeUsuario, usuarioLogado, fotoUsuario, editarComentario, excluirComentario, data }) {

    return (
      <div key={comentario.id} className="comentario">

                    <div className="comentario-topo">

                        <div className="comentario-info">
                            {fotoUsuario ? (
                                <img
                                    src={fotoUsuario}
                                    alt={nomeUsuario}
                                    className="foto-usuario-comentario"
                                />
                            ) : (
                                <div className="avatar-comentario">
                                    <i className="bi bi-person-fill"></i>
                                </div>
                            )}

                            <strong className="nome-comentario">
                                {nomeUsuario}
                            </strong>

                            <small className="tempo-comentario">
                                • {data(comentario.data)}
                            </small>

                        </div>

                        {usuarioLogado &&
                            usuarioLogado.id === comentario.usuario && (
                                <div className="dropdown ms-auto">

                                    <button
                                        className="btn-menu-comentario"
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="bi bi-three-dots"></i>
                                    </button>

                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-up">

                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => editarComentario(comentario)}
                                            >
                                                <Edit />
                                                Editar
                                            </button>
                                        </li>

                                        <li>
                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={() => excluirComentario(comentario)}
                                            >
                                                <Trash />
                                                Deletar
                                            </button>
                                        </li>

                                    </ul>

                                </div>
                            )
                        }


                    </div>

                    <p className="texto-comentario">
                        {comentario.texto}
                    </p>

                </div>
    );
}

export default Comentario;