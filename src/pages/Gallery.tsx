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
			<div className="relative rounded-xl overflow-hidden bg-[#8b0000] h-[340px] md:h-[420px] grid place-items-center">
				{/* Nếu đã có src thật: thay div bên dưới bằng <video ... controls/> */}
				{current.src ? (
					<video controls className="h-full w-full object-cover" src={current.src} />
				) : (
					<>
						<div className="h-[72px] w-[72px] rounded-2xl border-2 border-white/70 grid place-items-center">
							{/* play icon */}
							<svg viewBox="0 0 24 24" className="h-10 w-10 fill-white/95">
								<path d="M8 5v14l11-7z" />
							</svg>
						</div>
					</>
				)}
			</div>
		),
		[current]
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
						className="absolute right-6 top-6 z-20 h-12 w-12 grid place-items-center cursor-pointer hover:opacity-90"
					>
						<img src={getAssetPath("/assets/home-icon.png")} alt="Home" className="h-12 w-12 object-contain" />
					</button>

					{/* Content */}
					<div className="relative z-10 h-full w-full flex">
						<div className="mx-auto w-[80%] h-full flex flex-col pt-16 pb-[10%]">
							{/* Title */}
							<h1 className="text-5xl md:text-6xl font-extrabold text-[#9b0000]">{t("pages.gallery.mainTitle")}</h1>

							{/* Filter/description line */}
							<div className="mt-6 w-[100%] max-w-[100%] bg-white rounded-xl border border-black/15 shadow px-6 py-3 text-lg font-semibold text-black">{t("pages.gallery.subtitle")}</div>

							{/* Main content grid */}
							<div className="mt-8 grid grid-cols-12 gap-8 items-start text-black">
								{/* Left: Video Library */}
								<div className="col-span-12 lg:col-span-7">
									<h3 className="text-center text-xl font-extrabold mb-3">{t("pages.gallery.videoLibrary")}</h3>

									{VideoPlayer}

									{/* Carousel */}
									<div className="mt-6 flex items-center gap-3">
										<button onClick={() => scrollByCard(-1)} className="h-10 w-10 rounded-lg border border-black/20 grid place-items-center hover:bg-black/5" aria-label="Prev">
											<svg viewBox="0 0 24 24" className="h-5 w-5 stroke-black" fill="none" strokeWidth={2}>
												<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
											</svg>
										</button>

										<div ref={carouselRef} className="flex-1 overflow-x-auto no-scrollbar scroll-smooth" style={{ scrollbarWidth: "none" }}>
											<div className="flex gap-4">
												{VIDEOS.map((v) => (
													<div
														key={v.id}
														data-card
														className={`min-w-[220px] max-w-[240px] rounded-xl overflow-hidden border ${current.id === v.id ? "border-[#9b0000]" : "border-black/15"} bg-white/90 shadow`}
													>
														<button onClick={() => setCurrent(v)} className="w-full" title={v.title}>
															<div className="relative h-[120px] bg-black/5">
																<img src={v.thumb} onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} className="h-full w-full object-cover" alt={v.title} />
																<div className="absolute inset-0 grid place-items-center">
																	<div className="h-9 w-9 rounded-xl border border-black/20 bg-white/80 grid place-items-center">
																		<svg viewBox="0 0 24 24" className="h-5 w-5 fill-black">
																			<path d="M8 5v14l11-7z" />
																		</svg>
																	</div>
																</div>
															</div>
															<div className="px-3 py-2 text-sm font-semibold truncate">{v.title}</div>
														</button>
													</div>
												))}
											</div>
										</div>

										<button onClick={() => scrollByCard(1)} className="h-10 w-10 rounded-lg border border-black/20 grid place-items-center hover:bg-black/5" aria-label="Next">
											<svg viewBox="0 0 24 24" className="h-5 w-5 stroke-black" fill="none" strokeWidth={2}>
												<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
											</svg>
										</button>
									</div>
								</div>

								{/* Right: Photo Library */}
								<div className="col-span-12 lg:col-span-5">
									<h3 className="text-center text-xl font-extrabold mb-3">{t("pages.gallery.photoLibrary")}</h3>

									<div className="rounded-xl border border-black/15 bg-white/85 p-4">
										{/* Album grid (horizontal, 4 hàng) */}
										<div ref={photosRef} className="relative overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: "none" }}>
											<div
												className="min-h-[420px]"
												style={{
													display: "grid",
													gridAutoFlow: "column",
													gridTemplateRows: "repeat(4, 1fr)",
													gridAutoColumns: "minmax(140px, 1fr)",
													gap: "12px",
													alignItems: "stretch",
												}}
											>
												{PHOTOS.map((p) => (
													<div key={p.id} style={{ gridColumn: `span ${p.span ?? 1} / span ${p.span ?? 1}` }} className="relative rounded-lg overflow-hidden bg-gray-500">
														<img src={p.src} onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} className="absolute inset-0 h-full w-full object-cover" alt="" />
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
							<div className="mt-4 text-sm">
								<span className="inline-flex items-center gap-1">{t("pages.gallery.iconHint")}</span>
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
