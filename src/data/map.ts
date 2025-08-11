// src/data/map.ts
export interface MapUnit {
	id: string;
	name: string;
	short?: string;
	website?: string;
	logo?: string;
	description?: string;
	address?: string;
	phone?: string;
	email?: string;
}

export const ADMIN_UNITS: MapUnit[] = [
	{
		id: "vutccb",
		name: "Vụ Tổ chức – Biên chế",
		description: "Vụ Tổ chức – Biên chế thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "vutccb@moha.gov.vn",
	},
	{
		id: "vukh_tc",
		name: "Vụ Kế hoạch – Tài chính",
		description: "Vụ Kế hoạch – Tài chính thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "vukhtc@moha.gov.vn",
	},
	{
		id: "vuchinhquyen",
		name: "Vụ Chính quyền địa phương",
		description: "Vụ Chính quyền địa phương thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "vuchinhquyen@moha.gov.vn",
	},
	{
		id: "thanhtra",
		name: "Thanh tra Bộ",
		description: "Thanh tra Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "thanhtra@moha.gov.vn",
	},
	{
		id: "vuccvc",
		name: "Vụ Công chức – Viên chức",
		description: "Vụ Công chức – Viên chức thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "vuccvc@moha.gov.vn",
	},
	{
		id: "vanphong",
		name: "Văn phòng Bộ",
		description: "Văn phòng Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "vanphong@moha.gov.vn",
	},
	{
		id: "vutcpng",
		name: "Vụ Tổ chức phi chính phủ",
		description: "Vụ Tổ chức phi chính phủ thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "vutcpng@moha.gov.vn",
	},
	{
		id: "cucvanthu",
		name: "Cục Văn thư & Lưu trữ nhà nước",
		website: "https://luutru.gov.vn",
		description: "Cục Văn thư & Lưu trữ nhà nước thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "cucvanthu@moha.gov.vn",
	},
	{
		id: "vucchc",
		name: "Vụ Cải cách hành chính",
		description: "Vụ Cải cách hành chính thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "vucchc@moha.gov.vn",
	},
	{
		id: "cuctienluong",
		name: "Cục Tiền lương & Bảo hiểm xã hội",
		description: "Cục Tiền lương & Bảo hiểm xã hội thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "cuctienluong@moha.gov.vn",
	},
	{
		id: "vucttn_bd",
		name: "Vụ Công tác thanh niên & Bình đẳng giới",
		description: "Vụ Công tác thanh niên & Bình đẳng giới thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "vucttnbd@moha.gov.vn",
	},
	{
		id: "cucvieclam",
		name: "Cục Việc làm",
		description: "Cục Việc làm thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "cucvieclam@moha.gov.vn",
	},
	{
		id: "vuhoptacqt",
		name: "Vụ Hợp tác quốc tế",
		description: "Vụ Hợp tác quốc tế thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "vuhoptacqt@moha.gov.vn",
	},
	{
		id: "cucldnn",
		name: "Cục Quản lý lao động ngoài nước",
		description: "Cục Quản lý lao động ngoài nước thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "cucldnn@moha.gov.vn",
	},
	{
		id: "vutccb2",
		name: "Vụ Tổ chức cán bộ",
		description: "Vụ Tổ chức cán bộ thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "vutccb2@moha.gov.vn",
	},
	{
		id: "cucnguoicong",
		name: "Cục Người có công",
		description: "Cục Người có công thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "cucnguoicong@moha.gov.vn",
	},
	{
		id: "vuphapche",
		name: "Vụ Pháp chế",
		description: "Vụ Pháp chế thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "vuphapche@moha.gov.vn",
	},
	{
		id: "banthidua",
		name: "Ban Thi đua – Khen thưởng Trung ương",
		website: "http://thiduakhenthuongvn.org.vn",
		description: "Ban Thi đua – Khen thưởng Trung ương thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "banthidua@moha.gov.vn",
	},
];

export const PUB_UNITS: MapUnit[] = [
	{
		id: "ttcntt",
		name: "Trung tâm Công nghệ thông tin",
		description: "Trung tâm Công nghệ thông tin thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "ttcntt@moha.gov.vn",
	},
	{
		id: "vienkh",
		name: "Viện Khoa học Tổ chức Nhà nước và Lao động",
		description: "Viện Khoa học Tổ chức Nhà nước và Lao động thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "vienkh@moha.gov.vn",
	},
	{
		id: "tapchi",
		name: "Tạp chí Tổ chức Nhà nước và Lao động",
		description: "Tạp chí Tổ chức Nhà nước và Lao động thuộc Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "tapchi@moha.gov.vn",
	},
	{
		id: "baodantri",
		name: "Báo Dân trí",
		website: "https://dantri.com.vn",
		description: "Báo Dân trí - Cơ quan ngôn luận của Bộ Nội vụ",
		address: "Số 35 Trần Phú, Ba Đình, Hà Nội",
		phone: "024.3843.xxxx",
		email: "baodantri@moha.gov.vn",
	},
];

// Text constants for Map component
export const MAP_TEXTS = {
	vi: {
		adminGroup: "NHÓM TỔ CHỨC HÀNH CHÍNH",
		publicGroup: {
			line1: "NHÓM ĐƠN VỊ",
			line2: "SỰ NGHIỆP CÔNG LẬP",
		},
		modal: {
			description: "Mô tả",
			address: "Địa chỉ",
			phone: "Điện thoại",
			email: "Email",
			website: "Website",
			logo: "Logo",
			openWebsite: "Mở website",
			close: "Đóng",
		},
		ariaLabels: {
			home: "Trang chủ",
			close: "Đóng",
		},
	},
	en: {
		adminGroup: "ADMINISTRATIVE ORGANIZATION GROUP",
		publicGroup: {
			line1: "PUBLIC SERVICE",
			line2: "UNITS GROUP",
		},
		modal: {
			description: "Description",
			address: "Address",
			phone: "Phone",
			email: "Email",
			website: "Website",
			logo: "Logo",
			openWebsite: "Open Website",
			close: "Close",
		},
		ariaLabels: {
			home: "Home",
			close: "Close",
		},
	},
};
