import { TfiBell } from "react-icons/tfi";
import { FaCaretDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import lendSqrLogo from "@/assets/lendqsr-logo.svg";
import user from "@/assets/user.svg";
import styles from "@/styles/header.module.scss";
import { Avatar } from "@radix-ui/themes";
import { Link } from "react-router";

const Header = () => {
	return (
		<header className={styles.header}>
			{/* LOGO */}
			<Link
				to={"/"}
				className={styles.logo}>
				<img
					src={lendSqrLogo}
					className={styles.logo}
				/>
			</Link>

			<div className={styles.searchContainer}>
				<input
					className={styles.searchInput}
					placeholder='Search for anything'
				/>

				<button className={styles.searchButton}>
					<IoSearch
						className={styles.searchButtonIcon}
						fill='#ffffff'
					/>
				</button>
			</div>

			<div className={styles.rightItems}>
				<p>Docs</p>

				<TfiBell
					size={26}
					fill='#213F7D'
				/>

				<div className={styles.avatarContainer}>
					<Avatar
						src={user}
						fallback='U'
						className={styles.avatar}
					/>
					<p className={styles.avatarName}>Adedeji</p>
					<FaCaretDown className={styles.avatarIcon} />
				</div>
			</div>
		</header>
	);
};

export default Header;
