// Quản lý mở khóa âm thanh toàn cục sau lần tương tác đầu tiên
// Trả về state audioOn (true nếu đã mở âm)

import { useEffect, useState } from "react";

declare global {
	interface Window {
		__audioOn?: boolean;
	}
}

function rampVolumeSmoothly(video: HTMLVideoElement, target: number, durationMs = 300) {
	try {
		const start = video.volume;
		const diff = target - start;
		if (Math.abs(diff) < 0.001) {
			video.volume = target;
			return;
		}
		const steps = Math.max(6, Math.round(durationMs / 16));
		let i = 0;
		const tick = () => {
			i += 1;
			const ratio = i / steps;
			video.volume = Math.min(1, Math.max(0, start + diff * ratio));
			if (i < steps) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	} catch {}
}

function enableAudioGlobally() {
	if (window.__audioOn) return;
	window.__audioOn = true;
	try {
		const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video"));
		for (const v of videos) {
			v.muted = false;
			// tăng âm lượng mượt để tránh pop
			if (v.volume < 1) {
				try {
					v.volume = Math.min(1, Math.max(0, v.volume));
					rampVolumeSmoothly(v, 1, 250);
				} catch {}
			}
			// tiếp tục play nếu đang pause
			if (v.paused) {
				v.play().catch(() => {});
			}
		}
	} catch {}

	// Thông báo cho các component khác
	window.dispatchEvent(new Event("audioOn"));
}

export function useAudioUnlock(): boolean {
	const [audioOn, setAudioOn] = useState<boolean>(() => Boolean(window.__audioOn));

	useEffect(() => {
		if (window.__audioOn) {
			setAudioOn(true);
			return;
		}

		const onFirstGesture = () => {
			enableAudioGlobally();
			setAudioOn(true);
			removeListeners();
		};

		const removeListeners = () => {
			window.removeEventListener("pointerdown", onFirstGesture);
			window.removeEventListener("touchstart", onFirstGesture);
			window.removeEventListener("keydown", onFirstGesture);
		};

		window.addEventListener("pointerdown", onFirstGesture, { once: true });
		window.addEventListener("touchstart", onFirstGesture, { once: true });
		window.addEventListener("keydown", onFirstGesture, { once: true });

		const onAudioOn = () => setAudioOn(true);
		window.addEventListener("audioOn", onAudioOn);

		return () => {
			removeListeners();
			window.removeEventListener("audioOn", onAudioOn);
		};
	}, []);

	return audioOn;
}

export function applyAutoplayAttributes(video: HTMLVideoElement, audioOn: boolean) {
	try {
		video.muted = !audioOn;
		// @ts-ignore
		video.playsInline = true;
		video.autoplay = true;
		video.preload = "auto";
	} catch {}
}
