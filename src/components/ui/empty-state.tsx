import styles from "@/styles/emptyState.module.scss";

interface EmptyStateProps {
	title: string;
	description: string;
	actionLabel?: string;
	onAction?: () => void;
	icon?: React.ReactNode;
}

export const EmptyState = ({
	title,
	description,
	actionLabel,
	onAction,
	icon,
}: EmptyStateProps) => {
	return (
		<div className={styles.emptyState}>
			{icon && <div className={styles.icon}>{icon}</div>}

			<div className={styles.content}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.description}>{description}</p>

				{actionLabel && onAction && (
					<button
						className={styles.actionButton}
						onClick={onAction}>
						{actionLabel}
					</button>
				)}
			</div>
		</div>
	);
};
