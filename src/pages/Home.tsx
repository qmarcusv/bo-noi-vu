import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Home() {
	const { t } = useTranslation();
	const handleStartExplore = () => {
		// Scroll xuống section menu (section thứ 2)
		const menuSection = document.getElementById("menu");
		if (menuSection) {
			menuSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			className="relative min-h-screen w-full overflow-hidden text-white"
			style={{
				backgroundImage: "url('/assets/red-background.png')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="absolute inset-0 bg-black/20" />

			{/* Language Switcher ở góc trên phải */}
			<div className="absolute top-4 right-4 z-50">
				<LanguageSwitcher />
			</div>

			<div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center">
				{/* LOGO BỘ NỘI VỤ Ở GIỮA TRÊN */}
				<div className="pt-8 sm:pt-10 md:pt-12 lg:pt-14 flex flex-col items-center">
					<img
						src="/assets/bo-noi-vu-icon.png"
						alt={t("common.boNoiVu")}
						className="select-none"
						draggable={false}
						style={{
							width: "64px",
							height: "80px",
							maxWidth: "64px",
							maxHeight: "80px",
						}}
					/>
				</div>

				{/* KHUNG VIDEO Ở GIỮA */}
				<div className="flex-1 w-full flex items-center justify-center px-4">
					<div className="w-full max-w-[960px]">
						<div className="relative aspect-[16/9] rounded-2xl ring-1 ring-white/20 bg-black/25 overflow-hidden">
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center ring-1 ring-white/30">
									<svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-white">
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
							</div>
						</div>
						<p className="mt-3 text-center text-xs sm:text-sm md:text-base opacity-90 tracking-wide">{t("common.videoAutoplay")}</p>
					</div>
				</div>

				{/* NÚT "BẮT ĐẦU KHÁM PHÁ" VỚI TEXT-BACKGROUND.PNG */}
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="relative mb-4 sm:mb-6 md:mb-8"
					onClick={handleStartExplore}
					aria-label={t("common.startExploring")}
					style={{
						backgroundImage: "url('/assets/text-background.png')",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<span className="block px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 text-base sm:text-lg md:text-xl font-semibold">{t("common.startExploring")}</span>
				</motion.button>

				{/* MŨI TÊN XUỐNG VỚI DOWN-ARROW.PNG */}
				<img
					src="/assets/down-arrow.png"
					onClick={handleStartExplore}
					alt=""
					className="mb-6 sm:mb-8 md:mb-10 opacity-95 select-none cursor-pointer"
					draggable={false}
					style={{
						width: "20px",
						height: "20px",
						maxWidth: "20px",
						maxHeight: "20px",
					}}
				/>
			</div>
		</section>
	);
}
