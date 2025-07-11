import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

export default function AdminNavigation() {

    const {setIsLoggedIn} = useContext(AuthContext)!;
    const queryClient = useQueryClient();

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN');
        queryClient.invalidateQueries({ queryKey: ['user'] });
        setIsLoggedIn(false);
        location.reload();
    }


    return (
        <>
            <Link
                to='/admin'
                className='text-white uppercase font-black text-xs cursor-pointer hover:text-[#60e995] tracking-wide scale-90 sm:scale-100 '
            >
                <p className='hidden md:block'>Tu cuenta</p>
                <img
                    src='/icons/user_icon.svg'
                    className='block md:hidden'
                />
            </Link>

            <button
                id="closeSession"
                className="p-[7px] bg-green text-dark uppercase md:py-2 md:px-3 font-black text-xs rounded-lg cursor-pointer hover:bg-green-light hover:transition-colors tracking-wide flex items-center gap-2 scale-90 sm:scale-100"
                onClick={logout}
            >
                <p className='hidden md:block'>Cerrar Sesión</p>
                <img src='/icons/logout_icon.svg' />
            </button>
        </>

    )
}
