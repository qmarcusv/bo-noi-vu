import React, { Suspense, lazy, useEffect, useRef, useState, type JSX } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getAssetPath } from "./utils/assets";

const Home = lazy(() => import("./pages/Home"));
const Menu = lazy(() => import("./pages/Menu"));
const Timeline = lazy(() => import("./pages/Timeline"));
const Map = lazy(() => import("./pages/Map"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Experience = lazy(() => import("./pages/Experience"));

type SlideDef = {
	id: string;
	Comp: React.LazyExoticComponent<() => JSX.Element>;
	bg?: string;
};
const SLIDES: SlideDef[] = [
	{ id: "home", Comp: Home, bg: "/assets/red-background.png" },
	{ id: "menu", Comp: Menu, bg: "/assets/white-background.png" },
	{ id: "timeline", Comp: Timeline },
	{ id: "map", Comp: Map },
	{ id: "gallery", Comp: Gallery },
	{ id: "experience", Comp: Experience },
];

function LazySlide({ def, index }: { def: SlideDef; index: number }) {
	const ref = useRef<HTMLElement | null>(null);
	const [visible, setVisible] = useState(index === 0);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					io.disconnect();
				}
			},
			{ rootMargin: "100% 0px 100% 0px", threshold: 0.01 }
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<section
			ref={ref as any}
			id={def.id}
			className="h-screen w-full snap-start"
			style={{
				backgroundImage: def.bg ? `url('${getAssetPath(def.bg)}')` : undefined,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{visible ? (
				<Suspense fallback={<div className="h-full w-full flex items-center justify-center text-body text-white/80">Đang tải…</div>}>
					<def.Comp />
				</Suspense>
			) : (
				<div className="h-full w-full" />
			)}
		</section>
	);
}

export default function App() {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
	}, [location.pathname]);

	return (
		<div className="h-screen w-full overflow-y-auto snap-y snap-mandatory">
			{SLIDES.map((s, i) => (
				<LazySlide key={s.id} def={s} index={i} />
			))}
			<Outlet />
		</div>
	);
}
