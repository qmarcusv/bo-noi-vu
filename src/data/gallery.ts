// Text constants for Gallery component
export const GALLERY_TEXTS = {
	vi: {
		ariaLabels: {
			home: "Trang chủ",
			prev: "Trước",
			next: "Tiếp",
		},
		videoLibrary: "Thư viện Video",
		photoLibrary: "Thư viện Ảnh",
		playIcon: "Phát video",
		videoDescription: "Mô tả video",
		photoDescription: "Mô tả ảnh",
		scrollbar: "Thanh cuộn",
		carousel: "Băng chuyền video",
		album: "Album ảnh",
		videoSample: "VIDEO MẪU",
		photoSample: "ẢNH MẪU",
		playButton: "Nút phát",
		scrollTrack: "Thanh cuộn ngang",
		scrollThumb: "Con trỏ cuộn",
	},
	en: {
		ariaLabels: {
			home: "Home",
			prev: "Previous",
			next: "Next",
		},
		videoLibrary: "Video Library",
		photoLibrary: "Photo Library",
		playIcon: "Play video",
		videoDescription: "Video description",
		photoDescription: "Photo description",
		scrollbar: "Scrollbar",
		carousel: "Video carousel",
		album: "Photo album",
		videoSample: "VIDEO SAMPLE",
		photoSample: "PHOTO SAMPLE",
		playButton: "Play button",
		scrollTrack: "Horizontal scroll track",
		scrollThumb: "Scroll thumb",
	},
};

// ====== Gallery data (videos + photos) ======

export type GalleryVideo = {
	id: string;
	title: string;
	description?: string;
	src: string; // Đường dẫn tới file video trong public/assets/gallery/
	thumb?: string; // Ảnh thumbnail nếu có (trong public/assets/gallery/)
};

export type GalleryPhoto = {
	id: string;
	src: string; // Đường dẫn tới ảnh trong public/assets/gallery/
	span?: 1 | 2 | 3;
};

// Ví dụ dữ liệu: Hãy thay thế đường dẫn theo file thực tế bạn đặt trong public/assets/gallery/
export const galleryVideos: GalleryVideo[] = [
	{
		id: "g1",
		title: "Video 1",
		description: "Mô tả ngắn cho video 1",
		src: "/assets/gallery/gallery_1.mp4",
		thumb: "/assets/gallery/gallery_1.png",
	},
	{
		id: "g2",
		title: "Video 2",
		description: "Mô tả ngắn cho video 2",
		src: "/assets/gallery/gallery_2.mp4",
		thumb: "/assets/gallery/gallery_2.jpg",
	},
	{
		id: "g3",
		title: "Video 3",
		description: "Mô tả ngắn cho video 3",
		src: "/assets/gallery/video-3.mp4",
		thumb: "/assets/gallery/Screenshot_120.png",
	},
];

// ===== ẢNH: Lấy tất cả ảnh từ public/assets/gallery/images =====
// Hỗ trợ các phần mở rộng phổ biến: png, jpg, jpeg (kể cả in hoa)
const imageModules = import.meta.glob("/public/assets/gallery/images/*.{png,jpg,jpeg,PNG,JPG,JPEG}", { as: "url", eager: true }) as Record<string, string>;

function toPublicPath(possiblyPublicUrl: string): string {
	// Một số môi trường có thể trả về url bắt đầu bằng "/public/..."
	// Map sang đường dẫn public thực tế
	return possiblyPublicUrl.startsWith("/public/") ? possiblyPublicUrl.replace("/public", "") : possiblyPublicUrl;
}

export const galleryPhotos: GalleryPhoto[] = Object.entries(imageModules)
	.sort(([a], [b]) => a.localeCompare(b))
	.map(([absPath, url], index) => {
		const filename = absPath.split("/").pop() || `image-${index + 1}`;
		const base = filename.replace(/\.[^.]+$/, "");
		return {
			id: `photo-${index + 1}-${base}`,
			src: toPublicPath(url),
		};
	});
