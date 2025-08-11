import { useMemo, useState, useRef, useEffect } from "react";
import { useAudioUnlock, applyAutoplayAttributes } from "../utils/audioUnlock";
import { useTranslation } from "react-i18next";
import MainNavbar from "../components/MainNavbar";
import { boNoiVu, neutral, overlay } from "../constants/colors";
import { getAssetPath } from "../utils/assets";
import { timelineData, mainVideoTimeline, getEventIndexByVideoTime } from "../data/timeline";
import type { TimelineEvent } from "../data/timeline";

// Hook custom để detect screen size và tính toán text scale
function useResponsiveTextSize() {
	const [textScale, setTextScale] = useState(1);

	useEffect(() => {
		const updateTextScale = () => {
			const screenWidth = window.innerWidth;
			const screenHeight = window.innerHeight;

			// Tính toán diagonal size (inch) dựa trên DPI
			const dpi = window.devicePixelRatio || 1;
			const diagonalPixels = Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight);
			const diagonalInches = diagonalPixels / (dpi * 96); // 96 DPI là standard

			// Màn 17 inch: scale = 1, Màn 70 inch: scale = 2
			// Linear interpolation giữa 17 và 70 inch
			if (diagonalInches <= 17) {
				setTextScale(1);
			} else if (diagonalInches >= 70) {
				setTextScale(2);
			} else {
				// Interpolate giữa 17 và 70 inch
				const scale = 1 + (diagonalInches - 17) / (70 - 17);
				setTextScale(scale);
			}
		};

		updateTextScale();
		window.addEventListener("resize", updateTextScale);

		return () => window.removeEventListener("resize", updateTextScale);
	}, []);

	return textScale;
}

