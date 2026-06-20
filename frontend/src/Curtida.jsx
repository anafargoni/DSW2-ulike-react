import Swal from "sweetalert2";
import "./Curtida.css";
import Heart from "./Heart";
import HeartPreenchido from "./HeartPreenchido";

function Curtida({ usuarioLogado, post, carregarPosts }) {

    const curtiu = usuarioLogado
        ? post.likes.some(
            like => Number(like.usuario) === Number(usuarioLogado.id)
        )
        : false;

    async function curtirPost() {

        if (!usuarioLogado) {
            Swal.fire({
                title: "Erro",
                text: "Faça login para curtir!",
                icon: "error"
            });

            return;
        }

        try {
            const resposta = await fetch(
                "https://dsw2-ulike-react.onrender.com/likes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        usuario: usuarioLogado.id,
                        post: post.id
                    })
                }
            );

            if (!resposta.ok) {
                throw new Error();
            }

            await carregarPosts();

        } catch (erro) {
            console.error("Erro ao curtir post:", erro);

            Swal.fire({
                title: "Erro",
                text: "Não foi possível curtir o post.",
                icon: "error"
            });
        }
    }

    return (
        <div className="botoes">
            <button
                type="button"
                onClick={curtirPost}
                className={`btn-curtida ${curtiu ? "curtido" : ""}`}
                title={curtiu ? "Curtido" : "Curtir"}
            >
                {curtiu ? <HeartPreenchido /> : <Heart />}

                <span>
                    {post.likes?.length || 0}
                </span>
            </button>
        </div>
    );
}

export default Curtida;
