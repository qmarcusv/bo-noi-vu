import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import MainNavbar from "../components/MainNavbar";
import { boNoiVu, neutral, overlay } from "../constants/colors";
import { getAssetPath } from "../utils/assets";
import { ADMIN_UNITS, PUB_UNITS, MAP_TEXTS } from "../data/map";
import type { MapUnit } from "../data/map";

type TabKey = "timeline" | "map" | "media" | "zone";

function Star({ active }: { active?: boolean }) {
	return (
		<svg
			viewBox="0 0 24 24"
			className="h-[clamp(24px,2.2vw,36px)] w-[clamp(24px,2.2vw,36px)]"
			fill={active ? "#F1B24A" : "none"}
			stroke={active ? "#FDF7E8" : overlay.white[50]}
			strokeWidth={active ? 0 : 2}
		>
			<path d="m12 2 2.95 6.34 6.99.61-5.28 4.59 1.61 6.82L12 17.77 5.73 20.36l1.61-6.82L2.06 8.95l6.99-.61L12 2z" />
		</svg>
	);
}

export default function Map() {
	const { t } = useTranslation();
	const [, setActiveTab] = useState<TabKey>("map");
	const [selectedUnit, setSelectedUnit] = useState<MapUnit | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [highlightedAdminIndex, setHighlightedAdminIndex] = useState(0);

	const handleUnitClick = (unit: MapUnit) => {
		setSelectedUnit(unit);
		setIsPopupOpen(true);
	};

	const closePopup = () => {
		setIsPopupOpen(false);
		setSelectedUnit(null);
	};
	// Khóa scroll nền khi mở popup
	useEffect(() => {
		if (isPopupOpen) {
			const prev = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = prev;
			};
		}
	}, [isPopupOpen]);
	// Handle escape key when popup is open
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closePopup();
			}
		};

		if (isPopupOpen) {
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isPopupOpen]);

	// Auto-highlight admin units every 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setHighlightedAdminIndex((prevIndex) => (prevIndex + 1) % ADMIN_UNITS.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const twoLinePublicHeading = useMemo(() => {
		// Tách như ảnh: "NHÓM ĐƠN VỊ" xuống dòng "SỰ NGHIỆP CÔNG LẬP"
		const a = MAP_TEXTS[t("common.language") as "vi" | "en"].publicGroup.line1;
		const b = MAP_TEXTS[t("common.language") as "vi" | "en"].publicGroup.line2;
		return { a, b };
	}, [t]);

	return (
		<div className="h-screen w-full relative overflow-hidden">
			{/* BG layout */}
			<div className="absolute inset-0 flex">
				{/* LEFT red strip */}
				<div className="relative h-full flex-none overflow-hidden">
					<img src={getAssetPath("/assets/rear-rectangle.png")} alt="" className="h-full w-auto object-contain" />
				</div>

				{/* RIGHT white area */}
				<div className="relative h-full flex-1">
					<img src={getAssetPath("/assets/white-background.png")} alt="" className="absolute inset-0 h-full w-full object-cover" />
					{/* Home */}
					<button
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						className="absolute right-[clamp(8px,1.3vw,24px)] top-[clamp(8px,1.3vw,24px)] z-20 grid h-[clamp(32px,3vw,64px)] w-[clamp(32px,3vw,64px)] place-items-center hover:opacity-90"
						aria-label={MAP_TEXTS[t("common.language") as "vi" | "en"].ariaLabels.home}
					>
						<img src={getAssetPath("/assets/home-icon.png")} alt="" className="h-full w-full object-contain" />
					</button>
					{/* Content box (kept 16:9 friendly) */}
					<div className="relative z-10 h-full w-full flex">
						<div className={["mx-auto h-full w-[92%] md:w-[86%] xl:w-[82%]", "flex flex-col", "pt-[clamp(12px,3vh,48px)] pb-[10%]"].join(" ")}>
							{/* Title */}
							<h1 className="font-extrabold tracking-tight" style={{ color: boNoiVu.light, fontSize: "clamp(24px,3.2vw,56px)" }}>
								{t("pages.map.title").toUpperCase()}
							</h1>

							{/* Filter box */}
							<div
								className="mt-6 w-[100%] max-w-[100%] rounded-xl border shadow px-6 py-3 text-lg font-semibold"
								style={{
									backgroundColor: "rgba(255,255,255,0.9)",
									borderColor: "rgba(0,0,0,0.1)",
									color: "#000000",
								}}
							>
								{t("pages.map.subtitle")}
							</div>

							{/* MAIN SECTION */}
							<div className="mt-[clamp(12px,2.2vw,36px)] grid grid-cols-12 gap-[clamp(10px,1.8vw,28px)] items-start">
								{/* LEFT GROUP */}
								<div className="col-span-12 lg:col-span-7">
									<h4 className="text-center font-extrabold" style={{ color: boNoiVu.light, fontSize: "clamp(16px,1.8vw,28px)" }}>
										{MAP_TEXTS[t("common.language") as "vi" | "en"].adminGroup}
									</h4>

									<div className="mt-[clamp(8px,1.6vw,20px)] grid grid-cols-1 sm:grid-cols-2 gap-[clamp(8px,1.2vw,16px)]">
										{ADMIN_UNITS.map((u, idx) => {
											const isHighlighted = idx === highlightedAdminIndex;
											return (
												<button
													key={u.id}
													onClick={() => handleUnitClick(u)}
													className={[
														"flex items-center gap-[clamp(8px,1vw,14px)] rounded-lg border text-left transition-all duration-500",
														"px-[clamp(12px,1.6vw,24px)] py-[clamp(10px,1.4vw,20px)]",
														"hover:brightness-105 cursor-pointer shadow-md hover:shadow-lg",
														isHighlighted ? "scale-105 shadow-lg" : "",
													].join(" ")}
													style={{
														backgroundColor: isHighlighted ? boNoiVu.dark : "rgba(0,0,0,0.5)",
														borderColor: isHighlighted ? boNoiVu.dark : "rgba(255,255,255,0.2)",
														color: isHighlighted ? "#FDF7E8" : "#ffffff",
													}}
													title={u.name}
												>
													<Star active={isHighlighted} />
													<span className="font-medium" style={{ fontSize: "clamp(12px,1.1vw,18px)" }}>
														{u.name}
													</span>
												</button>
											);
										})}
									</div>
								</div>

								{/* RIGHT GROUP */}
								<div className="col-span-12 lg:col-span-5">
									<div
										className="rounded-xl border p-[clamp(12px,1.8vw,28px)] shadow-md"
										style={{
											borderColor: "rgba(255,255,255,0.15)",
											backgroundColor: "rgba(0,0,0,0.25)",
										}}
									>
										<h3 className="text-center font-extrabold leading-tight" style={{ color: boNoiVu.light, fontSize: "clamp(16px,1.8vw,28px)" }}>
											{twoLinePublicHeading.a}
											<br />
											{twoLinePublicHeading.b}
										</h3>

										<div className="mt-[clamp(10px,1.8vw,28px)] flex flex-col gap-[clamp(8px,1.2vw,16px)]">
											{PUB_UNITS.map((u) => (
												<button
													key={u.id}
													onClick={() => handleUnitClick(u)}
													className="flex items-center gap-[clamp(10px,1.4vw,20px)] rounded-xl border px-[clamp(12px,1.6vw,24px)] py-[clamp(10px,1.4vw,20px)] hover:ring-2 transition cursor-pointer shadow-md hover:shadow-lg"
													style={{
														backgroundColor: "rgba(0,0,0,0.5)",
														borderColor: "rgba(255,255,255,0.2)",
														// subtle brand ring
														// @ts-ignore
														"--tw-ring-color": `${boNoiVu.light}40`,
													}}
												>
													<div
														className="grid place-items-center rounded-full border-2 flex-none"
														style={{
															height: "clamp(36px,3.6vw,72px)",
															width: "clamp(36px,3.6vw,72px)",
															borderColor: "rgba(255,255,255,0.3)",
															color: "#ffffff",
															fontSize: "clamp(10px,0.9vw,16px)",
															fontWeight: 700,
														}}
													>
														{u.logo ? <img src={u.logo} className="h-full w-full rounded-full object-cover" /> : MAP_TEXTS[t("common.language") as "vi" | "en"].modal.logo}
													</div>

													<div className="min-w-0 flex-1">
														<div className="font-semibold truncate" style={{ color: "#ffffff", fontSize: "clamp(12px,1.1vw,18px)" }} title={u.name}>
															{u.name}
														</div>
														{u.website && (
															<div
																className="truncate"
																style={{
																	color: "rgba(255,255,255,0.8)",
																	fontSize: "clamp(10px,0.95vw,16px)",
																	marginTop: "clamp(2px,0.3vw,6px)",
																}}
																title={u.website}
															>
																{u.website}
															</div>
														)}
													</div>
												</button>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom navbar (reserved height ~10%) */}
					<div className="absolute bottom-0 left-0 right-0 h-[10%] z-20">
						<MainNavbar active="map" onChange={setActiveTab} />
					</div>
				</div>
			</div>

			{/* Unit Modal Popup */}
			{isPopupOpen && selectedUnit && (
				<>
					{/* Backdrop làm tối + hơi blur, click để đóng */}
					<div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[1px]" onClick={closePopup} aria-hidden="true" />

					{/* Modal */}
					<div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
						<div
							role="dialog"
							aria-modal="true"
							className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl"
							style={{ backgroundColor: neutral.white, borderColor: overlay.black[10] }}
							onClick={(e) => e.stopPropagation()} // chặn click lan ra backdrop
						>
							{/* Header */}
							<div className="sticky top-0 flex items-center justify-between p-6 border-b" style={{ borderColor: overlay.black[10], backgroundColor: boNoiVu.light }}>
								<h2 className="text-2xl font-bold text-white truncate pr-4" title={selectedUnit.name}>
									{selectedUnit.name}
								</h2>
								<button
									onClick={closePopup}
									className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
									aria-label={MAP_TEXTS[t("common.language") as "vi" | "en"].ariaLabels.close}
								>
									<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							{/* Content */}
							<div className="p-6 space-y-6">
								{selectedUnit.description && (
									<div>
										<h3 className="text-lg font-semibold mb-2" style={{ color: boNoiVu.light }}>
											{MAP_TEXTS[t("common.language") as "vi" | "en"].modal.description}
										</h3>
										<p className="text-gray-700 leading-relaxed">{selectedUnit.description}</p>
									</div>
								)}

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{selectedUnit.address && (
										<div>
											<h3 className="text-lg font-semibold mb-2" style={{ color: boNoiVu.light }}>
												{MAP_TEXTS[t("common.language") as "vi" | "en"].modal.address}
											</h3>
											<p className="text-gray-700">{selectedUnit.address}</p>
										</div>
									)}
									{selectedUnit.phone && (
										<div>
											<h3 className="text-lg font-semibold mb-2" style={{ color: boNoiVu.light }}>
												{MAP_TEXTS[t("common.language") as "vi" | "en"].modal.phone}
											</h3>
											<p className="text-gray-700">{selectedUnit.phone}</p>
										</div>
									)}
									{selectedUnit.email && (
										<div>
											<h3 className="text-lg font-semibold mb-2" style={{ color: boNoiVu.light }}>
												{MAP_TEXTS[t("common.language") as "vi" | "en"].modal.email}
											</h3>
											<p className="text-gray-700 break-all">{selectedUnit.email}</p>
										</div>
									)}
									{selectedUnit.website && (
										<div>
											<h3 className="text-lg font-semibold mb-2" style={{ color: boNoiVu.light }}>
												{MAP_TEXTS[t("common.language") as "vi" | "en"].modal.website}
											</h3>
											<a href={selectedUnit.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline break-all">
												{selectedUnit.website}
											</a>
										</div>
									)}
								</div>

								{selectedUnit.logo && (
									<div className="text-center">
										<h3 className="text-lg font-semibold mb-2" style={{ color: boNoiVu.light }}>
											{MAP_TEXTS[t("common.language") as "vi" | "en"].modal.logo}
										</h3>
										<img src={selectedUnit.logo} alt={`Logo ${selectedUnit.name}`} className="mx-auto max-w-32 max-h-32 object-contain rounded-lg border" style={{ borderColor: overlay.black[20] }} />
									</div>
								)}
							</div>

							{/* Footer */}
							<div className="sticky bottom-0 p-4 border-t bg-gray-50" style={{ borderColor: overlay.black[10] }}>
								<div className="flex justify-end space-x-3">
									{selectedUnit.website && (
										<a
											href={selectedUnit.website}
											target="_blank"
											rel="noopener noreferrer"
											className="px-6 py-2 rounded-lg font-medium transition"
											style={{ backgroundColor: boNoiVu.light, color: neutral.white }}
										>
											{MAP_TEXTS[t("common.language") as "vi" | "en"].modal.openWebsite}
										</a>
									)}
									<button onClick={closePopup} className="px-6 py-2 rounded-lg font-medium border transition hover:bg-gray-100" style={{ borderColor: overlay.black[20], color: neutral.black }}>
										{MAP_TEXTS[t("common.language") as "vi" | "en"].modal.close}
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
