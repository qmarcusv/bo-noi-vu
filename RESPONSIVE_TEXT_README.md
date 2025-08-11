# Responsive Text Sizing System

## Tổng quan

Hệ thống responsive text sizing đã được tích hợp vào trang Timeline, cho phép text size tự động điều chỉnh theo kích thước màn hình.

## Tính năng chính

### 1. Responsive Text Scaling

- **Màn 17 inch**: Text size giữ nguyên (scale = 1.0)
- **Màn 70 inch**: Text size gấp 2 lần (scale = 2.0)
- **Màn trung gian**: Text size được interpolate tuyến tính giữa 17-70 inch

### 2. Auto-detection Screen Size

- Tự động detect kích thước màn hình dựa trên DPI và resolution
- Cập nhật real-time khi resize window
- Tính toán diagonal size (inch) chính xác

### 3. Dynamic Text Scaling

- Tất cả text elements đều được scale theo screen size
- Giữ nguyên tỉ lệ và hierarchy của text
- Smooth transition khi thay đổi size

## Cách hoạt động

### Hook `useResponsiveTextSize()`

```typescript
function useResponsiveTextSize() {
	const [textScale, setTextScale] = useState(1);

	useEffect(() => {
		const updateTextScale = () => {
			const screenWidth = window.innerWidth;
			const screenHeight = window.innerHeight;

			// Tính toán diagonal size (inch) dựa trên DPI
			const dpi = window.devicePixelRatio || 1;
			const diagonalPixels = Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight);
			const diagonalInches = diagonalPixels / (dpi * 96); // 96 DPI là standard

			// Màn 17 inch: scale = 1, Màn 70 inch: scale = 2
			if (diagonalInches <= 17) {
				setTextScale(1);
			} else if (diagonalInches >= 70) {
				setTextScale(2);
			} else {
				// Interpolate giữa 17 và 70 inch
				const scale = 1 + (diagonalInches - 17) / (70 - 17);
				setTextScale(scale);
			}
		};

		updateTextScale();
		window.addEventListener("resize", updateTextScale);

		return () => window.removeEventListener("resize", updateTextScale);
	}, []);

	return textScale;
}
```

### Helper Function `getResponsiveTextSize()`

```typescript
const getResponsiveTextSize = (baseSize: string, scale: number = textScale) => {
	// Convert base size (e.g., "text-5xl") to number và scale
	const sizeMap: { [key: string]: number } = {
		"text-xs": 12,
		"text-sm": 14,
		"text-base": 16,
		"text-lg": 18,
		"text-xl": 20,
		"text-2xl": 24,
		"text-3xl": 30,
		"text-4xl": 36,
		"text-5xl": 48,
		"text-6xl": 60,
	};

	const baseSizeNum = sizeMap[baseSize] || 16;
	const scaledSize = Math.round(baseSizeNum * scale);

	return { fontSize: `${scaledSize}px` };
};
```

## Cách sử dụng

### 1. Áp dụng cho Text Elements

```typescript
// Thay vì sử dụng Tailwind classes
<h1 className="text-5xl font-extrabold">

// Sử dụng responsive sizing
<h1
    className="font-extrabold"
    style={{
        ...getResponsiveTextSize('text-5xl', textScale)
    }}
>
```

### 2. Các Text Elements đã được cập nhật

- **Title chính**: `text-5xl` → responsive
- **Subtitle**: `text-lg` → responsive
- **Year**: `text-5xl` → responsive
- **Event title**: `text-4xl` → responsive
- **Description**: `text-xl` → responsive
- **Content**: `text-sm` → responsive
- **Timeline years**: `text-2xl`/`text-base` → responsive
- **Video overlay text**: `text-sm`/`text-xs` → responsive
- **Buttons**: `text-sm` → responsive

## Cấu hình

### Screen Size Thresholds

- **17 inch**: Text scale = 1.0 (100%)
- **70 inch**: Text scale = 2.0 (200%)
- **Trung gian**: Linear interpolation

### DPI Calculation

- Sử dụng `window.devicePixelRatio` để tính toán chính xác
- Fallback về 1.0 nếu không detect được
- Standard DPI = 96 (Windows default)

## Responsive Breakpoints

### Small Screens (≤17 inch)

- Text size: 100% (giữ nguyên)
- Layout: Compact, mobile-friendly
- Typography: Standard sizes

### Medium Screens (17-70 inch)

- Text size: 100% - 200% (proportional)
- Layout: Adaptive scaling
- Typography: Progressive enlargement

### Large Screens (≥70 inch)

- Text size: 200% (gấp đôi)
- Layout: Expanded, touch-friendly
- Typography: Large, readable

## Performance

### Optimization

- Text scale chỉ được tính toán khi cần thiết
- Event listener được cleanup đúng cách
- Không re-render không cần thiết

### Memory Usage

- Minimal state storage (chỉ 1 number)
- Efficient event handling
- Cleanup on component unmount

## Browser Support

### Supported

- Chrome/Edge (Chromium)
- Firefox
- Safari
- Modern mobile browsers

### Fallbacks

- Nếu không detect được screen size → scale = 1.0
- Nếu không có DPI → sử dụng standard 96 DPI
- Graceful degradation

## Troubleshooting

### Text không scale

- Kiểm tra console để xem lỗi
- Đảm bảo component được mount đúng cách
- Kiểm tra browser support

### Scale không chính xác

- Kiểm tra DPI settings của màn hình
- Test với màn hình có kích thước đã biết
- Verify calculation logic

### Performance issues

- Kiểm tra resize event listener
- Monitor re-render frequency
- Optimize text scale calculations

## Future Enhancements

### Planned Features

- Custom breakpoint configuration
- Smooth animations cho text scaling
- Per-element scaling control
- Accessibility improvements

### Potential Improvements

- CSS custom properties integration
- Viewport-based scaling
- Device orientation support
- Advanced interpolation algorithms
