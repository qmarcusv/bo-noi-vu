/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				'xl4k': '2560px',   // cho TV 4K / màn lớn
			},
			fontSize: {
				// chữ thân thiện màn lớn, scale theo chiều rộng
				'display': ['clamp(40px, 3.5vw, 88px)', { lineHeight: '1' }],
				'headline': ['clamp(28px, 2.2vw, 56px)', { lineHeight: '1.1' }],
				'body': ['clamp(18px, 1.1vw, 28px)', { lineHeight: '1.5' }],
			},
			spacing: {
				'safe': 'clamp(16px, 2vw, 48px)', // padding/margin co giãn
			}
		},
	},
	plugins: [],
};
