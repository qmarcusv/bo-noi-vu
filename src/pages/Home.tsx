// src/pages/Home.tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { getAssetPath } from "../utils/assets";

export default function Home() {
	const { t } = useTranslation();

	const handleStartExplore = () => {
		const menuSection = document.getElementById("menu");
		if (menuSection) menuSection.scrollIntoView({ behavior: "smooth" });
	};

	// Kích thước co giãn theo viewport (đã hạ min để vừa laptop)
	const SZ = {
		logoW: "clamp(64px, 4.6vw, 150px)",
		logoH: "clamp(80px, 6vw, 190px)",
		labelSize: "clamp(16px, 1.05vw, 26px)",
		containerMaxW: "min(88vw, 1800px)",
		videoMaxW: "min(78vw, 1800px)",
		videoH: "clamp(240px, 42dvh, 58dvh)", // CHÍNH: luôn vừa 1 màn hình
		cardRadius: "clamp(12px, 1vw, 24px)",
		playBtn: "clamp(52px, 4.6vw, 110px)",
		playIcon: "clamp(22px, 2.2vw, 44px)",
		ctaPX: "clamp(14px, 1.4vw, 34px)",
		ctaPY: "clamp(9px, 0.9vw, 18px)",
		ctaFont: "clamp(18px, 1.5vw, 30px)",
		arrow: "clamp(24px, 1.8vw, 52px)",
		topPad: "clamp(12px, 3vh, 48px)",
		rowGap: "clamp(10px, 2.2vh, 28px)",
		bottomGap: "clamp(8px, 2vh, 24px)",
	};

	return (
		<section
			className="relative min-h-[100dvh] w-full overflow-hidden text-white"
			style={{
				// Fallback màu nền để không lộ mép đen + cover tuyệt đối
				backgroundColor: "#7a0910",
				backgroundImage: `url('${getAssetPath("/assets/red-background.png")}')`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center center",
			}}
		>
			<div className="absolute inset-0 bg-black/20" />

			{/* Language switcher ở góc dưới bên phải */}
			<div className="absolute bottom-4 right-4 z-50">
				<LanguageSwitcher />
			</div>

			{/* Dùng GRID 4 hàng: Logo | Video (co giãn) | CTA | Arrow */}
			<div
				className="relative z-10 mx-auto grid min-h-[100dvh] w-full justify-items-center items-center"
				style={{
					maxWidth: SZ.containerMaxW,
					gridTemplateRows: "auto 1fr auto auto",
					rowGap: SZ.rowGap,
					paddingTop: SZ.topPad,
					paddingBottom: `calc(${SZ.bottomGap} + env(safe-area-inset-bottom, 0px))`,
				}}
			>
				{/* 1) LOGO */}
				<div className="flex flex-col items-center">
					<img src={getAssetPath("/assets/bo-noi-vu-icon.png")} alt={t("common.boNoiVu")} className="select-none" draggable={false} style={{ width: SZ.logoW, height: SZ.logoH }} />
				</div>

				{/* 2) VIDEO (giới hạn theo vh để luôn vừa màn) */}
				<div className="w-full flex items-center justify-center px-4">
					<div className="w-full flex flex-col items-center" style={{ maxWidth: SZ.videoMaxW }}>
						<div
							className="relative bg-black/25 overflow-hidden ring-1 ring-white/25"
							style={{
								borderRadius: SZ.cardRadius,
								height: SZ.videoH, // CHÍNH: đặt chiều cao cố định theo vh
								aspectRatio: "16 / 9", // giữ tỉ lệ, width sẽ tự tính
								maxWidth: "100%", // đảm bảo không vượt quá container
							}}
						>
							<div className="absolute inset-0 flex items-center justify-center">
								<div
									className="backdrop-blur-sm ring-1 ring-white/30 flex items-center justify-center"
									style={{
										width: SZ.playBtn,
										height: SZ.playBtn,
										borderRadius: "20px",
										background: "rgba(255,255,255,.18)",
									}}
								>
									<svg viewBox="0 0 24 24" className="fill-white" style={{ width: SZ.playIcon, height: SZ.playIcon }}>
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
							</div>
						</div>
						<p className="mt-3 text-center opacity-90 tracking-wide" style={{ fontSize: SZ.labelSize }}>
							{t("common.videoAutoplay")}
						</p>
					</div>
				</div>

				{/* 3) CTA */}
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="relative"
					onClick={handleStartExplore}
					aria-label={t("common.startExploring")}
					style={{
						backgroundImage: `url('${getAssetPath("/assets/text-background.png")}')`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						padding: `${SZ.ctaPY} ${SZ.ctaPX}`,
						fontSize: SZ.ctaFont,
						borderRadius: "12px",
					}}
				>
					<span className="block font-semibold">{t("common.startExploring")}</span>
				</motion.button>

				{/* 4) ARROW (luôn nằm trong khung nhờ grid) */}
				<img
					src={getAssetPath("/assets/down-arrow.png")}
					onClick={handleStartExplore}
					alt=""
					aria-hidden
					className="opacity-95 select-none cursor-pointer animate-bounce"
					draggable={false}
					style={{ width: SZ.arrow, height: SZ.arrow }}
				/>
			</div>
		</section>
	);
}
