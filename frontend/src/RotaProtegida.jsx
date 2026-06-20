import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function RotaProtegida({ usuarioLogado, carregandoUsuario, children }) {

    const navegar = useNavigate();
    const { id } = useParams();

    useEffect(() => {

        if (carregandoUsuario) return;

        const acessoPermitido =
            usuarioLogado &&
            Number(id) === usuarioLogado.id;

        if (!acessoPermitido) {
            Swal.fire({
                icon: "error",
                title: "Acesso negado",
                text: "Não foi possível acessar esta página agora.",
                confirmButtonText: "Voltar"
            }).then(() => {
                navegar("/");
            });
        }

    }, [usuarioLogado, carregandoUsuario, id, navegar]);

    if (carregandoUsuario) {
        return null;
    }

    const acessoPermitido =
        usuarioLogado &&
        Number(id) === usuarioLogado.id;

    return acessoPermitido ? children : null;
}

export default RotaProtegida;