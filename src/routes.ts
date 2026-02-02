import { createBrowserRouter } from "react-router";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails";

const router = createBrowserRouter([
	{ path: "/", Component: App },
	{
		path: "/dashboard",
		Component: Dashboard,
		children: [{ path: ":id", Component: UserDetails }],
	},
]);

export default router;
