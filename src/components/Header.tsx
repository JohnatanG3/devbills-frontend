import { Activity, LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

interface NavItem {
	name: string;
	path: string;
}

const Header = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { authState, signOut } = useAuth();
	const isAuthenticated: boolean = !!authState.user;
	const navLink: NavItem[] = [
		{ name: "Dashboard", path: "/dashboard" },
		{ name: "Transações", path: "/transacoes" },
	];
	const getNavLinkClassName = (isActive: boolean) =>
		isActive
			? "text-primary-500 font-semibold bg-primary-500/10 rounded-md h-10 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
			: "text-gray-400 hover:text-primary-500 hover:bg-primary-500/5 active:opacity-70 rounded-md h-10 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500";
	const renderAvatar = () => {
		if (!authState.user) return null;

		if (authState.user.photoURL) {
			return (
				<img
					key={authState.user.photoURL ?? "no-photo"}
					src={authState.user.photoURL ?? ""}
					alt={`Foto de perfil do usuário ${authState.user.displayName}`}
					className="w-8 h-8 rounded-full border border-gray-700"
				/>
			);
		}

		return (
			<div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium border border-gray-700">
				{authState.user.displayName?.charAt(0).toUpperCase()}
			</div>
		);
	};
	const handleSignOut = (): void => {
		signOut();
		setIsOpen(false);
	};
	const changeMenu = () => (): void => {
		setIsOpen(!isOpen);
	};

	return (
		<header className="bg-gray-900 border-b border-gray-700">
			<div className="container-app">
				<div className="flex justify-between items-center py-4">
					{/* LOGO */}
					<Link
						to="/"
						className="flex items-center gap-2 text-xl text-primary-500 font-bold"
					>
						<Activity className="h-6 w-6" /> DevBills
					</Link>

					{/* MENU DESKTOP */}
					{isAuthenticated && (
						<nav className="hidden md:flex space-x-3">
							{navLink.map((link) => (
								<NavLink
									key={link.path}
									to={link.path}
									className={({ isActive }) => getNavLinkClassName(isActive)}
								>
									{link.name}
								</NavLink>
							))}
						</nav>
					)}

					<div className="hidden md:flex items-center space-x-4">
						{isAuthenticated ? (
							<div className="flex items-center space-x-4">
								{/* AVATAR */}
								<div className="flex items-center space-x-2">
									{renderAvatar()}
									<span className="text-sm font-medium">
										{authState.user?.displayName}
									</span>
								</div>
								<button
									type="button"
									onClick={handleSignOut}
									title="Sair"
									aria-label="Sair"
									className="hover:text-red-300 hover:bg-red-700 active:opacity-70 p-2 rounded-full cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
								>
									<LogOut className="text-gray-200" />
								</button>
							</div>
						) : (
							<Link
								to="/login"
								aria-label="Entrar"
								className="bg-primary-500 text-gray-900 font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
							>
								<LogIn className="mr-2" />
								Entrar
							</Link>
						)}
					</div>

					{/* BOTÃO MOBILE */}
					<div className="md:hidden flex items-center">
						<button
							type="button"
							className="text-gray-400 p-2 hover:bg-gray-800 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
							onClick={changeMenu()}
							aria-label="Alternar menu"
							aria-expanded={isOpen}
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* MENU MOBILE */}
			{isOpen && (
				<div>
					<div>
						{isAuthenticated ? (
							<>
								<nav className="space-y-1">
									{navLink.map((link) => (
										<NavLink
											key={link.path}
											to={link.path}
											className={({ isActive }) =>
												`block p-5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
													isActive
														? "bg-primary-500/10 text-primary-500 font-semibold"
														: "text-gray-400 hover:text-primary-500 hover:bg-primary-500/5 active:opacity-70"
												}`
											}
											onClick={() => setIsOpen(false)}
										>
											{link.name}
										</NavLink>
									))}
								</nav>

								<div className="flex items-center justify-between p-4 border-t border-gray-700">
									<div className="flex items-center space-x-2">
										{renderAvatar()}
										<span>{authState.user?.displayName}</span>
									</div>
									<button
										type="button"
										onClick={handleSignOut}
										className="hover:text-red-300 hover:bg-red-700 active:opacity-70 p-2 rounded-full cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
										aria-label="Sair"
									>
										<LogOut size={24} />
									</button>
								</div>
							</>
						) : (
							<Link
								to="/login"
								className="bg-primary-500 text-gray-900 font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
								onClick={() => setIsOpen(false)}
							>
								Entrar
							</Link>
						)}
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
