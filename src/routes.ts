import { createBrowserRouter } from "react-router";
import { lazy } from "react";

const App = lazy(() => import("./App"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UserDetails = lazy(() => import("./pages/UserDetails"));
const UsersPage = lazy(() => import("./pages/UsersPage"));

const router = createBrowserRouter([
	{ index: true, Component: App },
	{
		path: "/dashboard",
		Component: Dashboard,
		children: [
			{ index: true, Component: UsersPage },
			{ path: ":id", Component: UserDetails },
		],
	},
]);

export default router;
