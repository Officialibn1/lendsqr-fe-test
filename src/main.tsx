import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import { RouterProvider } from "react-router/dom";
import router from "./routes.ts";
import { Toaster } from "sonner";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
	<StrictMode>
		<Theme>
			<RouterProvider router={router} />
			<Toaster
				richColors
				closeButton
				position='top-center'
			/>
		</Theme>
	</StrictMode>,
);
