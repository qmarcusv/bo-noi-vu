export interface TimelineEvent {
	year: string;
	title: string;
	description: string;
	content: string;
	image?: string; // URL của ảnh (tùy chọn)
	video?: string; // URL của video (tùy chọn)
	videoTimestamp?: number; // Thời điểm trong video (giây) ứng với năm này
}

export interface VideoTimeline {
	videoUrl: string;
	posterImage?: string; // Ảnh poster cho video
	events: TimelineEvent[]; // Các sự kiện với timestamp
}

// Dữ liệu timeline với video
export const timelineData: TimelineEvent[] = [
	{
		year: "2002",
		title: "Khởi đầu hành trình",
		description: "Bước đầu tiên trong sự nghiệp",
		content:
			"Năm 2002 đánh dấu sự khởi đầu của một hành trình mới. Đây là thời điểm quan trọng khi những ý tưởng đầu tiên được hình thành và những bước đi đầu tiên được thực hiện. Chúng ta đã bắt đầu với một tầm nhìn rõ ràng và quyết tâm mạnh mẽ để tạo ra những điều có ý nghĩa.",
		image: "/assets/red-background.png",
		videoTimestamp: 20, // Video sẽ chuyển sang năm 2002 tại giây thứ 20
	},
	{
		year: "2004",
		title: "Phát triển và mở rộng",
		description: "Giai đoạn tăng trưởng mạnh mẽ",
		content:
			"Đến năm 2004, chúng ta đã có những bước tiến đáng kể trong việc phát triển và mở rộng hoạt động. Những thành công ban đầu đã tạo nền tảng vững chắc cho sự phát triển trong tương lai. Chúng ta đã học được nhiều bài học quý báu và xây dựng được những mối quan hệ quan trọng.",
		image: "/assets/red-component-background.png",
		videoTimestamp: 30, // Video sẽ chuyển sang năm 2004 tại giây thứ 30
	},
	{
		year: "2005",
		title: "Đột phá và sáng tạo",
		description: "Thời kỳ đổi mới và sáng tạo",
		content:
			"Năm 2005 là một năm đặc biệt với nhiều đột phá và sáng tạo. Chúng ta đã giới thiệu những sản phẩm và dịch vụ mới, đáp ứng nhu cầu ngày càng tăng của khách hàng. Sự sáng tạo và đổi mới đã trở thành động lực chính thúc đẩy sự phát triển của chúng ta.",
		image: "/assets/gray-component-background.png",
		videoTimestamp: 45, // Video sẽ chuyển sang năm 2005 tại giây thứ 45
	},
	{
		year: "2007",
		title: "Củng cố vị thế",
		description: "Xây dựng vị thế vững chắc",
		content:
			"Năm 2007 đánh dấu việc củng cố vị thế của chúng ta trong thị trường. Chúng ta đã xây dựng được uy tín và sự tin tưởng từ khách hàng, đối tác và cộng đồng. Những thành tựu đạt được đã khẳng định hướng đi đúng đắn của chúng ta.",
		image: "/assets/red-component-background.png",
		videoTimestamp: 60, // Video sẽ chuyển sang năm 2007 tại giây thứ 60
	},
	{
		year: "2008",
		title: "Hướng tới tương lai",
		description: "Chuẩn bị cho những thách thức mới",
		content:
			"Năm 2008 là năm chúng ta hướng tới tương lai với những kế hoạch và mục tiêu mới. Chúng ta đã chuẩn bị sẵn sàng để đối mặt với những thách thức mới và nắm bắt những cơ hội mới. Tương lai đang mở ra với nhiều tiềm năng và hứa hẹn.",
		image: "/assets/red-background.png",
		videoTimestamp: 75, // Video sẽ chuyển sang năm 2008 tại giây thứ 75
	},
];

// Cấu hình video chính
export const mainVideoTimeline: VideoTimeline = {
	videoUrl: "/assets/timeline/timeline_1.mp4", // Video timeline chính
	posterImage: "/assets/red-background.png", // Ảnh poster
	events: timelineData,
};

// Hàm helper để lấy event theo năm
export const getEventByYear = (year: string): TimelineEvent | undefined => {
	return timelineData.find((event) => event.year === year);
};

// Hàm helper để lấy tất cả năm
export const getAllYears = (): string[] => {
	return timelineData.map((event) => event.year);
};

// Hàm helper để lấy event theo index
export const getEventByIndex = (index: number): TimelineEvent | undefined => {
	return timelineData[index];
};

// Hàm helper để lấy tổng số events
export const getTotalEvents = (): number => {
	return timelineData.length;
};

// Hàm helper để lấy event dựa trên thời gian video
export const getEventByVideoTime = (currentTime: number): TimelineEvent | undefined => {
	// Tìm event có timestamp gần nhất với thời gian hiện tại
	let closestEvent: TimelineEvent | undefined;
	let minDifference = Infinity;

	for (const event of timelineData) {
		if (event.videoTimestamp !== undefined) {
			const difference = Math.abs(currentTime - event.videoTimestamp);
			if (difference < minDifference) {
				minDifference = difference;
				closestEvent = event;
			}
		}
	}

	return closestEvent;
};

// Hàm helper để lấy index của event dựa trên thời gian video
export const getEventIndexByVideoTime = (currentTime: number): number => {
	const event = getEventByVideoTime(currentTime);
	if (event) {
		return timelineData.findIndex((e) => e.year === event.year);
	}
	return 0;
};
