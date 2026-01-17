import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer, type ToastContainerProps } from "react-toastify";
import ThemeColorMeta from "../components/ThemeColorMeta";
import { AuthProvider } from "../context/AuthContext";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Transactions from "../pages/Transactions";
import TransactionsForms from "../pages/TransactionsForms";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
	const toastConfig: ToastContainerProps = {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		newestOnTop: true,
		closeOnClick: true,
		pauseOnFocusLoss: true,
		draggable: true,
		pauseOnHover: true,
		theme: "dark",
	};

	return (
		<BrowserRouter>
			<ThemeColorMeta /> {/* ← aqui */}
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route element={<PrivateRoutes />}>
						<Route element={<AppLayout />}>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/transacoes" element={<Transactions />} />
							<Route path="/transacoes/nova" element={<TransactionsForms />} />
						</Route>
					</Route>
					<Route path="*" element={<h2>Página Não Encontrada!</h2>} />
				</Routes>
				<ToastContainer {...toastConfig} />
			</AuthProvider>
		</BrowserRouter>
	);
};

export default AppRoutes;