export default function Timeline() {
	const { t } = useTranslation();
	const audioOn = useAudioUnlock();
	const textScale = useResponsiveTextSize();
	const [activeIdx, setActiveIdx] = useState(1);
	const [expandedContent, setExpandedContent] = useState(false);
	const [showPlayOverlay, setShowPlayOverlay] = useState(false);
	// const [videoReady, setVideoReady] = useState(false);
	const [, setActiveTab] = useState<"timeline" | "map" | "media" | "zone">("timeline");

	// Refs cho video
	const videoRef = useRef<HTMLVideoElement>(null);

	// Tự động phát video và đồng bộ trạng thái âm thanh toàn cục
	useEffect(() => {
		const v = videoRef.current;
		if (!v) return;

		// Đảm bảo property được set TRƯỚC khi play
		applyAutoplayAttributes(v, audioOn);

		const tryPlay = async () => {
			try {
				await v.play();
				setShowPlayOverlay(false);
			} catch (err) {
				console.log("Autoplay prevented -> showing overlay", err);
				setShowPlayOverlay(true);
			}
		};

		// Xử lý khi video sẵn sàng
		const handleCanPlay = () => {
			if (v.autoplay) {
				tryPlay();
			}
		};

		// Xử lý khi có đủ dữ liệu để play
		const handleLoadedData = () => {
			if (v.readyState >= 2) {
				if (v.autoplay) {
					tryPlay();
				}
			}
		};

		// Thêm event listeners
		v.addEventListener("canplay", handleCanPlay, { once: true });
		v.addEventListener("loadeddata", handleLoadedData, { once: true });

		// Cleanup
		return () => {
			v.removeEventListener("canplay", handleCanPlay);
			v.removeEventListener("loadeddata", handleLoadedData);
		};
	}, [audioOn]);

	// Xử lý khi user click nút play overlay
	const handlePlayOverlayClick = async () => {
		const v = videoRef.current;
		if (!v) return;

		try {
			// Đảm bảo properties được set đúng
			v.muted = !audioOn;
			// @ts-ignore
			v.playsInline = true;

			await v.play();
			setShowPlayOverlay(false);
		} catch (err) {
			console.log("Manual play failed:", err);
			// Vẫn giữ overlay nếu play thất bại
		}
	};

	// Lấy dữ liệu từ file data
	const timelineEvents: TimelineEvent[] = useMemo(() => {
		return timelineData;
	}, []);

	const active = timelineEvents[activeIdx];
	const years = useMemo(() => timelineEvents.map((e) => e.year), [timelineEvents]);

	// Xử lý sự kiện video
	const handleVideoTimeUpdate = () => {
		if (videoRef.current) {
			const currentTime = videoRef.current.currentTime;
			// Tự động cập nhật timeline dựa trên thời gian video
			const newIndex = getEventIndexByVideoTime(currentTime);
			if (newIndex !== activeIdx && newIndex >= 0) {
				setActiveIdx(newIndex);
				setExpandedContent(false);
			}
		}
	};

	const handleVideoPlay = () => {
		setShowPlayOverlay(false);
	};

	const handleVideoPause = () => {
		// no-op
	};

	const handleVideoEnded = () => {
		setActiveIdx(0);
	};

	// Xử lý click vào timeline để nhảy video
	const jumpToVideoTime = (index: number) => {
		const event = timelineEvents[index];
		const v = videoRef.current;
		if (event.videoTimestamp !== undefined && v) {
			v.currentTime = event.videoTimestamp;
			setActiveIdx(index);
			setExpandedContent(false);

			// Đảm bảo video tiếp tục chạy sau khi seek
			v.muted = !audioOn;
			// @ts-ignore
			v.playsInline = true;

			// Thử play lại nếu video đang pause
			if (v.paused) {
				v.play().catch(() => {
					// Nếu play thất bại, hiển thị overlay
					setShowPlayOverlay(true);
				});
			}
		}
	};

	const goPrev = () => {
		const newIndex = activeIdx > 0 ? activeIdx - 1 : activeIdx;
		jumpToVideoTime(newIndex);
	};
	const goNext = () => {
		const newIndex = activeIdx < timelineEvents.length - 1 ? activeIdx + 1 : activeIdx;
		jumpToVideoTime(newIndex);
	};

	// Helper function để tạo responsive text size
	const getResponsiveTextSize = (baseSize: string, scale: number = textScale) => {
		// Convert base size (e.g., "text-5xl") to number và scale
		const sizeMap: { [key: string]: number } = {
			"text-xs": 12,
			"text-sm": 14,
			"text-base": 16,
			"text-lg": 18,
			"text-xl": 20,
			"text-2xl": 24,
			"text-3xl": 30,
			"text-4xl": 36,
			"text-5xl": 48,
			"text-6xl": 60,
		};

		const baseSizeNum = sizeMap[baseSize] || 16;
		const scaledSize = Math.round(baseSizeNum * scale);

		return { fontSize: `${scaledSize}px` };
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
							<h1
								className="font-extrabold tracking-tight"
								style={{
									color: boNoiVu.light,
									...getResponsiveTextSize("text-5xl", textScale),
								}}
							>
								{t("pages.timeline.title").toUpperCase()}
							</h1>

							{/* Box dòng mô tả dưới tiêu đề */}
							<div
								className="mt-6 w-[100%] max-w-[100%] rounded-xl border shadow px-6 py-3 font-semibold"
								style={{
									backgroundColor: overlay.white[90],
									borderColor: overlay.black[10],
									color: neutral.black,
									...getResponsiveTextSize("text-lg", textScale),
								}}
							>
								<div className="flex flex-wrap gap-x-4 gap-y-2">
									<span>{t("pages.timeline.subtitle")}</span>
								</div>
							</div>

							{/* Nội dung chính */}
							<div className="mt-8 grid grid-cols-12 gap-10 items-start">
								{/* Trái: text */}
								<div className="col-span-12 lg:col-span-6">
									<p
										className="font-extrabold"
										style={{
											color: boNoiVu.light,
											...getResponsiveTextSize("text-5xl", textScale),
										}}
									>
										{active.year}
									</p>
									<h2
										className="mt-6 font-extrabold leading-tight"
										style={{
											color: boNoiVu.light,
											...getResponsiveTextSize("text-4xl", textScale),
										}}
									>
										{active.title}
									</h2>
									<p
										className="mt-2 font-bold"
										style={{
											color: neutral.black,
											...getResponsiveTextSize("text-xl", textScale),
										}}
									>
										{active.description}
									</p>
									{/* Text dài với tính năng xem thêm */}
									<div className="mt-6 max-w-[560px]">
										<div
											className={`leading-6 transition-all duration-300 ${expandedContent ? "max-h-none" : "max-h-[120px] overflow-hidden"}`}
											style={{
												color: overlay.black[90],
												...getResponsiveTextSize("text-sm", textScale),
											}}
										>
											{active.content}
										</div>

										{/* Nút xem thêm/thu gọn */}
										<button
											onClick={() => setExpandedContent(!expandedContent)}
											className="mt-3 font-medium text-[#9b0000] hover:text-[#7a0910] transition-colors duration-200 flex items-center gap-2"
											style={getResponsiveTextSize("text-sm", textScale)}
										>
											{expandedContent ? (
												<>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
													</svg>
													{t("pages.timeline.content.collapse")}
												</>
											) : (
												<>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
													</svg>
													{t("pages.timeline.content.expand")}
												</>
											)}
										</button>
									</div>
								</div>

								{/* Phải: khung video timeline */}
								<div className="col-span-12 lg:col-span-6">
									<div className="relative rounded-xl overflow-hidden h-[340px] md:h-[420px]" style={{ backgroundColor: boNoiVu.main }}>
										{/* Video timeline chính */}
										<video
											ref={videoRef}
											src={getAssetPath(mainVideoTimeline.videoUrl)}
											poster={mainVideoTimeline.posterImage ? getAssetPath(mainVideoTimeline.posterImage) : undefined}
											className="w-full h-full object-cover"
											controls={!showPlayOverlay}
											autoPlay
											muted={!audioOn}
											// @ts-ignore
											playsInline // <-- quan trọng với iOS
											preload="auto" // nạp sớm giúp play mượt hơn
											onTimeUpdate={handleVideoTimeUpdate}
											onPlay={handleVideoPlay}
											onPause={handleVideoPause}
											onEnded={handleVideoEnded}
										>
											{t("pages.timeline.video.notSupported")}
										</video>

										{/* Play Overlay khi autoplay bị chặn */}
										{showPlayOverlay && (
											<div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
												<button onClick={handlePlayOverlayClick} className="bg-white/90 hover:bg-white text-black rounded-full p-4 transition-all duration-200 hover:scale-110" aria-label="Play video">
													<svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
														<path d="M8 5v14l11-7z" />
													</svg>
												</button>
											</div>
										)}

										{/* Hidden debug overlay removed per request */}

										{/* Text mô tả video */}
										<div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-center">
											<p className="font-medium" style={getResponsiveTextSize("text-sm", textScale)}>
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
												<div
													className={`font-semibold transition-all duration-300`}
													style={{
														color: i === activeIdx ? boNoiVu.light : neutral.black,
														...getResponsiveTextSize(i === activeIdx ? "text-2xl" : "text-base", textScale),
													}}
												>
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
														onClick={() => jumpToVideoTime(i)}
														className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 ${i === activeIdx ? "h-4 w-4" : "h-3 w-3"}`}
														style={{
															backgroundColor: i === activeIdx ? boNoiVu.light : neutral.black,
															borderColor: i === activeIdx ? boNoiVu.light : boNoiVu.light,
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
