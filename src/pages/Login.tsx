import { useEffect } from "react";
import { useNavigate } from "react-router";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";

const Login = () => {
	const { signWithGoogle, authState } = useAuth();
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			await signWithGoogle();
		} catch (error) {
			console.error("Erro ao fazer login com Google:", error);
		}
	};

	useEffect(() => {
		if (authState.user && !authState.loading) {
			navigate("/dashboard");
		}
	}, [authState.user, authState.loading, navigate]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<header>
					<h1 className="text-center text-3xl font-extrabold text-gray-50">
						DevBills
					</h1>
					<p className="mt-2 text-center text-sm text-gray-400">
						Gerencie suas finanças de forma simples e eficiente
					</p>
				</header>

				<main className="mt-8 bg-gray-900 py-8 px-4 shadow-md rounded-lg sm:px-10 space-y-6 border border-gray-700">
					<section>
						<h2 className="text-lg text-center font-medium text-gray-50">
							Faça login para continuar
						</h2>
						<p className="mt-1 text-center text-sm text-gray-400">
							Acesse sua conta para começar a gerenciar suas finanças
						</p>
					</section>

					<GoogleLoginButton
						onClick={handleLogin}
						isLoading={authState.loading}
					/>

					{authState.error && (
						<div
							role="alert"
							className="bg-red-500/10 text-center border border-red-500/40 text-red-200 rounded-lg mt-4 p-3"
						>
							<p className="text-red-200 text-center">{authState.error}</p>
						</div>
					)}

					<footer className="mt-6 ">
						<p className="mt-1 text-center text-sm text-gray-400">
							Ao fazer login, você concorda com nossos termos de uso e política
							de privacidade.
						</p>
					</footer>
				</main>
			</div>
		</div>
	);
};

export default Login;
