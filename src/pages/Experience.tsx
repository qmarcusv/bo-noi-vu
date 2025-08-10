import { useState } from "react";
import MainNavbar from "../components/MainNavbar";
import { getAssetPath } from "../utils/assets";

type TabKey = "timeline" | "map" | "media" | "zone";

export default function Experience() {
	const [, setActiveTab] = useState<TabKey>("media");

	// Kích thước co giãn theo viewport (tối ưu cho cả 70 inch và 17 inch)
	const SZ = {
		containerMaxW: "min(88vw, 1800px)",
		contentWidth: "clamp(75%, 80%, 85%)",
		titleSize: "clamp(2.5rem, 4vw, 4.5rem)",
		subtitleSize: "clamp(1rem, 1.2vw, 1.5rem)",
		sectionTitleSize: "clamp(1.5rem, 2vw, 2.5rem)",
		bodyTextSize: "clamp(0.875rem, 1.1vw, 1.125rem)",
		buttonTextSize: "clamp(0.875rem, 1.1vw, 1.125rem)",
		photoboothTitleSize: "clamp(1.25rem, 1.8vw, 2rem)",
		photoboothNoteSize: "clamp(0.75rem, 1vw, 1rem)",
		buttonSize: "clamp(36px, 4vw, 48px)",
		iconSize: "clamp(16px, 1.8vw, 24px)",
		gap: "clamp(1rem, 2vw, 2rem)",
		sectionGap: "clamp(1.5rem, 2.5vw, 3rem)",
		blockGap: "clamp(1.5rem, 2.5vw, 3rem)",
		padding: "clamp(1rem, 2vw, 2rem)",
		topPadding: "clamp(12px, 3vh, 48px)",
		bottomPadding: "clamp(8%, 10%, 12%)",
		photoboothPadding: "clamp(1.5rem, 3vw, 3rem)",
		photoboothMaxWidth: "clamp(300px, 25vw, 460px)",
	};

	return (
		<div className="h-screen w-full relative overflow-hidden">
			{/* BG layout */}
			<div className="absolute inset-0 flex">
				{/* LEFT: rear-rectangle giữ tỉ lệ, luôn cao 100% */}
				<div className="relative h-full flex-none overflow-hidden">
					<img src={getAssetPath("/assets/rear-rectangle.png")} alt="" className="h-full w-auto object-contain select-none" draggable={false} />
				</div>

				{/* RIGHT: white background area */}
				<div className="relative h-full flex-1">
					<img src={getAssetPath("/assets/white-background.png")} alt="" className="absolute inset-0 h-full w-full object-cover" />

					{/* Home icon */}
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

					{/* Content: responsive width, chừa 10% đáy cho NavBar */}
					<div className="relative z-10 h-full w-full flex">
						<div
							className="mx-auto h-full flex flex-col text-black"
							style={{
								width: SZ.contentWidth,
								paddingTop: SZ.topPadding,
								paddingBottom: SZ.bottomPadding,
							}}
						>
							{/* Title */}
							<h1 className="font-extrabold text-[#9b0000]" style={{ fontSize: SZ.titleSize }}>
								KHU VỰC "TRẢI NGHIỆM"
							</h1>

							{/* Filter / tagline line */}
							<div
								className="mt-6 w-[100%] max-w-[100%] rounded-xl border shadow px-6 py-3 text-lg font-semibold"
								style={{
									backgroundColor: "rgba(255,255,255,0.9)",
									borderColor: "rgba(0,0,0,0.1)",
									color: "#000000",
								}}
							>
								Các video giới thiệu bộ và các đơn vị thuộc bộ
							</div>

							{/* Main grid */}
							<div
								className="mt-8 grid grid-cols-12 items-start"
								style={{
									marginTop: SZ.sectionGap,
									gap: SZ.sectionGap,
								}}
							>
								{/* LEFT column: two feature blocks */}
								<div className="col-span-12 lg:col-span-8 flex flex-col" style={{ gap: SZ.blockGap }}>
									{/* Block 1 */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ gap: SZ.gap }}>
										<div>
											<h3 className="font-extrabold text-[#9b0000] mb-3" style={{ fontSize: SZ.sectionTitleSize }}>
												Cơ sở dữ liệu quốc gia về cán bộ, công chức, viên chức
											</h3>
											<p className="leading-6" style={{ fontSize: SZ.bodyTextSize }}>
												Mô tả ngắn gọn về CSDL Quốc gia về CBCCVC: mục tiêu, phạm vi dữ liệu và lợi ích khi sử dụng cho người dân và cơ quan quản lý.
											</p>
											<button
												className="mt-4 bg-[#9b0000] text-white px-safe py-safe rounded font-semibold hover:opacity-90"
												style={{
													fontSize: SZ.buttonTextSize,
													marginTop: SZ.gap,
													padding: SZ.padding,
												}}
											>
												KHÁM PHÁ NGAY
											</button>
										</div>
										<div className="bg-gray-500/80 rounded-lg aspect-video" />
									</div>

									{/* Block 2 */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ gap: SZ.gap }}>
										<div className="bg-gray-500/80 rounded-lg aspect-video" />
										<div>
											<h3 className="font-extrabold text-[#9b0000] mb-3" style={{ fontSize: SZ.sectionTitleSize }}>
												CSDL tài liệu lưu trữ Phông Lưu trữ NN Việt Nam – Nền tảng Lưu trữ số quốc gia
											</h3>
											<p className="leading-6" style={{ fontSize: SZ.bodyTextSize }}>
												Giới thiệu ngắn về hệ thống, khả năng tra cứu và tiếp cận tài liệu lưu trữ số của quốc gia phục vụ học thuật, dịch vụ công và nghiên cứu.
											</p>
											<button
												className="mt-4 bg-[#9b0000] text-white px-safe py-safe rounded font-semibold hover:opacity-90"
												style={{
													fontSize: SZ.buttonTextSize,
													marginTop: SZ.gap,
													padding: SZ.padding,
												}}
											>
												KHÁM PHÁ NGAY
											</button>
										</div>
									</div>
								</div>

								{/* RIGHT column: Photobooth */}
								<div className="col-span-12 lg:col-span-4">
									<div className="rounded-2xl overflow-hidden bg-[#8b0000] p-6 h-full flex flex-col" style={{ padding: SZ.photoboothPadding }}>
										{/* Frame area */}
										<div className="relative bg-white/95 rounded-xl mx-auto w-full aspect-[4/5]" style={{ maxWidth: SZ.photoboothMaxWidth }} />
										{/* Title */}
										<h2
											className="mt-6 text-center text-white font-extrabold tracking-wide"
											style={{
												fontSize: SZ.photoboothTitleSize,
												marginTop: SZ.gap,
											}}
										>
											PHOTOBOOTH
										</h2>
										{/* Action */}
										<button
											className="mt-3 mx-auto bg-transparent border-2 border-white text-white px-safe py-safe rounded font-semibold hover:bg-white hover:text-[#8b0000]"
											style={{
												fontSize: SZ.buttonTextSize,
												marginTop: SZ.gap,
												padding: SZ.padding,
											}}
										>
											CHỤP ẢNH
										</button>
										{/* Arrow + QR note */}
										<div className="mt-2 text-center text-white" style={{ marginTop: SZ.gap }}>
											<div className="leading-none" style={{ fontSize: `clamp(1.5rem, 2.5vw, 2.5rem)` }}>
												⌄
											</div>
											<p
												className="mt-1"
												style={{
													fontSize: SZ.photoboothNoteSize,
													marginTop: SZ.gap,
												}}
											>
												Quét QR để tải ảnh.
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* (Tuỳ chọn) Mini quiz khu vực nhỏ – sẽ gắn sau nếu bạn muốn */}
							{/* <div className="mt-6">...</div> */}
						</div>
					</div>

					{/* MainNavbar ở cuối trang */}
					<div className="absolute bottom-0 left-0 right-0 h-[10%] z-20">
						<MainNavbar active="zone" onChange={setActiveTab} />
					</div>
				</div>
			</div>
		</div>
	);
}
