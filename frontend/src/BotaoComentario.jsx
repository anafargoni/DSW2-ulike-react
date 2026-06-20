import Chat from "./Chat";
import ChatPreenchido from "./ChatPreenchido";

function BotaoComentario({ aberto, setAberto, qtd }) {
    return (
        <button
            onClick={() => setAberto(prev => !prev)}
            className="btn-comentario"
        >
            {aberto ? <ChatPreenchido /> : <Chat />}
            {" "}
            {qtd}
        </button>
    );
}

export default BotaoComentario;