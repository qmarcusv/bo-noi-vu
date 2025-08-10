# Hệ thống Quản lý Màu sắc và Text - Bộ Nội Vụ

## Tổng quan

Dự án đã được cập nhật với 3 cải tiến chính:

1. **Ẩn thanh cuộn dọc** trên tất cả các trang
2. **Hệ thống màu sắc chuẩn** được quản lý tập trung
3. **Quản lý text đa ngôn ngữ** cho tất cả các trang

## 1. Ẩn thanh cuộn dọc

### Vị trí: `src/index.css`

```css
/* Ẩn thanh cuộn dọc */
html {
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* Internet Explorer 10+ */
}

html::-webkit-scrollbar {
	display: none; /* Chrome, Safari, Opera */
}

/* Tương tự cho body, #root và tất cả phần tử con */
```

**Kết quả:** Thanh cuộn dọc sẽ bị ẩn hoàn toàn trên tất cả các trình duyệt.

## 2. Hệ thống Màu sắc Chuẩn

### Vị trí: `src/constants/colors.ts`

#### Cấu trúc màu sắc:

```typescript
export const COLORS = {
  // Màu chính - Đỏ Bộ Nội vụ
  primary: { 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 },

  // Màu đỏ chủ đạo của Bộ Nội vụ
  boNoiVu: {
    light: '#9b0000',    // Text chính
    main: '#8b0000',     // Background
    dark: '#6b0000',     // Hover states
    darker: '#4b0000',   // Active states
  },

  // Màu trung tính
  neutral: { white, black, gray: { 50-900 } },

  // Màu trạng thái
  status: { success, warning, error, info },

  // Màu overlay và shadow
  overlay: { white: { 10-90 }, black: { 5-90 } }
}
```

#### Cách sử dụng:

```typescript
import { boNoiVu, neutral, overlay } from '../constants/colors';

// Sử dụng trực tiếp
<div style={{ color: boNoiVu.light }}>Text</div>

// Sử dụng với CSS custom properties
<div style={{ color: 'var(--color-bo-noi-vu-light)' }}>Text</div>
```

#### CSS Custom Properties:

Tất cả màu sắc đã được định nghĩa trong `:root` của `src/index.css`:

```css
:root {
	--color-bo-noi-vu-light: #9b0000;
	--color-bo-noi-vu-main: #8b0000;
	--color-white: #ffffff;
	--color-black: #000000;
	/* ... và nhiều màu khác */
}
```

## 3. Quản lý Text đa ngôn ngữ

### Vị trí: `src/locales/`

#### Cấu trúc file ngôn ngữ:

```json
{
	"pages": {
		"timeline": {
			"title": "Dòng thời gian",
			"subtitle": "Thành lập Bộ Nội vụ – Các giai đoạn thay đổi lớn – Các sự kiện nổi bật",
			"events": {
				"2002": {
					"title": "Thành lập Bộ Nội vụ",
					"description": "Lorem ipsum dolor sit amet",
					"content": "Lorem ipsum dolor sit amet..."
				}
			},
			"navigation": {
				"previous": "Năm trước",
				"next": "Năm sau",
				"jumpTo": "Chuyển đến năm"
			}
		}
	}
}
```

#### Cách sử dụng trong component:

```typescript
import { useTranslation } from "react-i18next";

export default function Timeline() {
	const { t } = useTranslation();

	// Lấy text đơn giản
	<h1>{t("pages.timeline.title")}</h1>;

	// Lấy object từ nested key
	const event = t(`pages.timeline.events.2002`, { returnObjects: true });

	// Lấy text với tham số
	<button aria-label={`${t("pages.timeline.navigation.jumpTo")} 2002`}>Jump to 2002</button>;
}
```

## 4. Cách áp dụng cho các trang khác

### Bước 1: Cập nhật file ngôn ngữ

Thêm text mới vào `src/locales/vi.json` và `src/locales/en.json`:

```json
{
	"pages": {
		"map": {
			"title": "Bản đồ tương tác",
			"description": "Khám phá tổ chức hành chính...",
			"sections": {
				"admin": "Tổ chức hành chính",
				"public": "Đơn vị sự nghiệp công lập"
			}
		}
	}
}
```

### Bước 2: Cập nhật component

```typescript
import { useTranslation } from "react-i18next";
import { boNoiVu, neutral } from "../constants/colors";

export default function Map() {
	const { t } = useTranslation();

	return (
		<div>
			<h1 style={{ color: boNoiVu.light }}>{t("pages.map.title")}</h1>
			<p style={{ color: neutral.black }}>{t("pages.map.description")}</p>
		</div>
	);
}
```

## 5. Lợi ích của hệ thống mới

### Quản lý màu sắc:

- ✅ **Tập trung:** Tất cả màu sắc ở một nơi
- ✅ **Nhất quán:** Đảm bảo màu sắc giống nhau trên toàn bộ dự án
- ✅ **Dễ thay đổi:** Chỉ cần sửa một file để thay đổi toàn bộ
- ✅ **Type-safe:** TypeScript hỗ trợ đầy đủ

### Quản lý text:

- ✅ **Đa ngôn ngữ:** Hỗ trợ tiếng Việt và tiếng Anh
- ✅ **Dễ bảo trì:** Text được tổ chức theo cấu trúc rõ ràng
- ✅ **Tái sử dụng:** Có thể dùng chung text giữa các component
- ✅ **Linh hoạt:** Dễ dàng thêm ngôn ngữ mới

### Ẩn thanh cuộn:

- ✅ **Giao diện sạch:** Loại bỏ thanh cuộn không cần thiết
- ✅ **Responsive:** Hoạt động trên tất cả thiết bị
- ✅ **Cross-browser:** Hỗ trợ tất cả trình duyệt hiện đại

## 6. Best Practices

### Khi thêm màu mới:

1. Thêm vào `src/constants/colors.ts`
2. Thêm CSS custom property vào `src/index.css`
3. Sử dụng trong component thay vì hardcode

### Khi thêm text mới:

1. Thêm vào cả `vi.json` và `en.json`
2. Sử dụng cấu trúc nested hợp lý
3. Đặt tên key có ý nghĩa và dễ hiểu

### Khi tạo component mới:

1. Import colors từ constants
2. Sử dụng `useTranslation` hook
3. Áp dụng màu sắc từ hệ thống chuẩn

## 7. Troubleshooting

### Màu sắc không hiển thị:

- Kiểm tra import từ `constants/colors`
- Đảm bảo CSS custom properties đã được định nghĩa

### Text không hiển thị:

- Kiểm tra key trong file ngôn ngữ
- Đảm bảo `useTranslation` hook được sử dụng đúng cách

### Thanh cuộn vẫn hiển thị:

- Kiểm tra CSS đã được áp dụng
- Đảm bảo không có CSS khác ghi đè

---

**Lưu ý:** Hệ thống này được thiết kế để dễ dàng mở rộng và bảo trì. Hãy tuân thủ các quy tắc đã định để đảm bảo tính nhất quán của dự án.
