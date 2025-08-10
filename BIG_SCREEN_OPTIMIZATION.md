# Tối ưu hóa cho màn hình lớn (70" 4K)

## Các thay đổi đã thực hiện

### 1. Cập nhật Tailwind Config

- Thêm breakpoint `xl4k: '2560px'` cho TV 4K / màn hình lớn
- Thêm các class typography co giãn:
  - `text-display`: `clamp(40px, 3.5vw, 88px)` - cho tiêu đề chính
  - `text-headline`: `clamp(28px, 2.2vw, 56px)` - cho tiêu đề phụ
  - `text-body`: `clamp(18px, 1.1vw, 28px)` - cho nội dung chính
- Thêm class spacing co giãn:
  - `px-safe`, `py-safe`: `clamp(16px, 2vw, 48px)` - cho padding/margin

### 2. Cập nhật các component

#### Timeline.tsx

- Tiêu đề chính: `text-5xl md:text-6xl` → `text-display`
- Mô tả: `text-lg` → `text-body`
- Năm: `text-5xl md:text-6xl` → `text-display`
- Tiêu đề sự kiện: `text-4xl md:text-5xl` → `text-headline`
- Mô tả sự kiện: `text-xl` → `text-headline`
- Padding: `px-6 py-3` → `px-safe py-safe`

#### Home.tsx

- Mô tả video: `text-xs sm:text-sm md:text-base` → `text-body`
- Nút khám phá: `px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4` → `px-safe py-safe`
- Text nút: `text-base sm:text-lg md:text-xl` → `text-body`

#### Menu.tsx

- Padding menu items: `p-4 sm:p-5 md:p-6` → `p-safe`
- Tiêu đề menu: `text-base sm:text-lg md:text-xl` → `text-headline`
- Mô tả menu: `text-xs sm:text-sm` → `text-body`

#### Gallery.tsx

- Tiêu đề chính: `text-5xl md:text-6xl` → `text-display`
- Mô tả: `text-lg` → `text-body`
- Tiêu đề video: `text-xl` → `text-headline`
- Tiêu đề ảnh: `text-xl` → `text-headline`
- Padding: `px-6 py-3` → `px-safe py-safe`

#### Experience.tsx

- Tiêu đề chính: `text-5xl md:text-6xl` → `text-display`
- Mô tả: `text-lg` → `text-body`
- Tiêu đề phụ: `text-xl md:text-2xl` → `text-headline`
- Nội dung: `text-sm` → `text-body`
- Nút: `px-6 py-2` → `px-safe py-safe`
- Tiêu đề photobooth: `text-3xl` → `text-headline`
- Mô tả QR: `text-sm` → `text-body`

#### Map.tsx

- Tiêu đề chính: `text-5xl md:text-6xl` → `text-display`
- Mô tả: `text-lg` → `text-body`
- Tiêu đề nhóm: `text-2xl` → `text-headline`
- Padding: `px-6 py-3` → `px-safe py-safe`

#### MainNavbar.tsx

- Text navigation: `text-base md:text-lg` → `text-body`

#### LanguageSwitcher.tsx

- Text buttons: `text-sm` → `text-body`
- Padding: `px-3 py-1` → `px-safe py-safe`

#### App.tsx

- Loading text: thêm `text-body`

## Lợi ích

1. **Typography co giãn**: Chữ tự động scale theo viewport, đảm bảo dễ đọc trên mọi kích thước màn hình
2. **Spacing thông minh**: Padding/margin tự động điều chỉnh theo không gian có sẵn
3. **Tương thích 4K**: Breakpoint `xl4k` cho phép tối ưu riêng cho màn hình 4K
4. **Responsive tốt hơn**: Sử dụng `clamp()` thay vì breakpoint cố định
5. **Dễ bảo trì**: Các class semantic giúp code dễ hiểu và sửa đổi

## Sử dụng

```tsx
// Thay vì
<h1 className="text-5xl md:text-6xl">Tiêu đề</h1>

// Sử dụng
<h1 className="text-display">Tiêu đề</h1>

// Thay vì
<div className="px-6 py-3">Nội dung</div>

// Sử dụng
<div className="px-safe py-safe">Nội dung</div>
```

## Breakpoint mới

- `xl4k`: `2560px` - cho màn hình 4K và TV lớn
- Có thể thêm media query tùy chỉnh cho breakpoint này nếu cần
