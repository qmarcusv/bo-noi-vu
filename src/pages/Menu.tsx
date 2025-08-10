import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Item = {
	key: "timeline" | "map" | "gallery" | "experience";
	title: string;
	subtitle: string;
	sectionId: string;
};

export default function Menu() {
	const { t } = useTranslation();

	const ITEMS: Item[] = [
		{
			key: "timeline",
			title: t("menu.timeline.title"),
			subtitle: t("menu.timeline.subtitle"),
			sectionId: "timeline",
		},
		{
			key: "map",
			title: t("menu.map.title"),
			subtitle: t("menu.map.subtitle"),
			sectionId: "map",
		},
		{
			key: "gallery",
			title: t("menu.gallery.title"),
			subtitle: t("menu.gallery.subtitle"),
			sectionId: "gallery",
		},
		{
			key: "experience",
			title: t("menu.experience.title"),
			subtitle: t("menu.experience.subtitle"),
			sectionId: "experience",
		},
	];

	const [activeIdx, setActiveIdx] = useState(0);

	useEffect(() => {
		const id = setInterval(() => setActiveIdx((i) => (i + 1) % ITEMS.length), 5000);
		return () => clearInterval(id);
	}, []);

	const bg = useMemo(
		() => ({
			active: {
				backgroundImage: "url('/assets/red-component-background.png')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			} as const,
			inactive: {
				backgroundImage: "url('/assets/gray-component-background.png')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			} as const,
		}),
		[]
	);

	const handleItemClick = (sectionId: string) => {
		// Scroll đến section tương ứng
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div
			className="h-full w-full flex flex-col items-center justify-center"
			style={{
				backgroundImage: "url('/assets/white-background.png')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* LOGO BỘ NỘI VỤ Ở TRÊN */}
			<div className="flex flex-col items-center mb-8">
				<img
					src="/assets/bo-noi-vu-icon.png"
					alt={t("common.boNoiVu")}
					className="select-none"
					draggable={false}
					style={{
						width: "80px",
						height: "100px",
						maxWidth: "80px",
						maxHeight: "100px",
					}}
				/>
			</div>

			{/* 4 KHUNG NỘI DUNG THEO HÀNG NGANG */}
			<div className="w-full max-w-7xl px-4 h-[50%]">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 h-[100%]">
					{ITEMS.map((it, i) => {
						const isActive = i === activeIdx;
						return (
							<button
								key={it.key}
								onClick={() => handleItemClick(it.sectionId)}
								onMouseEnter={() => setActiveIdx(i)}
								className="group relative overflow-hidden rounded-2xl text-left ring-1 ring-black/5 shadow-lg focus:outline-none transition-transform hover:scale-105"
								style={isActive ? bg.active : bg.inactive}
							>
								<div className="absolute inset-0 bg-black/30 group-hover:bg-black/25 transition-colors" />
								<div className="relative p-4 sm:p-5 md:p-6 h-[140px] sm:h-[160px] md:h-[180px] flex flex-col justify-center text-center">
									<h3 className="text-white text-base sm:text-lg md:text-xl font-semibold drop-shadow-sm leading-tight">{it.title}</h3>
									<p className="mt-2 text-white/95 text-xs sm:text-sm leading-snug drop-shadow">{it.subtitle}</p>
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
