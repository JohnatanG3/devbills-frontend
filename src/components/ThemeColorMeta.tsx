import { useEffect } from "react";
import { useLocation } from "react-router";

const ThemeColorMeta = () => {
	const location = useLocation();

	useEffect(() => {
		const metaTagName = "theme-color";
		let themeMetaTag = document.querySelector(
			`meta[name="${metaTagName}"]`,
		) as HTMLMetaElement;

		if (!themeMetaTag) {
			themeMetaTag = document.createElement("meta");
			themeMetaTag.name = metaTagName;
			document.head.appendChild(themeMetaTag);
		}

		const isLogin = location.pathname === "/login";
		const themeColor = isLogin ? "#F8FAFC" : "#0B1017"; // branco ou preto escuro

		themeMetaTag.setAttribute("content", themeColor);
	}, [location.pathname]);

	return null;
};

export default ThemeColorMeta;
