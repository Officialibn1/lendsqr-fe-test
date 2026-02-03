import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import { RouterProvider } from "react-router/dom";
import router from "./routes.ts";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Theme>
					<RouterProvider router={router} />
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
