import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getAssetPath } from "../utils/assets";

type TabKey = "timeline" | "map" | "media" | "zone";

export default function MainNavbar({ active, onChange }: { active?: TabKey; onChange?: (tab: TabKey) => void }) {
	const { t } = useTranslation();

	const items: { key: TabKey; label: string; targetId: string }[] = useMemo(
		() => [
			{ key: "timeline", label: t("navigation.timeline"), targetId: "timeline" },
			{ key: "map", label: t("navigation.map"), targetId: "map" },
			{ key: "media", label: t("navigation.media"), targetId: "gallery" },
			{ key: "zone", label: t("navigation.zone"), targetId: "experience" },
		],
		[t]
	);

	// Không cần state nội bộ, chỉ sử dụng prop active
	// Không cần lắng nghe scroll

	const scrollToSection = (id: string) => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<nav
			className="h-full flex-1 overflow-hidden relative z-10 border-t border-black border-l-0 border-r-0 border-b-0"
			style={{
				backgroundImage: `url(${getAssetPath("/assets/white-background.png")})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
			aria-label="Main sections"
		>
			<ul className="grid grid-cols-4 h-full">
				{items.map((it, index) => {
					const isActive = active === it.key;
					return (
						<li key={it.key} className="h-full relative">
							{/* Border giữa các mục (trừ mục cuối) */}
							{index < items.length - 1 && <div className="absolute right-0 top-0 bottom-0 w-px bg-black z-10" />}

							<button
								onClick={() => {
									scrollToSection(it.targetId);
									onChange?.(it.key);
								}}
								className={`w-full h-full font-semibold transition-all duration-300 cursor-pointer relative z-20 flex items-center justify-center
									${isActive ? "bg-[#9b0000] text-white" : "text-gray-700"}`}
								style={{
									fontSize: isActive ? "clamp(14px, 1.4vw, 20px)" : "clamp(12px, 1.2vw, 16px)",
									fontWeight: isActive ? 700 : 600,
								}}
							>
								{it.label}
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
