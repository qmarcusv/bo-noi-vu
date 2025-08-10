import { useState } from "react";
import { useTranslation } from "react-i18next";
import MainNavbar from "../components/MainNavbar"; // dùng NavBar có sẵn
import { boNoiVu, neutral, overlay } from "../constants/colors";
import { getAssetPath } from "../utils/assets";

type TabKey = "timeline" | "map" | "media" | "zone";
type Unit = { id: string; name: string; short?: string; link?: string; logo?: string };

const ADMIN_UNITS: Unit[] = [
	{ id: "vutccb", name: "Vụ Tổ chức – Biên chế" },
	{ id: "vuchinhquyen", name: "Vụ Chính quyền địa phương" },
	{ id: "vuccvc", name: "Vụ Công chức – Viên chức" },
	{ id: "vutcpng", name: "Vụ Tổ chức phi chính phủ" },
	{ id: "vucchc", name: "Vụ Cải cách hành chính" },
	{ id: "vucttn_bd", name: "Vụ Công tác thanh niên & Bình đẳng giới" },
	{ id: "vuhoptacqt", name: "Vụ Hợp tác quốc tế" },
	{ id: "vutccb2", name: "Vụ Tổ chức cán bộ" },
	{ id: "vuphapche", name: "Vụ Pháp chế" },
	{ id: "vukh_tc", name: "Vụ Kế hoạch – Tài chính" },
	{ id: "thanhtra", name: "Thanh tra Bộ" },
	{ id: "vanphong", name: "Văn phòng Bộ" },
	{ id: "cucvanthu", name: "Cục Văn thư & Lưu trữ nhà nước", link: "https://luutru.gov.vn" },
	{ id: "cuctienluong", name: "Cục Tiền lương & Bảo hiểm xã hội" },
	{ id: "cucvieclam", name: "Cục Việc làm" },
	{ id: "cucldnn", name: "Cục Quản lý lao động ngoài nước" },
	{ id: "cucnguoicong", name: "Cục Người có công" },
	{ id: "banthidua", name: "Ban Thi đua – Khen thưởng Trung ương", link: "http://thiduakhenthuongvn.org.vn" },
];

const PUB_UNITS: Unit[] = [
	{ id: "ttcntt", name: "Trung tâm Công nghệ thông tin" },
	{ id: "vienkh", name: "Viện Khoa học Tổ chức Nhà nước & Lao động" },
	{ id: "tapchi", name: "Tạp chí Tổ chức Nhà nước & Lao động" },
	{ id: "baodantri", name: "Báo Dân trí", link: "https://dantri.com.vn" },
];

export default function Map() {
	const { t } = useTranslation();
	const [, setActiveTab] = useState<TabKey>("map");

	return (
		<div className="h-screen w-full relative overflow-hidden">
			{/* BG layout: LEFT red strip, RIGHT white area */}
			<div className="absolute inset-0 flex">
				{/* LEFT: rear-rectangle (giữ tỉ lệ, cao 100%) */}
				<div className="relative h-full flex-none overflow-hidden">
					<img src={getAssetPath("/assets/rear-rectangle.png")} alt="" className="h-full w-auto object-contain" />
				</div>

				{/* RIGHT: white area */}
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

					{/* Content: 80% width, chừa 10% đáy cho NavBar có sẵn */}
					<div className="relative z-10 h-full w-full flex">
						<div className="mx-auto w-[80%] h-full flex flex-col pt-16 pb-[10%]">
							{/* Title */}
							<h1 className="text-5xl md:text-6xl font-extrabold" style={{ color: boNoiVu.light }}>
								{t("pages.map.title").toUpperCase()}
							</h1>

							{/* Filter box */}
							<div
								className="mt-6 w-[100%] max-w-[100%] rounded-xl border shadow px-6 py-3 text-lg font-semibold"
								style={{
									backgroundColor: neutral.white,
									borderColor: overlay.black[20],
									color: neutral.black,
								}}
							>
								{t("pages.map.subtitle")}
							</div>

							{/* MAIN TWO-COLUMN SECTION (fix lệch):
                  Left = Nhóm tổ chức hành chính, Right = Nhóm đơn vị sự nghiệp công lập */}
							<div className="mt-8 grid grid-cols-12 gap-8 items-start">
								{/* LEFT: ADMIN GROUP */}
								<div className="col-span-12 lg:col-span-7">
									<h4 className="text-2xl font-extrabold text-center mb-3" style={{ color: boNoiVu.light }}>
										{t("pages.map.adminGroup")}
									</h4>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{ADMIN_UNITS.map((u, idx) => (
											<button
												key={u.id}
												className="flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition"
												style={{
													backgroundColor: idx === 0 ? boNoiVu.dark : overlay.white[80],
													borderColor: idx === 0 ? boNoiVu.dark : overlay.black[10],
													color: neutral.black,
												}}
												title={u.name}
											>
												<span className="inline-block h-5 w-5 rounded-full bg-yellow-400 shadow-[0_0_0_3px_rgba(255,255,255,0.85)]" />
												<div className="font-medium">{u.name}</div>
											</button>
										))}
									</div>
								</div>

								{/* RIGHT: PUBLIC GROUP PANEL */}
								<div className="col-span-12 lg:col-span-5">
									<div
										className="rounded-xl border p-5"
										style={{
											borderColor: overlay.black[10],
											backgroundColor: overlay.white[80],
										}}
									>
										<h3 className="text-2xl font-extrabold text-center leading-tight" style={{ color: boNoiVu.light }}>
											{t("pages.map.publicGroup").split(" ").slice(0, 2).join(" ")}
											<br />
											{t("pages.map.publicGroup").split(" ").slice(2).join(" ")}
										</h3>
										<div className="mt-4 flex flex-col gap-4">
											{PUB_UNITS.map((u) => (
												<a
													key={u.id}
													href={u.link || "#"}
													target={u.link ? "_blank" : undefined}
													className="flex items-center gap-4 rounded-xl border px-4 py-4 text-left hover:ring-2 transition"
													style={
														{
															backgroundColor: overlay.white[90],
															borderColor: overlay.black[10],
															"--tw-ring-color": `${boNoiVu.light}40`,
														} as any
													}
												>
													<div
														className="h-14 w-14 rounded-full border-2 grid place-items-center text-xs font-bold"
														style={{
															borderColor: overlay.black[20],
															color: neutral.black,
														}}
													>
														{u.logo ? <img src={u.logo} className="h-full w-full rounded-full object-cover" /> : "LOGO"}
													</div>
													<div className="flex-1">
														<div className="font-semibold" style={{ color: neutral.black }}>
															{u.name}
														</div>
														{u.link && (
															<div className="text-sm truncate" style={{ color: overlay.black[60] }}>
																{u.link}
															</div>
														)}
													</div>
												</a>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* MainNavbar ở cuối trang */}
					<div className="absolute bottom-0 left-0 right-0 h-[10%] z-20">
						<MainNavbar active="map" onChange={setActiveTab} />
					</div>
				</div>
			</div>
		</div>
	);
}
