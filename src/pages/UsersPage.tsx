import { Button, Card, Skeleton } from "@radix-ui/themes";
import { useGetUsersQuery } from "../services/userApi";
import type { FilterParams } from "../services/userApi";
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
import { useState, lazy, Suspense } from "react";
import { userColumns } from "../components/table-columns/usersTable";
import { IoFilterSharp } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useDebounce } from "use-debounce";
import { Pagination } from "../components/ui/pagination";
import { EmptyState } from "../components/ui/empty-state";
import { HiOutlineUserGroup } from "react-icons/hi2";

const FilterDropdown = lazy(() =>
	import("../components/ui/filter-dropdown").then((module) => ({
		default: module.FilterDropdown,
	})),
);

const UsersPage = () => {
	"use no memo";
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
	const [filters, setFilters] = useState<FilterParams>({});
	const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
	const [sorting, setSorting] = useState<SortingState>([]);

	const combinedFilters: FilterParams = {
		...filters,
		searchTerm: debouncedSearchTerm,
	};

	const { data, isLoading, error, refetch } = useGetUsersQuery(combinedFilters);

	const handleApplyFilters = (newFilters: FilterParams) => {
		setFilters(newFilters);
	};

	const handleCloseFilterDropdown = () => {
		setIsFilterDropdownOpen(false);
	};

	const hasActiveFilters = () => {
		return (
			debouncedSearchTerm.trim() !== "" ||
			(filters.organization && filters.organization !== "") ||
			(filters.status && filters.status !== "") ||
			(filters.date && filters.date !== "") ||
			(filters.username && filters.username.trim() !== "") ||
			(filters.email && filters.email.trim() !== "") ||
			(filters.phoneNumber && filters.phoneNumber.trim() !== "")
		);
	};

	const handleResetAllFilters = () => {
		setSearchTerm("");
		setFilters({});
		setIsFilterDropdownOpen(false);
	};

	// eslint-disable-next-line react-hooks/incompatible-library
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
				<div className={styles.searchAndFilterContainer}>
					<button
						className={styles.filterButton}
						onClick={() => setIsFilterDropdownOpen(true)}>
						Filters{" "}
						<CiFilter
							stroke='#ffffff'
							strokeWidth={1}
						/>
					</button>

					<Suspense fallback={<div>Loading filters...</div>}>
						<FilterDropdown
							isOpen={isFilterDropdownOpen}
							onClose={handleCloseFilterDropdown}
							onApplyFilters={handleApplyFilters}
							currentFilters={filters}
						/>
					</Suspense>

					<input
						className={styles.searchField}
						type='search'
						placeholder='Search users by name, email, organization or phone number'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<div className={styles.tableContainer}>
					{data.length === 0 ? (
						<EmptyState
							icon={<HiOutlineUserGroup />}
							title='No users found'
							description={
								hasActiveFilters()
									? "No users match your current filters. Try adjusting your search criteria or clear all filters to see all users."
									: "There are no users to display at the moment."
							}
							actionLabel={hasActiveFilters() ? "Clear All Filters" : undefined}
							onAction={hasActiveFilters() ? handleResetAllFilters : undefined}
						/>
					) : (
						<>
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
										<Pagination
											currentPage={table.getState().pagination.pageIndex}
											totalPages={table.getPageCount()}
											onPageClick={(page) => table.setPageIndex(page)}
											pageButtonClass={styles.pageBtn}
											activePageClass={styles.activePage}
											ellipsisClass={styles.ellipsis}
										/>
									</div>

									<button
										onClick={() => table.nextPage()}
										disabled={!table.getCanNextPage()}
										className={styles.pagBtn}>
										<FaChevronRight size={16} />
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default UsersPage;
