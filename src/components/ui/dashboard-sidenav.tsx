import styles from "@/styles/dashboardSideNav.module.scss";
// import { useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { NavLink } from "react-router";

import briefCase1 from "@/assets/svg-icons/briefcase.svg";
import home from "@/assets/svg-icons/home.svg";
import userFriends from "@/assets/svg-icons/user-friends.svg";
import handshakeRegular from "@/assets/svg-icons/handshake-regular.svg";
import users from "@/assets/svg-icons/users.svg";
import userCheck from "@/assets/svg-icons/user-check.svg";
import userTimes from "@/assets/svg-icons/user-times.svg";
import sack from "@/assets/svg-icons/sack.svg";
import sackHand from "@/assets/svg-icons/sack-hand.svg";
import piggyBank from "@/assets/svg-icons/piggy-bank.svg";
import bank from "@/assets/svg-icons/bank.svg";
import coins from "@/assets/svg-icons/coins.svg";
import transfer from "@/assets/svg-icons/transfer.svg";
import galaxy from "@/assets/svg-icons/galaxy.svg";
import userCog from "@/assets/svg-icons/user-cog.svg";
import scroll from "@/assets/svg-icons/scroll.svg";
import chartBar from "@/assets/svg-icons/chart-bar.svg";
import sliders from "@/assets/svg-icons/sliders.svg";
import badge from "@/assets/svg-icons/badge-percent.svg";
import clipboard from "@/assets/svg-icons/clipboard-list.svg";
import { useState } from "react";

type AsideLink = {
	name: string;
	icon: string;
	url: string;
};
const customersGroup: AsideLink[] = [
	{
		name: "Users",
		icon: userFriends,
		url: "/dashboard",
	},
	{
		name: "Guarantors",
		icon: users,
		url: "/",
	},
	{
		name: "Loans",
		icon: sack,
		url: "/",
	},
	{
		name: "Decision Models",
		icon: handshakeRegular,
		url: "/",
	},
	{
		name: "Savings",
		icon: piggyBank,
		url: "/",
	},
	{
		name: "Loan Requests",
		icon: sackHand,
		url: "/",
	},
	{
		name: "Whitelist",
		icon: userCheck,
		url: "/",
	},
	{
		name: "Karma",
		icon: userTimes,
		url: "/",
	},
];

const businessesGroup: AsideLink[] = [
	{
		name: "Organization",
		icon: briefCase1,
		url: "/",
	},
	{
		name: "Loan Products",
		icon: sackHand,
		url: "/",
	},
	{
		name: "Savings Products",
		icon: bank,
		url: "/",
	},
	{
		name: "Fees and Charges",
		icon: coins,
		url: "/",
	},
	{
		name: "Transactions",
		icon: transfer,
		url: "/",
	},
	{
		name: "Services",
		icon: galaxy,
		url: "/",
	},
	{
		name: "Service Account",
		icon: userCog,
		url: "/",
	},
	{
		name: "Settlements",
		icon: scroll,
		url: "/",
	},
	{
		name: "Reports",
		icon: chartBar,
		url: "/",
	},
];

const settingsGroup: AsideLink[] = [
	{
		name: "Preferences",
		icon: sliders,
		url: "/",
	},
	{
		name: "Fees and Pricing",
		icon: badge,
		url: "/",
	},
	{
		name: "Audit Logs",
		icon: clipboard,
		url: "/",
	},
];

