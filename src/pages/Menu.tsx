import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAssetPath } from "../utils/assets";

type Item = {
	key: "timeline" | "map" | "gallery" | "experience";
	title: string;
	subtitle: string;
	sectionId: string;
};

export default function Menu() {
	const { t } = useTranslation();

	const ITEMS: Item[] = [
		{ key: "timeline", title: t("menu.timeline.title"), subtitle: t("menu.timeline.subtitle"), sectionId: "timeline" },
		{ key: "map", title: t("menu.map.title"), subtitle: t("menu.map.subtitle"), sectionId: "map" },
		{ key: "gallery", title: t("menu.gallery.title"), subtitle: t("menu.gallery.subtitle"), sectionId: "gallery" },
		{ key: "experience", title: t("menu.experience.title"), subtitle: t("menu.experience.subtitle"), sectionId: "experience" },
	];

	const [activeIdx, setActiveIdx] = useState(0);

	useEffect(() => {
		const id = setInterval(() => setActiveIdx((i) => (i + 1) % ITEMS.length), 5000);
		return () => clearInterval(id);
	}, []);

	const bg = useMemo(
		() => ({
			active: {
				backgroundImage: `url('${getAssetPath("/assets/red-component-background.png")}')`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			} as const,
			inactive: {
				backgroundImage: `url('${getAssetPath("/assets/gray-component-background.png")}')`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			} as const,
		}),
		[]
	);

	// Scale cho TV lớn nhưng vẫn gọn trên laptop - TĂNG HEIGHT LÊN GẤP ĐÔI
	const SZ = {
		containerMaxW: "min(86vw, 2400px)",
		gridGap: "clamp(12px, 1.6vw, 32px)",
		topGap: "clamp(16px, 3vh, 56px)",
		bottomPad: "clamp(16px, 3vh, 56px)",
		logoH: "clamp(68px, 4.2vw, 150px)", // chỉ set HEIGHT để không méo
		cardRadius: "clamp(14px, 1.2vw, 28px)",
		cardPad: "clamp(16px, 1.4vw, 28px)",
		cardMinH: "clamp(360px, 24vw, 560px)", // TĂNG GẤP ĐÔI: từ 180px lên 360px, từ 12vw lên 24vw, từ 280px lên 560px
		cardMaxH: "clamp(600px, 68vh, 1040px)", // TĂNG GẤP ĐÔI: từ 300px lên 600px, từ 34vh lên 68vh, từ 520px lên 1040px
		cardAR: "16 / 20", // THAY ĐỔI: từ 16/10 (ngang) thành 16/20 (cao gấp đôi)
		titleSize: "clamp(18px, 1.6vw, 40px)",
		subtitleSize: "clamp(14px, 1.2vw, 26px)",
		ring: "0 10px 40px rgba(0,0,0,.25)",
	};

	const handleItemClick = (sectionId: string) => {
		const section = document.getElementById(sectionId);
		section?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section
			className="min-h-[100dvh] w-full flex flex-col items-center justify-center"
			style={{
				// LOẠI BỎ background trùng lặp - chỉ giữ 1 background
				backgroundImage: `url('${getAssetPath("/assets/white-background.png")}')`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				paddingTop: SZ.topGap,
				paddingBottom: SZ.bottomPad,
			}}
		>
			{/* Logo: giữ tỉ lệ tự nhiên */}
			<div className="flex flex-col items-center" style={{ marginBottom: SZ.topGap }}>
				<img
					src={getAssetPath("/assets/bo-noi-vu-icon.png")}
					alt="Bộ Nội vụ"
					draggable={false}
					className="select-none object-contain"
					style={{ height: SZ.logoH, width: "auto" }} // <-- không set width cố định
				/>
			</div>

			{/* Grid 4 thẻ – chữ nhật cao (gấp đôi height) */}
			<div className="w-full" style={{ maxWidth: SZ.containerMaxW, paddingLeft: "2vw", paddingRight: "2vw" }}>
				<div
					className="grid"
					style={{
						gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
						gap: SZ.gridGap,
					}}
				>
					{ITEMS.map((it, i) => {
						const isActive = i === activeIdx;
						return (
							<button
								key={it.key}
								onClick={() => handleItemClick(it.sectionId)}
								onMouseEnter={() => setActiveIdx(i)}
								className="group relative overflow-hidden text-left focus:outline-none transition-transform will-change-transform"
								style={{
									...(isActive ? bg.active : bg.inactive),
									borderRadius: SZ.cardRadius as any,
									aspectRatio: SZ.cardAR as any, // <-- 16/20 để cao gấp đôi
									minHeight: SZ.cardMinH as any, // <-- TĂNG GẤP ĐÔI
									maxHeight: SZ.cardMaxH as any, // <-- TĂNG GẤP ĐÔI
									boxShadow: SZ.ring,
								}}
							>
								<div className="absolute inset-0 bg-black/30 group-hover:bg-black/25 transition-colors" />
								<div className="relative h-full w-full flex flex-col items-center justify-center text-center" style={{ padding: SZ.cardPad }}>
									<h3 className="text-white font-semibold drop-shadow-sm leading-tight" style={{ fontSize: SZ.titleSize }}>
										{it.title}
									</h3>
									<p className="mt-3 text-white/95 leading-snug drop-shadow" style={{ fontSize: SZ.subtitleSize }}>
										{it.subtitle}
									</p>
								</div>
								<div className="absolute inset-0 transition-transform group-hover:scale-[1.02]" />
							</button>
						);
					})}
				</div>
			</div>
		</section>
	);
}
