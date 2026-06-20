import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ usuarioLogado, logout }) {

    const navegar = useNavigate();
    const location = useLocation();

    const isLogin = location.pathname === "/login";
    const isCadastro = location.pathname === "/cadastro";

    return (
        <>
            <header className="p-3 text-bg-dark navbarToda">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-between">

                        <button
                            className="btn btn-link text-decoration-none nav-home"
                            onClick={() => navegar("/")}
                        >
                            <img src="/ulike.svg" alt="Logo" className="logo" />
                        </button>

                        {!usuarioLogado && (
                            <div className="text-end">

                                {!isLogin && !isCadastro && (
                                    <>
                                        <button
                                            type="button"
                                            className="home-btn home-login me-2"
                                            onClick={() => navegar("/login")}
                                        >
                                            Login
                                        </button>

                                        <button
                                            type="button"
                                            className="home-btn home-cadastro"
                                            onClick={() => navegar("/cadastro")}
                                        >
                                            Cadastro
                                        </button>
                                    </>
                                )}

                                {isLogin && (
                                    <div className="login-footer-navbar">
                                        Não tem uma conta?{" "}
                                        <span
                                            className="login-link"
                                            onClick={() => navegar("/cadastro")}
                                        >
                                            Cadastrar-se
                                        </span>
                                    </div>
                                )}

                                {isCadastro && (
                                    <div className="login-footer-navbar">
                                        Já tem uma conta?{" "}
                                        <span
                                            className="login-link"
                                            onClick={() => navegar("/login")}
                                        >
                                            Entrar
                                        </span>
                                    </div>
                                )}

                            </div>
                        )}

                        {usuarioLogado && (
                            <div className="d-flex align-items-center gap-3">

                                <button
                                    className="btn btn-success btn-post"
                                    onClick={() =>
                                        navegar(
                                            `/usuario/${usuarioLogado.id}/cadastroNovoPost`
                                        )
                                    }
                                >
                                    <i className="bi bi-plus-lg"></i>
                                    <span>Novo Post</span>
                                </button>

                                <div className="dropdown text-end">
                                    <a
                                        href="#"
                                        className="user-dropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        {
                                            usuarioLogado.img ? (
                                                <img
                                                    src={usuarioLogado.img}
                                                    alt={usuarioLogado.nome}
                                                    className="foto"
                                                />
                                            ) : (
                                                <div className="nao-logado">
                                                    <i className="bi bi-person-fill"></i>
                                                </div>
                                            )
                                        }
                                    </a>

                                    <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                                        <li>
                                            <span className="usuario">
                                                {usuarioLogado.nome}
                                            </span>
                                        </li>

                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                    logout();
                                                    navegar("/login");
                                                }}
                                            >
                                                Trocar conta
                                            </button>
                                        </li>

                                        <li>
                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={logout}
                                            >
                                                Sair
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        )}

                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;