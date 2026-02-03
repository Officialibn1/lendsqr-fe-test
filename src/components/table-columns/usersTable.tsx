import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import type { IUser } from "../../typings";
import { FaEllipsisVertical } from "react-icons/fa6";
import { DropdownMenu } from "@radix-ui/themes";
import eye from "@/assets/svg-icons/eye.svg";
import blacklist from "@/assets/svg-icons/blacklist.svg";
import userCheck from "@/assets/svg-icons/user-check-1.svg";
import styles from "@/styles/usersPage.module.scss";

import { Link } from "react-router";

const columnHelper = createColumnHelper<IUser>();

export const userColumns = [
	columnHelper.accessor("orgName", {
		header: "ORGANIZATION",
		cell: (info) => info.getValue(),
		enableSorting: true,
	}),
	columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
		id: "userName",
		header: "USERNAME",
		cell: (info) => info.getValue(),
		enableSorting: true,
	}),
	columnHelper.accessor("email", {
		header: "EMAIL",
		cell: (info) => info.getValue(),
		enableSorting: true,
	}),
	columnHelper.accessor("phoneNumber", {
		header: "PHONE NUMBER",
		cell: (info) => info.getValue(),
		enableSorting: true,
	}),
	columnHelper.accessor("createdAt", {
		header: "DATE JOINED",
		cell: (info) => format(new Date(info.getValue()), "MMM d, yyyy h:mm a"),
		enableSorting: true,
	}),
	columnHelper.accessor("status", {
		header: "STATUS",
		cell: (info) => {
			const status = info.getValue();
			const statusStyles: Record<string, string> = {
				Active: styles.statusActive,
				Inactive: styles.statusInactive,
				Pending: styles.statusPending,
				Blacklisted: styles.statusBlacklisted,
			};

			return (
				<span className={`${styles.statusBadge} ${statusStyles[status]}`}>
					{status}
				</span>
			);
		},
		enableSorting: true,
	}),
	columnHelper.accessor("id", {
		id: "actions",
		header: () => <span style={{ opacity: 0 }}>Actions</span>,
		cell: (info) => (
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<button className={styles.actionBtn}>
						<FaEllipsisVertical size={16} />
					</button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Content className={styles.dropDownContent}>
					<Link
						to={`/dashboard/${info.getValue()}`}
						className={styles.dropDownItemLink}>
						<DropdownMenu.Item className={styles.dropDownItem}>
							<img
								src={eye}
								className={styles.dropDownItemIcon}
							/>
							<span>View Details</span>
						</DropdownMenu.Item>
					</Link>

					<DropdownMenu.Item className={styles.dropDownItem}>
						<img
							src={blacklist}
							className={styles.dropDownItemIcon}
						/>
						<span>Blacklist User</span>
					</DropdownMenu.Item>

					<DropdownMenu.Item className={styles.dropDownItem}>
						<img
							src={userCheck}
							className={styles.dropDownItemIcon}
						/>
						<span>Activate User</span>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		),
	}),
];
