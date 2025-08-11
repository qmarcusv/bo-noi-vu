# Video Timeline Integration Guide

## Tổng quan

Hệ thống video timeline đã được tích hợp vào component Timeline, cho phép video chính điều khiển timeline một cách tự động.

## Tính năng chính

### 1. Video Timeline Chính

- Video chính được đặt ở đầu trang timeline
- Tự động đồng bộ hóa với các sự kiện timeline
- Hiển thị thời gian hiện tại và thông tin đồng bộ

### 2. Đồng bộ hóa tự động

- Khi video chạy, timeline tự động chuyển đổi giữa các năm
- Mỗi sự kiện có `videoTimestamp` để xác định thời điểm hiển thị
- Timeline cập nhật real-time theo thời gian video

### 3. Điều khiển tương tác

- Click vào các điểm timeline để nhảy video đến thời điểm tương ứng
- Nút điều hướng (trước/sau) vẫn hoạt động bình thường
- Video controls tích hợp sẵn

## Cấu hình dữ liệu

### Cấu trúc TimelineEvent

```typescript
export interface TimelineEvent {
	year: string;
	title: string;
	description: string;
	content: string;
	image?: string;
	videoTimestamp?: number; // Thời điểm trong video (giây)
}
```

### Cấu hình video chính

```typescript
export const mainVideoTimeline: VideoTimeline = {
	videoUrl: "/assets/main-timeline-video.mp4",
	posterImage: "/assets/video-poster.jpg",
	events: timelineData,
};
```

## Cách sử dụng

### 1. Thêm video vào thư mục assets

- Đặt video vào `public/assets/`
- Cập nhật `videoUrl` trong `mainVideoTimeline`

### 2. Cấu hình timestamp cho các sự kiện

- Mỗi sự kiện cần có `videoTimestamp` (tính bằng giây)
- Ví dụ: 20s = năm 2002, 30s = năm 2004

### 3. Test tính năng

- Chạy video và quan sát timeline tự động chuyển đổi
- Click vào các điểm timeline để nhảy video
- Kiểm tra đồng bộ hóa giữa video và timeline

## Đa ngôn ngữ

Tất cả text trong video timeline đều hỗ trợ đa ngôn ngữ:

- `vi.json`: Tiếng Việt
- `en.json`: Tiếng Anh

### Các key mới được thêm:

- `pages.timeline.video.notSupported`
- `pages.timeline.video.currentTime`
- `pages.timeline.video.syncInfo`
- `pages.timeline.content.expand`
- `pages.timeline.content.collapse`

## Lưu ý kỹ thuật

### 1. Performance

- Video được preload metadata để tối ưu hiệu suất
- Timeline chỉ cập nhật khi cần thiết

### 2. Browser Support

- Sử dụng HTML5 video API
- Fallback text cho trình duyệt không hỗ trợ video

### 3. Responsive Design

- Video timeline responsive trên mọi thiết bị
- Layout tự động điều chỉnh theo kích thước màn hình

## Troubleshooting

### Video không phát được

- Kiểm tra đường dẫn file video
- Đảm bảo format video được hỗ trợ (MP4, WebM)
- Kiểm tra console để xem lỗi

### Timeline không đồng bộ

- Kiểm tra `videoTimestamp` trong data
- Đảm bảo video có đủ thời lượng
- Test với video ngắn trước

### Hiển thị không đúng

- Kiểm tra file ngôn ngữ có đầy đủ key
- Clear cache trình duyệt
- Kiểm tra responsive breakpoints
