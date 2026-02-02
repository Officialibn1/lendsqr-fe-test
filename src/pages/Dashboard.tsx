import { Outlet } from "react-router";
import Header from "../components/ui/header";
import styles from "@/styles/dashboard.module.scss";
import DashboardSideNav from "../components/ui/dashboard-sidenav";

const Dashboard = () => {
	return (
		<section className={styles.section}>
			<Header />

			<div className={styles.mainContainer}>
				<DashboardSideNav />

				<div className={styles.outletWrapper}>
					<Outlet />
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
