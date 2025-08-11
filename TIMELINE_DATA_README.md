# Hướng dẫn sử dụng Timeline Data

## Tổng quan

File `src/data/timeline.ts` chứa tất cả dữ liệu hiển thị trên trang Timeline. Bây giờ bạn có thể dễ dàng chỉnh sửa nội dung mà không cần thay đổi code React.

## Cấu trúc dữ liệu

### Interface TimelineEvent

```typescript
interface TimelineEvent {
	year: string; // Năm của sự kiện
	title: string; // Tiêu đề chính
	description: string; // Mô tả ngắn
	content: string; // Nội dung chi tiết
	image?: string; // Đường dẫn ảnh (tùy chọn)
	video?: string; // Đường dẫn video (tùy chọn)
}
```

### Cách thêm/sửa sự kiện

#### 1. Thêm sự kiện mới

```typescript
{
    year: "2010",
    title: "Tiêu đề sự kiện mới",
    description: "Mô tả ngắn về sự kiện",
    content: "Nội dung chi tiết về sự kiện này. Có thể viết dài và chi tiết...",
    image: "/assets/ten-anh.jpg"  // Tùy chọn
}
```

#### 2. Chỉnh sửa sự kiện hiện có

Tìm sự kiện trong mảng `timelineData` và thay đổi các trường tương ứng:

```typescript
// Trước
{
    year: "2002",
    title: "Khởi đầu hành trình",
    description: "Bước đầu tiên trong sự nghiệp",
    content: "Năm 2002 đánh dấu sự khởi đầu..."
}

// Sau
{
    year: "2002",
    title: "Khởi đầu hành trình mới",
    description: "Bước đầu tiên trong sự nghiệp mới",
    content: "Năm 2002 đánh dấu sự khởi đầu của một kỷ nguyên mới..."
}
```

#### 3. Thay đổi ảnh

```typescript
{
	// ... các trường khác
	image: "/assets/ten-anh-moi.jpg"; // Thay đổi đường dẫn ảnh
}
```

## Các hàm helper có sẵn

### `getEventByYear(year: string)`

Lấy sự kiện theo năm cụ thể

```typescript
const event2002 = getEventByYear("2002");
```

### `getAllYears()`

Lấy danh sách tất cả các năm

```typescript
const years = getAllYears(); // ["2002", "2004", "2005", "2007", "2008"]
```

### `getEventByIndex(index: number)`

Lấy sự kiện theo vị trí trong mảng

```typescript
const firstEvent = getEventByIndex(0);
```

### `getTotalEvents()`

Lấy tổng số sự kiện

```typescript
const total = getTotalEvents(); // 5
```

## Lưu ý quan trọng

1. **Thứ tự sự kiện**: Các sự kiện sẽ hiển thị theo thứ tự trong mảng `timelineData`
2. **Ảnh**: Đặt ảnh trong thư mục `public/assets/` và sử dụng đường dẫn tương đối `/assets/ten-anh.jpg`
3. **Nội dung**: Trường `content` có thể viết dài, sẽ được hiển thị với tính năng "Xem thêm/Thu gọn"
4. **Đa ngôn ngữ**: Hiện tại dữ liệu được viết bằng tiếng Việt, có thể mở rộng để hỗ trợ đa ngôn ngữ sau

## Ví dụ hoàn chỉnh

```typescript
export const timelineData: TimelineEvent[] = [
	{
		year: "2002",
		title: "Khởi đầu hành trình",
		description: "Bước đầu tiên trong sự nghiệp",
		content: "Năm 2002 đánh dấu sự khởi đầu của một hành trình mới...",
		image: "/assets/2002-event.jpg",
	},
	{
		year: "2004",
		title: "Phát triển và mở rộng",
		description: "Giai đoạn tăng trưởng mạnh mẽ",
		content: "Đến năm 2004, chúng ta đã có những bước tiến đáng kể...",
		image: "/assets/2004-event.jpg",
	},
	// ... thêm các sự kiện khác
];
```

## Lợi ích của cách làm mới

1. **Dễ bảo trì**: Chỉ cần sửa file data, không cần động đến code React
2. **Tách biệt**: Dữ liệu và logic hiển thị được tách riêng
3. **Linh hoạt**: Dễ dàng thêm/sửa/xóa sự kiện
4. **Tái sử dụng**: Có thể sử dụng dữ liệu này ở các component khác
5. **Quản lý version**: Dễ dàng theo dõi thay đổi dữ liệu qua Git
