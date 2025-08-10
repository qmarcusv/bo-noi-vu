import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./i18n";
import App from "./App";

// Xác định base URL dựa trên environment
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

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