const DashboardSideNav = () => {
	// const [fullWidth, setFullWidth] = useState(true);
	const fullWidth = true;

	const [openMobileNav, setOpenMobileNav] = useState(false);
	return (
		<>
			<aside
				className={`${styles.asideMobile} ${openMobileNav ? styles.open : ""}`}>
				<button
					className={styles.toggleButtonMobile}
					onClick={() => setOpenMobileNav((prev) => !prev)}>
					{!openMobileNav ? <FaChevronRight /> : <FaChevronLeft />}
				</button>
				<NavLink
					to={"/"}
					className={`${styles.asideLinkMobile}  ${openMobileNav ? styles.open : ""}`}>
					<img
						src={briefCase1}
						className={styles.asideLinkIcon}
					/>
					<span
						className={`${styles.asideLinkTextMobile}  ${openMobileNav ? styles.open : ""}`}>
						Switch Organization
					</span>
					<FaChevronDown />
				</NavLink>

				<NavLink
					to={"/"}
					onClick={() => setOpenMobileNav((prev) => !prev)}
					className={({ isActive }) =>
						isActive
							? `${styles.asideLinkMobile} ${styles.active} ${openMobileNav ? styles.open : ""}`
							: `${styles.asideLinkMobile} ${styles.blur}`
					}>
					<img
						src={home}
						className={styles.asideLinkIcon}
					/>
					<span
						className={`${styles.asideLinkTextMobile}  ${openMobileNav ? styles.open : ""}`}>
						Dashboard
					</span>
				</NavLink>

				<div className={styles.asideGroup}>
					<h1
						className={`${styles.asideGroupTitleMobile}  ${openMobileNav ? styles.open : ""}`}>
						CUSTOMERS
					</h1>
					{customersGroup.map((item, idx) => (
						<NavLink
							key={item.name + idx}
							to={item.url}
							onClick={() => setOpenMobileNav((prev) => !prev)}
							className={({ isActive }) =>
								isActive
									? `${styles.asideLinkMobile} ${styles.active} ${openMobileNav ? styles.open : ""}`
									: `${styles.asideLinkMobile} ${styles.blur}`
							}>
							<img
								src={item.icon}
								className={styles.asideLinkIcon}
							/>
							<span
								className={`${styles.asideLinkTextMobile}  ${openMobileNav ? styles.open : ""}`}>
								{item.name}
							</span>
						</NavLink>
					))}
				</div>

				<div className={styles.asideGroup}>
					<h1
						className={`${styles.asideGroupTitleMobile}  ${openMobileNav ? styles.open : ""}`}>
						BUSINESSES
					</h1>
					{businessesGroup.map((item, idx) => (
						<NavLink
							key={item.name + idx}
							to={item.url}
							onClick={() => setOpenMobileNav((prev) => !prev)}
							className={({ isActive }) =>
								isActive
									? `${styles.asideLinkMobile} ${styles.active} ${openMobileNav ? styles.open : ""}`
									: `${styles.asideLinkMobile} ${styles.blur}`
							}>
							<img
								src={item.icon}
								className={styles.asideLinkIcon}
							/>
							<span
								className={`${styles.asideLinkTextMobile}  ${openMobileNav ? styles.open : ""}`}>
								{item.name}
							</span>
						</NavLink>
					))}
				</div>

				<div className={styles.asideGroup}>
					<h1
						className={`${styles.asideGroupTitleMobile}  ${openMobileNav ? styles.open : ""}`}>
						SETTINGS
					</h1>
					{settingsGroup.map((item, idx) => (
						<NavLink
							key={item.name + idx}
							to={item.url}
							onClick={() => setOpenMobileNav((prev) => !prev)}
							className={({ isActive }) =>
								isActive
									? `${styles.asideLinkMobile} ${styles.active} ${openMobileNav ? styles.open : ""}`
									: `${styles.asideLinkMobile} ${styles.blur}`
							}>
							<img
								src={item.icon}
								className={styles.asideLinkIcon}
							/>
							<span
								className={`${styles.asideLinkTextMobile}  ${openMobileNav ? styles.open : ""}`}>
								{item.name}
							</span>
						</NavLink>
					))}
				</div>
			</aside>

			<aside
				className={`${styles.aside} ${fullWidth ? styles.sidebarFull : styles.sidebarCollapsed}`}>
				<NavLink
					to={"/"}
					className={`${styles.asideLink}`}>
					<img
						src={briefCase1}
						className={styles.asideLinkIcon}
					/>
					<span className={styles.asideLinkText}>Switch Organization</span>
					<FaChevronDown />
				</NavLink>

				<NavLink
					to={"/"}
					className={({ isActive }) =>
						isActive
							? `${styles.asideLink} ${styles.active}`
							: `${styles.asideLink} ${styles.blur}`
					}>
					<img
						src={home}
						className={styles.asideLinkIcon}
					/>
					<span className={styles.asideLinkText}>Dashboard</span>
				</NavLink>

				<div className={styles.asideGroup}>
					<h1 className={styles.asideGroupTitle}>CUSTOMERS</h1>
					{customersGroup.map((item, idx) => (
						<NavLink
							key={item.name + idx}
							to={item.url}
							className={({ isActive }) =>
								isActive
									? `${styles.asideLink} ${styles.active}`
									: `${styles.asideLink} ${styles.blur}`
							}>
							<img
								src={item.icon}
								className={styles.asideLinkIcon}
							/>
							<span className={styles.asideLinkText}>{item.name}</span>
						</NavLink>
					))}
				</div>

				<div className={styles.asideGroup}>
					<h1 className={styles.asideGroupTitle}>BUSINESSES</h1>
					{businessesGroup.map((item, idx) => (
						<NavLink
							key={item.name + idx}
							to={item.url}
							className={({ isActive }) =>
								isActive
									? `${styles.asideLink} ${styles.active}`
									: `${styles.asideLink} ${styles.blur}`
							}>
							<img
								src={item.icon}
								className={styles.asideLinkIcon}
							/>
							<span className={styles.asideLinkText}>{item.name}</span>
						</NavLink>
					))}
				</div>

				<div className={styles.asideGroup}>
					<h1 className={styles.asideGroupTitle}>SETTINGS</h1>
					{settingsGroup.map((item, idx) => (
						<NavLink
							key={item.name + idx}
							to={item.url}
							className={({ isActive }) =>
								isActive
									? `${styles.asideLink} ${styles.active}`
									: `${styles.asideLink} ${styles.blur}`
							}>
							<img
								src={item.icon}
								className={styles.asideLinkIcon}
							/>
							<span className={styles.asideLinkText}>{item.name}</span>
						</NavLink>
					))}
				</div>
			</aside>
		</>
	);
};

export default DashboardSideNav;
