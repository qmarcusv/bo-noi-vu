# Troubleshooting - Vấn đề nền trắng trên GitHub Pages

## Vấn đề đã gặp phải

Khi deploy lên GitHub Pages, trang web hiển thị nền trắng hoàn toàn, không có nội dung nào.

## Nguyên nhân

1. **Base URL không đúng**: GitHub Pages sử dụng base URL `/bo-noi-vu/` nhưng routing và assets không được cấu hình đúng
2. **Assets không load được**: Các file ảnh background sử dụng đường dẫn tuyệt đối `/assets/...` không hoạt động với base URL
3. **Router không có basename**: React Router không biết về base URL của GitHub Pages

## Giải pháp đã áp dụng

### 1. Cập nhật Vite config

```typescript
// vite.config.ts
export default defineConfig(({ command }) => ({
	base: command === "serve" ? "/" : "/bo-noi-vu/",
	// ...
}));
```

### 2. Cập nhật React Router

```typescript
// main.tsx
const basename = import.meta.env.PROD ? "/bo-noi-vu" : "/";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <App />,
		},
	],
	{
		basename: basename,
	}
);
```

### 3. Tạo utility function cho assets

```typescript
// src/utils/assets.ts
export function getAssetPath(path: string): string {
	if (import.meta.env.PROD && import.meta.env.BASE_URL) {
		const cleanPath = path.startsWith("/") ? path.slice(1) : path;
		return `${import.meta.env.BASE_URL}${cleanPath}`;
	}
	return path;
}
```

### 4. Cập nhật tất cả components

Thay thế tất cả đường dẫn assets:

```typescript
// Trước
src="/assets/image.png"
backgroundImage: "url('/assets/bg.png')"

// Sau
src={getAssetPath("/assets/image.png")}
backgroundImage: `url('${getAssetPath('/assets/bg.png')}')`
```

## Các file đã cập nhật

- ✅ `vite.config.ts` - Base URL conditional
- ✅ `src/main.tsx` - Router basename
- ✅ `src/utils/assets.ts` - Utility function
- ✅ `src/App.tsx` - Background images
- ✅ `src/pages/Home.tsx` - All assets
- ✅ `src/pages/Map.tsx` - All assets
- ✅ `src/pages/Experience.tsx` - All assets
- ✅ `src/pages/Gallery.tsx` - All assets
- ✅ `src/pages/Timeline.tsx` - All assets
- ✅ `src/pages/Menu.tsx` - All assets

## Test

1. **Development**: `pnpm run dev` - Chạy tại `http://localhost:5173/`
2. **Production build**: `pnpm run build` - Tạo thư mục `dist/`
3. **Deploy**: Push code lên GitHub để trigger GitHub Actions

## Kết quả mong đợi

- ✅ Development server hoạt động bình thường
- ✅ Production build thành công
- ✅ GitHub Pages hiển thị đúng nội dung và assets
- ✅ Không còn nền trắng

## Lưu ý

- Luôn sử dụng `getAssetPath()` cho tất cả assets
- Kiểm tra console để debug đường dẫn assets
- Đảm bảo GitHub Pages source là "GitHub Actions"
