import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import MainNavbar from "../components/MainNavbar";
import { getAssetPath } from "../utils/assets";

type VideoItem = {
	id: string;
	title: string;
	src: string; // link video (mp4 / youtube embed nếu bạn muốn)
	thumb: string; // ảnh thumbnail
	subtitle?: string;
};

type PhotoItem = {
	id: string;
	src: string;
	span?: 1 | 2 | 3; // độ rộng tương đối trong lưới ngang
};

const VIDEOS: VideoItem[] = [
	{ id: "v1", title: "VIDEO SAMPLE 1", src: "", thumb: "/assets/video-thumb-1.jpg" },
	{ id: "v2", title: "VIDEO SAMPLE 2", src: "", thumb: "/assets/video-thumb-2.jpg" },
	{ id: "v3", title: "VIDEO SAMPLE 3", src: "", thumb: "/assets/video-thumb-3.jpg" },
	{ id: "v4", title: "VIDEO SAMPLE 4", src: "", thumb: "/assets/video-thumb-4.jpg" },
	{ id: "v5", title: "VIDEO SAMPLE 5", src: "", thumb: "/assets/video-thumb-5.jpg" },
	{ id: "v6", title: "VIDEO SAMPLE 6", src: "", thumb: "/assets/video-thumb-6.jpg" },
];

const PHOTOS: PhotoItem[] = [
	{ id: "p1", src: "/assets/photo-1.jpg", span: 2 },
	{ id: "p2", src: "/assets/photo-2.jpg", span: 1 },
	{ id: "p3", src: "/assets/photo-3.jpg", span: 3 },
	{ id: "p4", src: "/assets/photo-4.jpg", span: 2 },
	{ id: "p5", src: "/assets/photo-5.jpg", span: 1 },
	{ id: "p6", src: "/assets/photo-6.jpg", span: 2 },
	{ id: "p7", src: "/assets/photo-7.jpg", span: 1 },
	{ id: "p8", src: "/assets/photo-8.jpg", span: 2 },
	{ id: "p9", src: "/assets/photo-9.jpg", span: 1 },
	{ id: "p10", src: "/assets/photo-10.jpg", span: 3 },
	{ id: "p11", src: "/assets/photo-11.jpg", span: 2 },
	{ id: "p12", src: "/assets/photo-12.jpg", span: 1 },
];

export default function Gallery() {
	const { t } = useTranslation();
	const [, setActiveTab] = useState<"timeline" | "map" | "media" | "zone">("media");
	const [current, setCurrent] = useState<VideoItem>(VIDEOS[0]);

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
				{/* Nếu đã có src thật: thay div bên dưới bằng <video ... controls/> */}
				{current.src ? (
					<video controls className="h-full w-full object-cover" src={current.src} />
				) : (
					<>
						<div
							className="rounded-2xl border-2 border-white/70 grid place-items-center"
							style={{
								height: `clamp(48px, 6vw, 96px)`,
								width: `clamp(48px, 6vw, 96px)`,
							}}
						>
							{/* play icon */}
							<svg
								viewBox="0 0 24 24"
								className="fill-white/95"
								style={{
									height: `clamp(24px, 3vw, 48px)`,
									width: `clamp(24px, 3vw, 48px)`,
								}}
							>
								<path d="M8 5v14l11-7z" />
							</svg>
						</div>
					</>
				)}

				{/* Text mô tả video - chỉ hiển thị cho video chính */}
				<div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-center">
					<p className="text-sm font-medium">
						{current.title}
						{current.subtitle && ` - ${current.subtitle}`}
					</p>
				</div>
			</div>
		),
		[current, SZ.videoHeight]
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
					>
						<img
							src={getAssetPath("/assets/home-icon.png")}
							alt="Home"
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
										{t("pages.gallery.videoLibrary")}
									</h3>

									{VideoPlayer}

									{/* Carousel */}
									<div className="mt-6 flex items-center gap-3" style={{ gap: SZ.gap }}>
										<button
											onClick={() => scrollByCard(-1)}
											className="rounded-lg border border-black/20 grid place-items-center hover:bg-black/5"
											aria-label="Prev"
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

										<div ref={carouselRef} className="flex-1 overflow-x-auto no-scrollbar scroll-smooth" style={{ scrollbarWidth: "none" }}>
											<div className="flex" style={{ gap: SZ.gap }}>
												{VIDEOS.map((v) => (
													<div
														key={v.id}
														data-card
														className={`rounded-xl overflow-hidden border ${current.id === v.id ? "border-[#9b0000]" : "border-black/15"} bg-white/90 shadow`}
														style={{
															minWidth: SZ.cardMinWidth,
															maxWidth: SZ.cardMaxWidth,
														}}
													>
														<button onClick={() => setCurrent(v)} className="w-full" title={v.title}>
															<div className="relative bg-black/5" style={{ height: SZ.thumbHeight }}>
																{/* Background image cho video thumbnail */}
																<img src={getAssetPath("/assets/gray-component-background.png")} alt="" className="absolute inset-0 h-full w-full object-cover" />
																<img src={v.thumb} onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} className="relative z-10 h-full w-full object-cover" alt={v.title} />
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
											aria-label="Next"
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
										{t("pages.gallery.photoLibrary")}
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
												{PHOTOS.map((p) => (
													<div key={p.id} style={{ gridColumn: `span ${p.span ?? 1} / span ${p.span ?? 1}` }} className="relative rounded-lg overflow-hidden bg-gray-500">
														<img src={p.src} onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} className="absolute inset-0 h-full w-full object-cover" alt="" />

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

							{/* Gợi ý icon liên kết tới CSDL/website đơn vị (tuỳ nơi bạn muốn chèn) */}
							<div className="mt-4" style={{ marginTop: SZ.gap }}>
								<span className="inline-flex items-center gap-1" style={{ fontSize: `clamp(12px, 1vw, 16px)` }}>
									{t("pages.gallery.iconHint")}
								</span>
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
