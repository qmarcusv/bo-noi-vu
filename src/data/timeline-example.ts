// File ví dụ: Cách thêm/sửa dữ liệu timeline
// Copy nội dung này vào file timeline.ts để thay thế dữ liệu hiện tại

import type { TimelineEvent } from "./timeline";

export const exampleTimelineData: TimelineEvent[] = [
	{
		year: "2002",
		title: "Khởi đầu hành trình",
		description: "Bước đầu tiên trong sự nghiệp",
		content:
			"Năm 2002 đánh dấu sự khởi đầu của một hành trình mới. Đây là thời điểm quan trọng khi những ý tưởng đầu tiên được hình thành và những bước đi đầu tiên được thực hiện. Chúng ta đã bắt đầu với một tầm nhìn rõ ràng và quyết tâm mạnh mẽ để tạo ra những điều có ý nghĩa.",
		image: "/assets/2002-event.jpg", // Thay đổi ảnh ở đây
	},
	{
		year: "2004",
		title: "Phát triển và mở rộng",
		description: "Giai đoạn tăng trưởng mạnh mẽ",
		content:
			"Đến năm 2004, chúng ta đã có những bước tiến đáng kể trong việc phát triển và mở rộng hoạt động. Những thành công ban đầu đã tạo nền tảng vững chắc cho sự phát triển trong tương lai. Chúng ta đã học được nhiều bài học quý báu và xây dựng được những mối quan hệ quan trọng.",
		image: "/assets/2004-event.jpg",
	},
	{
		year: "2005",
		title: "Đột phá và sáng tạo",
		description: "Thời kỳ đổi mới và sáng tạo",
		content:
			"Năm 2005 là một năm đặc biệt với nhiều đột phá và sáng tạo. Chúng ta đã giới thiệu những sản phẩm và dịch vụ mới, đáp ứng nhu cầu ngày càng tăng của khách hàng. Sự sáng tạo và đổi mới đã trở thành động lực chính thúc đẩy sự phát triển của chúng ta.",
		image: "/assets/2005-event.jpg",
	},
	{
		year: "2007",
		title: "Củng cố vị thế",
		description: "Xây dựng vị thế vững chắc",
		content:
			"Năm 2007 đánh dấu việc củng cố vị thế của chúng ta trong thị trường. Chúng ta đã xây dựng được uy tín và sự tin tưởng từ khách hàng, đối tác và cộng đồng. Những thành tựu đạt được đã khẳng định hướng đi đúng đắn của chúng ta.",
		image: "/assets/2007-event.jpg",
	},
	{
		year: "2008",
		title: "Hướng tới tương lai",
		description: "Chuẩn bị cho những thách thức mới",
		content:
			"Năm 2008 là năm chúng ta hướng tới tương lai với những kế hoạch và mục tiêu mới. Chúng ta đã chuẩn bị sẵn sàng để đối mặt với những thách thức mới và nắm bắt những cơ hội mới. Tương lai đang mở ra với nhiều tiềm năng và hứa hẹn.",
		image: "/assets/2008-event.jpg",
	},
	// Thêm sự kiện mới ở đây
	{
		year: "2010",
		title: "Bước tiến mới",
		description: "Mở rộng quy mô hoạt động",
		content:
			"Năm 2010 đánh dấu một bước tiến quan trọng trong việc mở rộng quy mô hoạt động. Chúng ta đã thành công trong việc mở rộng thị trường và đưa sản phẩm đến với nhiều khách hàng hơn. Đây là minh chứng cho sự phát triển bền vững của chúng ta.",
		image: "/assets/2010-event.jpg",
	},
];

// Cách sử dụng:
// 1. Copy nội dung từ exampleTimelineData vào timelineData trong file timeline.ts
// 2. Thay đổi các trường title, description, content theo ý muốn
// 3. Thay đổi đường dẫn ảnh trong trường image
// 4. Thêm hoặc xóa các sự kiện theo nhu cầu
