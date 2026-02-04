import { Button, Card, Skeleton } from "@radix-ui/themes";
import { useGetUsersQuery } from "../services/userApi";
import styles from "@/styles/usersPage.module.scss";
import users from "@/assets/svg-icons/users-card.svg";
import activeUsers from "@/assets/svg-icons/crowd-card.svg";
import loan from "@/assets/svg-icons/loan-card.svg";
import savings from "@/assets/svg-icons/savings-card.svg";
import { CiFilter } from "react-icons/ci";
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	flexRender,
	type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { userColumns } from "../components/table-columns/usersTable";
import { IoFilterSharp } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useDebounce } from "use-debounce";

const UsersPage = () => {
	"use no memo";
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
	const { data, isLoading, error, refetch } =
		useGetUsersQuery(debouncedSearchTerm);
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data: data || [],
		columns: userColumns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 50,
			},
		},
	});

	if (isLoading) {
		return (
			<section className={styles.section}>
				<div className={styles.cardsContainer}>
					{[1, 2, 3, 4].map((n) => (
						<Skeleton
							className={styles.card}
							key={n}
						/>
					))}
				</div>

				<div className={styles.mainContent}>
					<Skeleton className={styles.searchAndFilterContainer} />

					<Skeleton className={styles.tableContainer} />
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className={styles.section}>
				<Card className={styles.errorCard}>
					<h3>Failed to fetch users!!</h3>

					<h1>Ooopss, something went wrong..</h1>

					<Button onClick={() => refetch()}>Retry</Button>
				</Card>
			</section>
		);
	}

	if (!data) {
		return null;
	}

	return (
		<section className={styles.section}>
			<div className={styles.cardsContainer}>
				<div className={styles.card}>
					<div className={styles.usersIcon}>
						<img
							className={styles.cardIcon}
							src={users}
						/>
					</div>

					<h3 className={styles.cardTitle}>USERS</h3>

					<h1 className={styles.cardValue}>{data.length}</h1>
				</div>

				<div className={styles.card}>
					<div className={styles.activeUsersIcon}>
						<img
							className={styles.cardIcon}
							src={activeUsers}
						/>
					</div>

					<h3 className={styles.cardTitle}>ACTIVE USERS</h3>

					<h1 className={styles.cardValue}>
						{data.filter((u) => u.status === "Active").length}
					</h1>
				</div>

				<div className={styles.card}>
					<div className={styles.loadUsersIcon}>
						<img
							className={styles.cardIcon}
							src={loan}
						/>
					</div>

					<h3 className={styles.cardTitle}>Users with Loans</h3>

					<h1 className={styles.cardValue}>
						{data.filter((u) => u.education.loanRepayment > 0).length}
					</h1>
				</div>

				<div className={styles.card}>
					<div className={styles.savingsUsersIcon}>
						<img
							className={styles.cardIcon}
							src={savings}
						/>
					</div>

					<h3 className={styles.cardTitle}>Users with Savings</h3>

					<h1 className={styles.cardValue}>
						{data.filter((u) => u.accountBalance > 0).length}
					</h1>
				</div>
			</div>

			<div className={styles.mainContent}>
				{/* <Button onClick={() => refetch()}>Retry</Button> */}
				<div className={styles.searchAndFilterContainer}>
					<button className={styles.filterButton}>
						Filters{" "}
						<CiFilter
							stroke='#ffffff'
							strokeWidth={1}
						/>
					</button>

					<input
						className={styles.searchField}
						type='search'
						placeholder='Search users by name, email, organization or phone number'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<div className={styles.tableContainer}>
					<div className={styles.tableWrapper}>
						<table>
							<thead>
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<th key={header.id}>
												<div
													className={styles.headerContent}
													onClick={header.column.getToggleSortingHandler()}>
													{flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}

													{header.id !== "actions" && (
														<IoFilterSharp className={styles.filterIcon} />
													)}
												</div>
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody>
								{table.getRowModel().rows.map((row) => (
									<tr key={row.id}>
										{row.getVisibleCells().map((cell) => (
											<td key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className={styles.paginationFooter}>
						<div className={styles.pageSizeSelector}>
							<span>Showing</span>
							<select
								value={table.getState().pagination.pageSize}
								onChange={(e) => table.setPageSize(Number(e.target.value))}>
								{[50, 100, 150, 200, 300].map((size) => (
									<option
										key={size}
										value={size}>
										{size}
									</option>
								))}
							</select>
							<span>out of {data.length}</span>
						</div>

						<div className={styles.paginationControls}>
							<button
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
								className={styles.pagBtn}>
								<FaChevronLeft size={16} />
							</button>

							<div className={styles.pageNumbers}>
								{(() => {
									const currentPage = table.getState().pagination.pageIndex;
									const totalPages = table.getPageCount();
									const pages = [];

									if (totalPages <= 7) {
										// Show all pages if 7 or fewer
										for (let i = 0; i < totalPages; i++) {
											pages.push(
												<button
													key={i}
													className={
														currentPage === i
															? styles.activePage
															: styles.pageBtn
													}
													onClick={() => table.setPageIndex(i)}>
													{i + 1}
												</button>,
											);
										}
									} else {
										// Always show first page
										pages.push(
											<button
												key={0}
												className={
													currentPage === 0 ? styles.activePage : styles.pageBtn
												}
												onClick={() => table.setPageIndex(0)}>
												1
											</button>,
										);

										// Show ellipsis if current page is far from start
										if (currentPage > 3) {
											pages.push(
												<span
													key='start-ellipsis'
													className={styles.ellipsis}>
													...
												</span>,
											);
										}

										// Show pages around current page
										const startPage = Math.max(
											1,
											Math.min(currentPage - 1, totalPages - 5),
										);
										const endPage = Math.min(
											totalPages - 1,
											Math.max(currentPage + 1, 5),
										);

										for (let i = startPage; i < endPage; i++) {
											if (i !== 0 && i !== totalPages - 1) {
												pages.push(
													<button
														key={i}
														className={
															currentPage === i
																? styles.activePage
																: styles.pageBtn
														}
														onClick={() => table.setPageIndex(i)}>
														{i + 1}
													</button>,
												);
											}
										}

										// Show ellipsis if current page is far from end
										if (currentPage < totalPages - 4) {
											pages.push(
												<span
													key='end-ellipsis'
													className={styles.ellipsis}>
													...
												</span>,
											);
										}

										// Always show last page
										if (totalPages > 1) {
											pages.push(
												<button
													key={totalPages - 1}
													className={
														currentPage === totalPages - 1
															? styles.activePage
															: styles.pageBtn
													}
													onClick={() => table.setPageIndex(totalPages - 1)}>
													{totalPages}
												</button>,
											);
										}
									}

									return pages;
								})()}
							</div>

							<button
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
								className={styles.pagBtn}>
								<FaChevronRight size={16} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default UsersPage;
