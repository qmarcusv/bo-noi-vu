// Utility function để xử lý đường dẫn assets
export function getAssetPath(path: string): string {
	// Nếu đang ở production và có base URL
	if (import.meta.env.PROD && import.meta.env.BASE_URL) {
		// Loại bỏ dấu / ở đầu nếu có
		const cleanPath = path.startsWith("/") ? path.slice(1) : path;
		const fullPath = `${import.meta.env.BASE_URL}${cleanPath}`;
		console.log(`[Assets] Production path: ${path} -> ${fullPath}`);
		return fullPath;
	}

	// Development hoặc không có base URL
	console.log(`[Assets] Development path: ${path}`);
	return path;
}
