import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

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

	const [current, setCurrent] = useState<TabKey>(active || "timeline");

	// Lắng nghe scroll để highlight tab hiện tại
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const windowHeight = window.innerHeight;
			const currentSectionIndex = Math.round(scrollPosition / windowHeight);

			const sections = Array.from(document.querySelectorAll("section[id]"));
			if (sections[currentSectionIndex]) {
				const currentSectionId = sections[currentSectionIndex].id;
				const correspondingTab = items.find((item) => item.targetId === currentSectionId);
				if (correspondingTab) setCurrent(correspondingTab.key);
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [items]);

	// Cập nhật khi nhận prop active
	useEffect(() => {
		if (active) setCurrent(active);
	}, [active]);

	const scrollToSection = (id: string) => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<nav
			// width = full width - width của rear-rectangle = width của white-rectangle area
			className="h-full flex-1 bg-transparent border-t border-b border-black overflow-hidden relative z-10"
			aria-label="Main sections"
		>
			<ul className="grid grid-cols-4 h-full">
				{items.map((it) => {
					const isActive = current === it.key;
					return (
						<li key={it.key} className="h-full">
							<button
								onClick={() => {
									scrollToSection(it.targetId);
									setCurrent(it.key);
									onChange?.(it.key);
								}}
								className={`w-full h-full text-base md:text-lg font-semibold transition cursor-pointer relative z-20
                  ${isActive ? "bg-[#9b0000] text-white" : "text-black hover:bg-[#9b0000] hover:text-white"}`}
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
