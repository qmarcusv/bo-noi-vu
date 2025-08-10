import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation();

	const changeLanguage = () => {
		// Chuyển đổi giữa VI và EN
		const newLang = i18n.language === "vi" ? "en" : "vi";
		i18n.changeLanguage(newLang);
	};

	const currentLanguage = i18n.language;

	return (
		<button
			onClick={changeLanguage}
			className="px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
			style={{
				backgroundColor: currentLanguage === "vi" ? "#9b0000" : "#ffffff",
				color: currentLanguage === "vi" ? "#ffffff" : "#9b0000",
				border: currentLanguage === "en" ? "2px solid #9b0000" : "none",
				minWidth: "60px",
			}}
			title={`Chuyển sang ${currentLanguage === "vi" ? "English" : "Tiếng Việt"}`}
		>
			{currentLanguage === "vi" ? "VI" : "EN"}
		</button>
	);
};

export default LanguageSwitcher;
