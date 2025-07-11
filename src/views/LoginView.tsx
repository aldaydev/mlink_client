import { Link, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form';
import ErrorMessage from "../components/ErrorMessage";
import type { LoginForm } from "../types";
import { toast } from "sonner";
// import api from "../config/axios";
// import { isAxiosError } from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/DevTreeApi";

export default function LoginView() {

    const {setIsLoggedIn} = useContext(AuthContext)!;

    const navigate = useNavigate();

    const initialValues : LoginForm = {
        email: '',
        password: ''
    }

    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues});

    const loginMutation = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            console.log(data);
            localStorage.setItem('AUTH_TOKEN', data!.token);
            setIsLoggedIn(true);
            navigate('/admin');
        }
    })

    const handleLogin = async (formData: LoginForm) => {
        loginMutation.mutate(formData)
    }

    return (
        <div className="py-10 px-5 max-w-lg mx-auto">
            <h1 className="text-4xl text-white font-bold">Iniciar Sesión</h1>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="bg-white px-5 py-10 rounded-lg space-y-10 mt-10"
                noValidate
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-green p-3 text-lg w-full uppercase text-dark hover:bg-green-light rounded-lg font-bold cursor-pointer"
                    value='Iniciar Sesión'
                />
            </form>

            <nav className="mt-10">
                <Link 
                    to='/auth/register'
                    className="text-center text-white text-lg block"
                >
                    ¿No tienes cuenta? <span className="text-orange">Crea una aquí</span>
                </Link>
            </nav>
        </div>
    )
}
