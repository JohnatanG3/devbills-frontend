import {
	signOut as firebaseSignOut,
	onAuthStateChanged,
	signInWithPopup,
} from "firebase/auth";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { firebaseAuth, googleAuthProvider } from "../config/firebase";
import type { AuthState } from "../types/auth";

interface AuthContextProps {
	authState: AuthState;
	isAuthenticated: boolean;
	signWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [authState, setAuthState] = useState<AuthState>({
		user: null,
		error: null,
		loading: true,
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			firebaseAuth,
			(user) => {
				if (user) {
					setAuthState({
						user: {
							uid: user.uid,
							email: user.email,
							displayName: user.displayName,
							photoURL: user.photoURL,
						},
						error: null,
						loading: false,
					});
				} else {
					setAuthState({ user: null, error: null, loading: false });
				}
			},
			(error) => {
				console.error("Erro na autenticação:", error);
				setAuthState({ user: null, error: error.message, loading: false });
			},
		);

		return () => unsubscribe();
	}, []);

	const isAuthenticated = useMemo(() => !!authState.user, [authState.user]);

	const signWithGoogle = async (): Promise<void> => {
		// Limpa erro anterior e indica carregamento
		setAuthState((prev) => ({ ...prev, loading: true, error: null }));

		try {
			// Sucesso: quem finaliza o estado é o onAuthStateChanged
			await signInWithPopup(firebaseAuth, googleAuthProvider);
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "Erro ao tentar se conectar com o Google!";
			setAuthState((prev) => ({
				...prev,
				loading: false,
				error: message,
			}));
		}
	};

	const signOut = async (): Promise<void> => {
		// Limpa erro anterior e indica carregamento
		setAuthState((prev) => ({ ...prev, loading: true, error: null }));

		try {
			// Sucesso: quem finaliza o estado é o onAuthStateChanged
			await firebaseSignOut(firebaseAuth);
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "Erro ao tentar sair da conta!";
			setAuthState((prev) => ({
				...prev,
				loading: false,
				error: message,
			}));
		}
	};

	return (
		<AuthContext.Provider
			value={{ authState, isAuthenticated, signWithGoogle, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider!");
	}

	return context;
};
