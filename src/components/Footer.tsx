const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-800 border-t border-gray-700 py-4 text-center">
			<div className="container-app">
				<p className="text-sm text-gray-400">
					<span className="text-primary-500 font-semibold">DevBills</span> ©{" "}
					{currentYear} – Desenvolvido por <strong>Johnatan G3</strong>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
