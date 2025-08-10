import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import MainNavbar from "../components/MainNavbar";
import { boNoiVu, neutral, overlay } from "../constants/colors";
import { getAssetPath } from "../utils/assets";

type TimelineEvent = {
	year: string;
	title: string;
	description: string;
	content: string;
};

export default function Timeline() {
	const { t } = useTranslation();
	const [activeIdx, setActiveIdx] = useState(1);
	const [expandedContent, setExpandedContent] = useState(false);
	const [, setActiveTab] = useState<"timeline" | "map" | "media" | "zone">("timeline");

	// Lấy dữ liệu từ file ngôn ngữ
	const timelineEvents: TimelineEvent[] = useMemo(() => {
		const events = [];
		const years = ["2002", "2004", "2005", "2007", "2008"];

		for (const year of years) {
			const event = t(`pages.timeline.events.${year}`, { returnObjects: true }) as any;
			if (event) {
				events.push({
					year,
					title: event.title,
					description: event.description,
					content: event.content,
				});
			}
		}

		return events;
	}, [t]);

	const active = timelineEvents[activeIdx];
	const years = useMemo(() => timelineEvents.map((e) => e.year), [timelineEvents]);

	const goPrev = () => {
		setActiveIdx((i) => (i > 0 ? i - 1 : i));
		setExpandedContent(false); // Reset trạng thái khi chuyển event
	};
	const goNext = () => {
		setActiveIdx((i) => (i < timelineEvents.length - 1 ? i + 1 : i));
		setExpandedContent(false); // Reset trạng thái khi chuyển event
	};

	return (
		<div className="h-screen w-full relative overflow-hidden">
			{/* Layout nền */}
			<div className="absolute inset-0 flex">
				{/* LEFT: rear-rectangle giữ tỉ lệ, luôn cao 100% */}
				<div className="relative h-full flex-none overflow-hidden">
					<img id="rear-rectangle" src={getAssetPath("/assets/rear-rectangle.png")} alt="" className="h-full w-auto object-contain select-none" draggable={false} />
				</div>

				{/* RIGHT: white background area */}
				<div className="relative h-full flex-1">
					<img src={getAssetPath("/assets/white-background.png")} alt="" className="absolute inset-0 h-full w-full object-cover" />

					{/* Icon Home ở góc trên phải trong vùng trắng */}
					<button
						onClick={() => {
							const homeSection = document.getElementById("home");
							if (homeSection) {
								homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
							}
						}}
						aria-label="home"
						className="absolute right-6 top-6 z-20 h-12 w-12 rounded-full grid place-items-center hover:opacity-90 cursor-pointer"
					>
						<img src={getAssetPath("/assets/home-icon.png")} alt="Home" className="h-12 w-12 object-contain" />
					</button>

					{/* Vùng nội dung 80% chiều ngang, chừa 10% đáy cho navbar */}
					<div className="relative z-10 h-full w-full flex">
						<div className="mx-auto w-[80%] h-full flex flex-col pt-[clamp(12px,3vh,48px)] pb-[10%]">
							{/* Title */}
							<h1 className="text-5xl md:text-6xl font-extrabold tracking-tight" style={{ color: boNoiVu.light }}>
								{t("pages.timeline.title").toUpperCase()}
							</h1>

							{/* Box dòng mô tả dưới tiêu đề */}
							<div
								className="mt-6 w-[100%] max-w-[100%] rounded-xl border shadow px-6 py-3 text-lg font-semibold"
								style={{
									backgroundColor: overlay.white[90],
									borderColor: overlay.black[10],
									color: neutral.black,
								}}
							>
								<div className="flex flex-wrap gap-x-4 gap-y-2">
									<span>{t("pages.timeline.subtitle")}</span>
								</div>
							</div>

							{/* Nội dung chính */}
							<div className="mt-14 grid grid-cols-12 gap-10 items-start">
								{/* Trái: text */}
								<div className="col-span-12 lg:col-span-6">
									<p className="text-5xl md:text-6xl font-extrabold" style={{ color: boNoiVu.light }}>
										{active.year}
									</p>
									<h2 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: boNoiVu.light }}>
										{active.title}
									</h2>
									<p className="mt-2 text-xl font-bold" style={{ color: neutral.black }}>
										{active.description}
									</p>
									{/* Text dài với tính năng xem thêm */}
									<div className="mt-6 max-w-[560px]">
										<div
											className={`text-sm md:text-[13px] leading-6 transition-all duration-300 ${expandedContent ? "max-h-none" : "max-h-[120px] overflow-hidden"}`}
											style={{ color: overlay.black[90] }}
										>
											{active.content} {active.content}
										</div>

										{/* Nút xem thêm/thu gọn */}
										<button
											onClick={() => setExpandedContent(!expandedContent)}
											className="mt-3 text-sm font-medium text-[#9b0000] hover:text-[#7a0910] transition-colors duration-200 flex items-center gap-2"
										>
											{expandedContent ? (
												<>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
													</svg>
													Thu gọn
												</>
											) : (
												<>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
													</svg>
													Xem thêm
												</>
											)}
										</button>
									</div>
								</div>

								{/* Phải: khung slideshow */}
								<div className="col-span-12 lg:col-span-6">
									<div className="relative rounded-xl overflow-hidden h-[340px] md:h-[420px]" style={{ backgroundColor: boNoiVu.main }}>
										<button
											onClick={goPrev}
											className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border grid place-items-center hover:bg-white/15"
											style={{
												borderColor: overlay.white[60],
											}}
											aria-label={t("pages.timeline.navigation.previous")}
										>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
												<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
											</svg>
										</button>
										<button
											onClick={goNext}
											className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border grid place-items-center hover:bg-white/15"
											style={{
												borderColor: overlay.white[60],
											}}
											aria-label={t("pages.timeline.navigation.next")}
										>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
												<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
											</svg>
										</button>

										{/* Text mô tả ảnh/video */}
										<div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-center">
											<p className="text-sm font-medium">
												{active.title} - {active.description}
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Timeline căn giữa */}
							<div className="mt-10 w-full flex justify-center">
								<div className="w-full max-w-[960px]">
									{/* Hàng 1: Năm (grid N cột) */}
									<div
										className="grid justify-items-center"
										style={{
											gridTemplateColumns: `repeat(${years.length}, 1fr)`,
											columnGap: "4rem",
										}}
									>
										{years.map((y, i) => (
											<div key={`label-${y}`} className="text-center">
												<div className={`font-semibold transition-all duration-300 ${i === activeIdx ? "text-2xl" : "text-base"}`} style={{ color: i === activeIdx ? boNoiVu.light : neutral.black }}>
													{y}
												</div>
											</div>
										))}
									</div>

									{/* Hàng 2: Lane (ARROW + LINE + DOTS) */}
									<div className="relative h-6 mt-2">
										{/* Nét đứt — chạy giữa lane, chừa khoảng cho 2 arrow */}
										<div className="absolute top-1/2 -translate-y-1/2 left-12 right-12 h-0.5 border-t border-dashed" style={{ borderColor: overlay.black[40] }} />

										{/* Arrow trái (cùng hàng với dot/line) */}
										<button
											onClick={goPrev}
											className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg border grid place-items-center hover:bg-black/5"
											style={{ borderColor: overlay.black[20] }}
											aria-label={t("pages.timeline.navigation.previous")}
										>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-black" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
												<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
											</svg>
										</button>

										{/* DOTS (grid N cột) – căn giữa đúng trên nét đứt */}
										<div
											className="grid justify-items-center h-full mx-12"
											style={{
												gridTemplateColumns: `repeat(${years.length}, 1fr)`,
												columnGap: "4rem",
											}}
										>
											{years.map((y, i) => (
												<div key={`dot-${y}`} className="relative h-6 w-6">
													{i === activeIdx && <div className="pointer-events-none absolute inset-0 rounded-full border-2 border-black" />}
													<button
														onClick={() => {
															setActiveIdx(i);
															setExpandedContent(false); // Reset trạng thái khi chuyển năm
														}}
														className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 ${i === activeIdx ? "h-4 w-4" : "h-3 w-3"}`}
														style={{
															backgroundColor: i === activeIdx ? boNoiVu.light : neutral.black,
															borderColor: i === activeIdx ? boNoiVu.light : neutral.black,
														}}
														aria-label={`${t("pages.timeline.navigation.jumpTo")} ${y}`}
													/>
												</div>
											))}
										</div>

										{/* Arrow phải (cùng hàng với dot/line) */}
										<button
											onClick={goNext}
											className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg border grid place-items-center hover:bg-black/5"
											style={{ borderColor: overlay.black[20] }}
											aria-label={t("pages.timeline.navigation.next")}
										>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-black" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
												<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
											</svg>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* MainNavbar ở cuối trang */}
					<div className="absolute bottom-0 left-0 right-0 h-[10%] z-20">
						<MainNavbar active="timeline" onChange={setActiveTab} />
					</div>
				</div>
			</div>
		</div>
	);
}
