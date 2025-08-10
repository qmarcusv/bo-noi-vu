import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation();

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	const currentLanguage = i18n.language;

	return (
		<div className="flex items-center space-x-2">
			<button
				onClick={() => changeLanguage("vi")}
				className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${currentLanguage === "vi" ? "bg-[#9b0000] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
			>
				VI
			</button>
			<button
				onClick={() => changeLanguage("en")}
				className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${currentLanguage === "en" ? "bg-[#9b0000] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
			>
				EN
			</button>
		</div>
	);
};

export default LanguageSwitcher;
