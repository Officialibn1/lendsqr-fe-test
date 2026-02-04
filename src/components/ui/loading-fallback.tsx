import styles from "@/styles/loading-fallback.module.scss";

const LoadingFallback = () => (
	<div className={styles.container}>
		{/* <!-- From Uiverse.io by mrpumps31232 -->  */}
		<div className={styles.loadingWave}>
			<div className={styles.loadingBar}></div>
			<div className={styles.loadingBar}></div>
			<div className={styles.loadingBar}></div>
			<div className={styles.loadingBar}></div>
		</div>
	</div>
);

export default LoadingFallback;
