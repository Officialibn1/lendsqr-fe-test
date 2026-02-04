import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import { RouterProvider } from "react-router/dom";
import router from "./routes.ts";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import LoadingFallback from "./components/ui/loading-fallback.tsx";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Theme>
					<Suspense fallback={<LoadingFallback />}>
						<RouterProvider router={router} />
					</Suspense>
					<Toaster
						richColors
						closeButton
						position='top-center'
					/>
				</Theme>
			</PersistGate>
		</Provider>
	</StrictMode>,
);
