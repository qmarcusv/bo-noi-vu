// File quản lý màu sắc chuẩn cho toàn bộ dự án
// Sử dụng CSS custom properties để dễ dàng thay đổi và quản lý

export const COLORS = {
	// Màu chính - Đỏ Bộ Nội vụ
	primary: {
		50: "#fef2f2",
		100: "#fee2e2",
		200: "#fecaca",
		300: "#fca5a5",
		400: "#f87171",
		500: "#ef4444",
		600: "#dc2626",
		700: "#b91c1c",
		800: "#991b1b",
		900: "#7f1d1d",
		950: "#450a0a",
	},

	// Màu đỏ chủ đạo của Bộ Nội vụ
	boNoiVu: {
		light: "#9b0000", // Màu đỏ nhạt - text chính
		main: "#8b0000", // Màu đỏ chính - background
		dark: "#6b0000", // Màu đỏ đậm - hover states
		darker: "#4b0000", // Màu đỏ rất đậm - active states
	},

	// Màu trung tính
	neutral: {
		white: "#ffffff",
		black: "#000000",
		gray: {
			50: "#f9fafb",
			100: "#f3f4f6",
			200: "#e5e7eb",
			300: "#d1d5db",
			400: "#9ca3af",
			500: "#6b7280",
			600: "#4b5563",
			700: "#374151",
			800: "#1f2937",
			900: "#111827",
		},
	},

	// Màu trạng thái
	status: {
		success: "#10b981",
		warning: "#f59e0b",
		error: "#ef4444",
		info: "#3b82f6",
	},

	// Màu overlay và shadow
	overlay: {
		white: {
			10: "rgba(255, 255, 255, 0.1)",
			15: "rgba(255, 255, 255, 0.15)",
			20: "rgba(255, 255, 255, 0.2)",
			30: "rgba(255, 255, 255, 0.3)",
			40: "rgba(255, 255, 255, 0.4)",
			50: "rgba(255, 255, 255, 0.5)",
			60: "rgba(255, 255, 255, 0.6)",
			70: "rgba(255, 255, 255, 0.7)",
			80: "rgba(255, 255, 255, 0.8)",
			90: "rgba(255, 255, 255, 0.9)",
		},
		black: {
			5: "rgba(0, 0, 0, 0.05)",
			10: "rgba(0, 0, 0, 0.1)",
			20: "rgba(0, 0, 0, 0.2)",
			30: "rgba(0, 0, 0, 0.3)",
			40: "rgba(0, 0, 0, 0.4)",
			50: "rgba(0, 0, 0, 0.5)",
			60: "rgba(0, 0, 0, 0.6)",
			70: "rgba(0, 0, 0, 0.7)",
			80: "rgba(0, 0, 0, 0.8)",
			90: "rgba(0, 0, 0, 0.9)",
		},
	},
} as const;

// CSS Custom Properties để sử dụng trong CSS
export const CSS_COLOR_VARS = `
  :root {
    /* Màu chính */
    --color-primary-50: ${COLORS.primary[50]};
    --color-primary-100: ${COLORS.primary[100]};
    --color-primary-500: ${COLORS.primary[500]};
    --color-primary-600: ${COLORS.primary[600]};
    --color-primary-700: ${COLORS.primary[700]};
    --color-primary-800: ${COLORS.primary[800]};
    --color-primary-900: ${COLORS.primary[900]};

    /* Màu Bộ Nội vụ */
    --color-bo-noi-vu-light: ${COLORS.boNoiVu.light};
    --color-bo-noi-vu-main: ${COLORS.boNoiVu.main};
    --color-bo-noi-vu-dark: ${COLORS.boNoiVu.dark};
    --color-bo-noi-vu-darker: ${COLORS.boNoiVu.darker};

    /* Màu trung tính */
    --color-white: ${COLORS.neutral.white};
    --color-black: ${COLORS.neutral.black};
    --color-gray-50: ${COLORS.neutral.gray[50]};
    --color-gray-100: ${COLORS.neutral.gray[100]};
    --color-gray-200: ${COLORS.neutral.gray[200]};
    --color-gray-300: ${COLORS.neutral.gray[300]};
    --color-gray-400: ${COLORS.neutral.gray[400]};
    --color-gray-500: ${COLORS.neutral.gray[500]};
    --color-gray-600: ${COLORS.neutral.gray[600]};
    --color-gray-700: ${COLORS.neutral.gray[700]};
    --color-gray-800: ${COLORS.neutral.gray[800]};
    --color-gray-900: ${COLORS.neutral.gray[900]};

    /* Màu trạng thái */
    --color-success: ${COLORS.status.success};
    --color-warning: ${COLORS.status.warning};
    --color-error: ${COLORS.status.error};
    --color-info: ${COLORS.status.info};

    /* Màu overlay */
    --color-overlay-white-10: ${COLORS.overlay.white[10]};
    --color-overlay-white-15: ${COLORS.overlay.white[15]};
    --color-overlay-white-20: ${COLORS.overlay.white[20]};
    --color-overlay-white-30: ${COLORS.overlay.white[30]};
    --color-overlay-white-40: ${COLORS.overlay.white[40]};
    --color-overlay-white-50: ${COLORS.overlay.white[50]};
    --color-overlay-white-60: ${COLORS.overlay.white[60]};
    --color-overlay-white-70: ${COLORS.overlay.white[70]};
    --color-overlay-white-80: ${COLORS.overlay.white[80]};
    --color-overlay-white-90: ${COLORS.overlay.white[90]};

    --color-overlay-black-5: ${COLORS.overlay.black[5]};
    --color-overlay-black-10: ${COLORS.overlay.black[10]};
    --color-overlay-black-20: ${COLORS.overlay.black[20]};
    --color-overlay-black-30: ${COLORS.overlay.black[30]};
    --color-overlay-black-40: ${COLORS.overlay.black[40]};
    --color-overlay-black-50: ${COLORS.overlay.black[50]};
    --color-overlay-black-60: ${COLORS.overlay.black[60]};
    --color-overlay-black-70: ${COLORS.overlay.black[70]};
    --color-overlay-black-80: ${COLORS.overlay.black[80]};
    --color-overlay-black-90: ${COLORS.overlay.black[90]};
  }
`;

// Helper functions để sử dụng trong components
export const getColor = (colorPath: string) => {
	const path = colorPath.split(".");
	let current: any = COLORS;

	for (const key of path) {
		if (current[key] === undefined) {
			console.warn(`Color path "${colorPath}" not found`);
			return COLORS.neutral.black;
		}
		current = current[key];
	}

	return current;
};

// Export các màu thường dùng để sử dụng trực tiếp
export const { boNoiVu, neutral, status, overlay } = COLORS;
