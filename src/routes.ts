import { createBrowserRouter } from "react-router";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails";

const router = createBrowserRouter([
	{ index: true, Component: App },
	{
		path: "/dashboard",
		Component: Dashboard,
		children: [
			{ index: true, Component: UserDetails },
			{ path: ":id", Component: UserDetails },
		],
	},
]);

export default router;
