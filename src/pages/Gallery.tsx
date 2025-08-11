import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import MainNavbar from "../components/MainNavbar";
import { getAssetPath } from "../utils/assets";
import { GALLERY_TEXTS, galleryVideos, galleryPhotos } from "../data/gallery";
import { useAudioUnlock, applyAutoplayAttributes } from "../utils/audioUnlock";

type VideoItem = (typeof galleryVideos)[number];

export default function Gallery() {
	const { t } = useTranslation();
	const [, setActiveTab] = useState<"timeline" | "map" | "media" | "zone">("media");
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const current: VideoItem = galleryVideos[currentIndex] ?? galleryVideos[0];
	const videoRef = useRef<HTMLVideoElement>(null);
	const [showPlayOverlay, setShowPlayOverlay] = useState(false);
	const audioOn = useAudioUnlock();

	// Kích thước co giãn theo viewport (tối ưu cho cả 70 inch và 17 inch)
	const SZ = {
		containerMaxW: "min(88vw, 1800px)",
		contentWidth: "clamp(75%, 80%, 85%)",
		titleSize: "clamp(2.5rem, 4vw, 4.5rem)",
		subtitleSize: "clamp(1rem, 1.2vw, 1.5rem)",
		sectionTitleSize: "clamp(1.5rem, 2vw, 2.5rem)",
		videoHeight: "clamp(220px, 28vh, 380px)",
		photoGridHeight: "clamp(320px, 40vh, 520px)",
		cardMinWidth: "clamp(180px, 15vw, 280px)",
		cardMaxWidth: "clamp(200px, 18vw, 320px)",
		thumbHeight: "clamp(80px, 10vh, 120px)",
		buttonSize: "clamp(36px, 4vw, 48px)",
		iconSize: "clamp(16px, 1.8vw, 24px)",
		gap: "clamp(1rem, 2vw, 2rem)",
		sectionGap: "clamp(1.5rem, 2.5vw, 3rem)",
		padding: "clamp(1rem, 2vw, 2rem)",
		topPadding: "clamp(12px, 3vh, 48px)",
		bottomPadding: "clamp(8%, 10%, 12%)",
	};

	// Carousel scroll
	const carouselRef = useRef<HTMLDivElement>(null);
	const scrollByCard = (dir: -1 | 1) => {
		const el = carouselRef.current;
		if (!el) return;
		const card = el.querySelector<HTMLDivElement>("[data-card]");
		const step = card ? card.offsetWidth + 16 : 280;
		el.scrollBy({ left: dir * step, behavior: "smooth" });
	};

	// Custom horizontal scrollbar for photo gallery
	const photosRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const [thumbStyle, setThumbStyle] = useState({ left: "0%", width: "10%" });

	const updateThumb = () => {
		const wrap = photosRef.current;
		const track = trackRef.current;
		if (!wrap || !track) return;
		const { scrollLeft, scrollWidth, clientWidth } = wrap;
		const ratio = clientWidth / scrollWidth;
		const width = Math.max(ratio * 100, 6); // tối thiểu 6% cho dễ kéo
		const left = (scrollLeft / (scrollWidth - clientWidth)) * (100 - width);
		setThumbStyle({ left: `${isFinite(left) ? left : 0}%`, width: `${width}%` });
	};

	useEffect(() => {
		updateThumb();
		const el = photosRef.current;
		if (!el) return;
		const onScroll = () => updateThumb();
		el.addEventListener("scroll", onScroll, { passive: true });
		return () => el.removeEventListener("scroll", onScroll);
	}, []);

	// Tự động play video giống Timeline và đồng bộ audioOn
	useEffect(() => {
		const v = videoRef.current;
		if (!v) return;

		applyAutoplayAttributes(v, audioOn);

		const tryPlay = async () => {
			try {
				await v.play();
				setShowPlayOverlay(false);
			} catch (err) {
				setShowPlayOverlay(true);
			}
		};

		const handleCanPlay = () => {
			if (v.autoplay) tryPlay();
		};
		const handleLoadedData = () => {
			if (v.readyState >= 2 && v.autoplay) tryPlay();
		};

		v.addEventListener("canplay", handleCanPlay, { once: true });
		v.addEventListener("loadeddata", handleLoadedData, { once: true });
		// cleanup
		return () => {
			v.removeEventListener("canplay", handleCanPlay);
			v.removeEventListener("loadeddata", handleLoadedData);
		};
	}, [currentIndex, audioOn]);

	const handlePlayOverlayClick = async () => {
		const v = videoRef.current;
		if (!v) return;
		try {
			v.muted = !audioOn;
			// @ts-ignore
			v.playsInline = true;
			await v.play();
			setShowPlayOverlay(false);
		} catch {}
	};

	const handleVideoEnded = () => {
		const next = (currentIndex + 1) % galleryVideos.length;
		setCurrentIndex(next);
	};

	const onTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const wrap = photosRef.current;
		const track = trackRef.current;
		if (!wrap || !track) return;
		const rect = track.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const pct = x / rect.width;
		wrap.scrollTo({ left: (wrap.scrollWidth - wrap.clientWidth) * pct, behavior: "smooth" });
	};

	const VideoPlayer = useMemo(
		() => (
			<div className="relative rounded-xl overflow-hidden bg-[#8b0000] grid place-items-center" style={{ height: SZ.videoHeight }}>
				<video
					ref={videoRef}
					className="h-full w-full object-cover"
					src={getAssetPath(current.src)}
					// Không hiển thị controls nếu overlay đang hiện do autoplay bị chặn
					controls={!showPlayOverlay}
					autoPlay
					muted={!audioOn}
					// @ts-ignore
					playsInline
					preload="auto"
					onEnded={handleVideoEnded}
				>
					{t("pages.timeline.video.notSupported")}
				</video>

				{showPlayOverlay && (
					<div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
						<button
							onClick={handlePlayOverlayClick}
							className="bg-white/90 hover:bg-white text-black rounded-full p-4 transition-all duration-200 hover:scale-110"
							aria-label={GALLERY_TEXTS[t("common.language") as "vi" | "en"].playButton}
						>
							<svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8 5v14l11-7z" />
							</svg>
						</button>
					</div>
				)}

				{/* Text mô tả video */}
				<div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-center">
					<p className="text-sm font-medium">
						{current.title}
						{current.description ? ` - ${current.description}` : ""}
					</p>
				</div>
			</div>
		),
		[current, SZ.videoHeight, showPlayOverlay, t]
	);

	return (
		<div className="h-screen w-full relative overflow-hidden">
			{/* BG layout */}
			<div className="absolute inset-0 flex">
				{/* LEFT: rear-rectangle giữ tỉ lệ, luôn cao 100% */}
				<div className="relative h-full flex-none overflow-hidden">
					<img src={getAssetPath("/assets/rear-rectangle.png")} alt="" className="h-full w-auto object-contain" />
				</div>

				{/* RIGHT: white background area */}
				<div className="relative h-full flex-1">
					<img src={getAssetPath("/assets/white-background.png")} alt="" className="absolute inset-0 h-full w-full object-cover" />

					{/* Home */}
					<button
						onClick={() => {
							const homeSection = document.getElementById("home");
							if (homeSection) {
								homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
							}
						}}
						className="absolute right-6 top-6 z-20 grid place-items-center cursor-pointer hover:opacity-90"
						style={{
							height: SZ.buttonSize,
							width: SZ.buttonSize,
						}}
						aria-label={GALLERY_TEXTS[t("common.language") as "vi" | "en"].ariaLabels.home}
					>
						<img
							src={getAssetPath("/assets/home-icon.png")}
							alt={GALLERY_TEXTS[t("common.language") as "vi" | "en"].ariaLabels.home}
							className="object-contain"
							style={{
								height: SZ.buttonSize,
								width: SZ.buttonSize,
							}}
						/>
					</button>

					{/* Content */}
					<div className="relative z-10 h-full w-full flex">
						<div
							className="mx-auto h-full flex flex-col"
							style={{
								width: SZ.contentWidth,
								paddingTop: SZ.topPadding,
								paddingBottom: SZ.bottomPadding,
							}}
						>
							{/* Title */}
							<h1 className="font-extrabold text-[#9b0000]" style={{ fontSize: SZ.titleSize }}>
								{t("pages.gallery.mainTitle")}
							</h1>

							{/* Filter/description line */}
							<div
								className="mt-6 w-[100%] max-w-[100%] rounded-xl border shadow px-6 py-3 text-lg font-semibold"
								style={{
									backgroundColor: "rgba(255,255,255,0.9)",
									borderColor: "rgba(0,0,0,0.1)",
									color: "#000000",
								}}
							>
								{t("pages.gallery.subtitle")}
							</div>

							{/* Main content grid */}
							<div className="mt-8 grid grid-cols-12 items-start text-black" style={{ gap: SZ.sectionGap }}>
								{/* Left: Video Library */}
								<div className="col-span-12 lg:col-span-7">
									<h3 className="text-center font-extrabold mb-3" style={{ fontSize: SZ.sectionTitleSize }}>
										{GALLERY_TEXTS[t("common.language") as "vi" | "en"].videoLibrary}
									</h3>

									{VideoPlayer}

									{/* Carousel */}
									<div className="mt-6 flex items-center gap-3" style={{ gap: SZ.gap }}>
										<button
											onClick={() => scrollByCard(-1)}
											className="rounded-lg border border-black/20 grid place-items-center hover:bg-black/5"
											aria-label={GALLERY_TEXTS[t("common.language") as "vi" | "en"].ariaLabels.prev}
											style={{
												height: SZ.buttonSize,
												width: SZ.buttonSize,
											}}
										>
											<svg
												viewBox="0 0 24 24"
												className="stroke-black"
												fill="none"
												strokeWidth={2}
												style={{
													height: SZ.iconSize,
													width: SZ.iconSize,
												}}
											>
												<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
											</svg>
										</button>

										<div
											ref={carouselRef}
											className="flex-1 overflow-x-auto no-scrollbar scroll-smooth"
											style={{ scrollbarWidth: "none" }}
											aria-label={GALLERY_TEXTS[t("common.language") as "vi" | "en"].carousel}
										>
											<div className="flex" style={{ gap: SZ.gap }}>
												{galleryVideos.map((v, i) => (
													<div
														key={v.id}
														data-card
														className={`rounded-xl overflow-hidden border ${current.id === v.id ? "border-[#9b0000]" : "border-black/15"} bg-white/90 shadow`}
														style={{
															minWidth: SZ.cardMinWidth,
															maxWidth: SZ.cardMaxWidth,
														}}
													>
														<button onClick={() => setCurrentIndex(i)} className="w-full" title={v.title}>
															<div className="relative bg-black/5" style={{ height: SZ.thumbHeight }}>
																{/* Background image cho video thumbnail */}
																<img src={getAssetPath("/assets/gray-component-background.png")} alt="" className="absolute inset-0 h-full w-full object-cover" />
																<img
																	src={v.thumb ? getAssetPath(v.thumb) : ""}
																	onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
																	className="relative z-10 h-full w-full object-cover"
																	alt={v.title}
																	title={v.title}
																/>
																<div className="absolute inset-0 grid place-items-center z-20">
																	<div
																		className="rounded-xl border border-black/20 bg-white/80 grid place-items-center"
																		style={{
																			height: `clamp(28px, 3.5vw, 44px)`,
																			width: `clamp(28px, 3.5vw, 44px)`,
																		}}
																	>
																		<svg
																			viewBox="0 0 24 24"
																			className="fill-black"
																			style={{
																				height: `clamp(16px, 2vw, 24px)`,
																				width: `clamp(16px, 2vw, 24px)`,
																			}}
																		>
																			<path d="M8 5v14l11-7z" />
																		</svg>
																	</div>
																</div>
															</div>
															<div className="px-3 py-2 font-semibold truncate" style={{ fontSize: `clamp(12px, 1.2vw, 16px)` }}>
																{v.title}
															</div>
														</button>
													</div>
												))}
											</div>
										</div>

										<button
											onClick={() => scrollByCard(1)}
											className="rounded-lg border border-black/20 grid place-items-center hover:bg-black/5"
											aria-label={GALLERY_TEXTS[t("common.language") as "vi" | "en"].ariaLabels.next}
											style={{
												height: SZ.buttonSize,
												width: SZ.buttonSize,
											}}
										>
											<svg
												viewBox="0 0 24 24"
												className="stroke-black"
												fill="none"
												strokeWidth={2}
												style={{
													height: SZ.iconSize,
													width: SZ.iconSize,
												}}
											>
												<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
											</svg>
										</button>
									</div>
								</div>

								{/* Right: Photo Library */}
								<div className="col-span-12 lg:col-span-5">
									<h3 className="text-center font-extrabold mb-3" style={{ fontSize: SZ.sectionTitleSize }}>
										{GALLERY_TEXTS[t("common.language") as "vi" | "en"].photoLibrary}
									</h3>

									<div className="rounded-xl border border-black/15 bg-transparent p-4" style={{ padding: SZ.padding }}>
										{/* Album grid (horizontal, 4 hàng) */}
										<div ref={photosRef} className="relative overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: "none" }}>
											<div
												style={{
													display: "grid",
													gridAutoFlow: "column",
													gridTemplateRows: "repeat(4, 1fr)",
													gridAutoColumns: `minmax(${SZ.cardMinWidth}, 1fr)`,
													gap: "12px",
													alignItems: "stretch",
													minHeight: SZ.photoGridHeight,
												}}
											>
												{galleryPhotos.map((p) => (
													<div key={p.id} style={{ gridColumn: `span ${p.span ?? 1} / span ${p.span ?? 1}` }} className="relative rounded-lg overflow-hidden bg-gray-500">
														<img src={getAssetPath(p.src)} onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} className="absolute inset-0 h-full w-full object-cover" alt="" />

														{/* Text mô tả ảnh - đã loại bỏ theo yêu cầu */}
													</div>
												))}
											</div>
										</div>

										{/* Custom horizontal scrollbar (transparent track + red thumb) */}
										<div className="mt-3">
											<div ref={trackRef} onClick={onTrackClick} className="relative h-3 rounded-full bg-transparent border border-black/15 cursor-pointer">
												<div className="absolute top-0 h-full rounded-full bg-[#9b0000]" style={thumbStyle as any} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* MainNavbar ở cuối trang */}
					<div className="absolute bottom-0 left-0 right-0 h-[10%] z-20">
						<MainNavbar active="media" onChange={setActiveTab} />
					</div>
				</div>
			</div>
		</div>
	);
}
