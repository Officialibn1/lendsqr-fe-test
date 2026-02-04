import { useParams, Link } from "react-router";
import { useGetUserByIdQuery } from "../services/userApi";
import { Skeleton } from "@radix-ui/themes";
import styles from "@/styles/userDetails.module.scss";
import back from "@/assets/svg-icons/back.svg";
import starFill from "@/assets/svg-icons/star-fill.svg";
import starOutline from "@/assets/svg-icons/star-outline.svg";

const UserDetailsPage = () => {
	const { id } = useParams();
	const { data: user, isLoading, error } = useGetUserByIdQuery(id || "");

	if (isLoading)
		return (
			<Skeleton
				className={styles.infoCard}
				style={{ height: "80vh" }}
			/>
		);

	if (error || !user) return <div>User not found</div>;

	return (
		<main className={styles.section}>
			<Link
				to='/dashboard'
				className={styles.backLink}>
				<img
					src={back}
					className={styles.backLinkIcon}
				/>{" "}
				Back to Users
			</Link>

			<div className={styles.userDetailsHeader}>
				<div className={styles.topActions}>
					<h2>User Details</h2>
					<div className={styles.actionButtons}>
						<button className={styles.blacklistBtn}>Blacklist User</button>
						<button className={styles.activateBtn}>Activate User</button>
					</div>
				</div>
			</div>

			<header className={styles.header}>
				<div className={styles.profileInfoContainer}>
					<div className={styles.avatarAndName}>
						<div className={styles.avaterContiner}>
							<img src={user.profile.avatar} />
						</div>

						<div>
							<h1>{`${user.firstName} ${user.lastName}`}</h1>

							<p>{user.lendqsrId}</p>
						</div>
					</div>

					<div className={styles.verticalLine} />

					<div className={styles.userTier}>
						<h1>User Tier</h1>

						<div>
							{user.tier === 1 ? (
								<>
									<img src={starFill} />
									<img src={starOutline} />
									<img src={starOutline} />
								</>
							) : user.tier === 2 ? (
								<>
									<img src={starFill} />
									<img src={starFill} />
									<img src={starOutline} />
								</>
							) : (
								<>
									<img src={starFill} />
									<img src={starFill} />
									<img src={starFill} />
								</>
							)}
						</div>
					</div>

					<div className={styles.verticalLine} />

					<div className={styles.accountDetails}>
						<h1>₦{user.accountBalance}</h1>

						<p>
							{user.accountNumber}/{user.bankName}
						</p>
					</div>
				</div>

				<div className={styles.tabLinksContainer}>
					<div className={styles.tabLinks}>
						<Link
							to={"#"}
							className={styles.active}>
							General Details
						</Link>

						<Link to={"#"}>Documents</Link>

						<Link to={"#"}>Bank Details</Link>

						<Link to={"#"}>Loans</Link>

						<Link to={"#"}>Savings</Link>

						<Link to={"#"}>App and System</Link>
					</div>
				</div>
			</header>

			<div className={styles.infoCard}>
				<section className={styles.infoSection}>
					<h4>Personal Information</h4>
					<div className={styles.infoGrid}>
						<div className={styles.infoGroup}>
							<label>Full Name</label>
							<p>
								{user.profile.firstName} {user.profile.lastName}
							</p>
						</div>
						<div className={styles.infoGroup}>
							<label>Phone Number</label>
							<p>{user.phoneNumber}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Email Address</label>
							<p>{user.email}</p>
						</div>
						<div className={styles.infoGroup}>
							<label>BVN</label>
							<p>{user.profile.bvn}</p>
						</div>
						<div className={styles.infoGroup}>
							<label>Gender</label>
							<p>{user.profile.gender}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Marital Status</label>
							<p>{user.profile.maritalStatus}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Children</label>
							<p>{user.profile.children}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Type of Residence</label>
							<p>{user.profile.typeOfResidence}</p>
						</div>
					</div>
				</section>

				<section className={styles.infoSection}>
					<h4>Education and Employment</h4>
					<div className={styles.infoGrid2}>
						<div className={styles.infoGroup}>
							<label>Level of Education</label>
							<p>{user.education.level}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Employment Status</label>
							<p>{user.education.employmentStatus}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Sector of Employment</label>
							<p>{user.education.sector}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Duration of Employment</label>
							<p>{user.education.duration}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Official Email</label>
							<p>{user.education.officeEmail}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Monthly Income</label>
							<p>
								₦{user.education.monthlyIncome[0].toLocaleString()} - ₦
								{user.education.monthlyIncome[1].toLocaleString()}
							</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Loan Repayment</label>
							<p>{user.education.loanRepayment}</p>
						</div>
					</div>
				</section>

				<section className={styles.infoSection}>
					<h4>Socials</h4>
					<div className={styles.infoGrid2}>
						<div className={styles.infoGroup}>
							<label>Twitter</label>
							<p>{user.socials.twitter}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Facebook</label>
							<p>{user.socials.facebook}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Instagram</label>
							<p>{user.socials.instagram}</p>
						</div>
					</div>
				</section>

				<section className={styles.infoSection}>
					<h4>Guarantor</h4>
					<div className={styles.infoGrid2}>
						<div className={styles.infoGroup}>
							<label>Full Name</label>
							<p>{`${user.guarantor.firstName} ${user.guarantor.lastName}`}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Phone Number</label>
							<p>{user.guarantor.phoneNumber}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Email Address</label>
							<p>{user.guarantor.emailAddress}</p>
						</div>

						<div className={styles.infoGroup}>
							<label>Relationship</label>
							<p>{user.guarantor.relationship}</p>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
};

export default UserDetailsPage;
