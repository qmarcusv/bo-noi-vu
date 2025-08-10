import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MainNavbar from "../components/MainNavbar";

type TabKey = "timeline" | "map" | "media" | "zone";

export default function Experience() {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState<TabKey>("zone");

	return (
		<div className="h-screen w-full relative overflow-hidden">
			{/* BG layout */}
			<div className="absolute inset-0 flex">
				{/* LEFT: rear-rectangle giữ tỉ lệ, luôn cao 100% */}
				<div className="relative h-full flex-none overflow-hidden">
					<img src="/assets/rear-rectangle.png" alt="" className="h-full w-auto object-contain select-none" draggable={false} />
				</div>

				{/* RIGHT: white background area */}
				<div className="relative h-full flex-1">
					<img src="/assets/white-background.png" alt="" className="absolute inset-0 h-full w-full object-cover" />

					{/* Home icon */}
					<button
						onClick={() => {
							const homeSection = document.getElementById("home");
							if (homeSection) {
								homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
							}
						}}
						className="absolute right-6 top-6 z-20 h-12 w-12 grid place-items-center cursor-pointer hover:opacity-90"
					>
						<img src="/assets/home-icon.png" alt="Home" className="h-12 w-12 object-contain" />
					</button>

					{/* Content */}
					<div className="relative z-10 h-full w-full flex">
						<div className="mx-auto w-[80%] h-full flex flex-col pt-16 pb-[10%] text-black">
							{/* Title */}
							<h1 className="text-5xl md:text-6xl font-extrabold text-[#9b0000]">KHU VỰC “TRẢI NGHIỆM”</h1>

							{/* Filter / tagline line */}
							<div className="mt-6 w-[100%] max-w-[100%] bg-white rounded-xl border border-black/15 shadow px-6 py-3 text-lg font-semibold">Các video giới thiệu bộ và các đơn vị thuộc bộ</div>

							{/* Main grid */}
							<div className="mt-8 grid grid-cols-12 gap-8 items-start">
								{/* LEFT column: two feature blocks */}
								<div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
									{/* Block 1 */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<h3 className="text-xl md:text-2xl font-extrabold text-[#9b0000] mb-3">Cơ sở dữ liệu quốc gia về cán bộ, công chức, viên chức</h3>
											<p className="text-sm leading-6">Mô tả ngắn gọn về CSDL Quốc gia về CBCCVC: mục tiêu, phạm vi dữ liệu và lợi ích khi sử dụng cho người dân và cơ quan quản lý.</p>
											<button className="mt-4 bg-[#9b0000] text-white px-6 py-2 rounded font-semibold hover:opacity-90">KHÁM PHÁ NGAY</button>
										</div>
										<div className="bg-gray-500/80 rounded-lg aspect-video" />
									</div>

									{/* Block 2 */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="bg-gray-500/80 rounded-lg aspect-video" />
										<div>
											<h3 className="text-xl md:text-2xl font-extrabold text-[#9b0000] mb-3">CSDL tài liệu lưu trữ Phông Lưu trữ NN Việt Nam – Nền tảng Lưu trữ số quốc gia</h3>
											<p className="text-sm leading-6">Giới thiệu ngắn về hệ thống, khả năng tra cứu và tiếp cận tài liệu lưu trữ số của quốc gia phục vụ học thuật, dịch vụ công và nghiên cứu.</p>
											<button className="mt-4 bg-[#9b0000] text-white px-6 py-2 rounded font-semibold hover:opacity-90">KHÁM PHÁ NGAY</button>
										</div>
									</div>
								</div>

								{/* RIGHT column: Photobooth */}
								<div className="col-span-12 lg:col-span-4">
									<div className="rounded-2xl overflow-hidden bg-[#8b0000] p-6 h-full flex flex-col">
										{/* Frame area */}
										<div className="relative bg-white/95 rounded-xl mx-auto w-full max-w-[460px] aspect-[4/5]" />
										{/* Title */}
										<h2 className="mt-6 text-center text-white text-3xl font-extrabold tracking-wide">PHOTOBOOTH</h2>
										{/* Action */}
										<button className="mt-3 mx-auto bg-transparent border-2 border-white text-white px-8 py-2.5 rounded font-semibold hover:bg-white hover:text-[#8b0000]">CHỤP ẢNH</button>
										{/* Arrow + QR note */}
										<div className="mt-2 text-center text-white">
											<div className="text-2xl leading-none">⌄</div>
											<p className="text-sm mt-1">Quét QR để tải ảnh.</p>
										</div>
									</div>
								</div>
							</div>

							{/* (Tuỳ chọn) Mini quiz khu vực nhỏ – sẽ gắn sau nếu bạn muốn */}
							{/* <div className="mt-6">...</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
