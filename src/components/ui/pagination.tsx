import type { ReactNode } from "react";

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageClick: (page: number) => void;
	pageButtonClass: string;
	activePageClass: string;
	ellipsisClass: string;
	maxVisiblePages?: number;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageClick,
	pageButtonClass,
	activePageClass,
	ellipsisClass,
	maxVisiblePages = 7,
}: PaginationProps): ReactNode[] {
	const pages: ReactNode[] = [];

	if (totalPages <= maxVisiblePages) {
		for (let i = 0; i < totalPages; i++) {
			pages.push(
				<button
					key={i}
					className={currentPage === i ? activePageClass : pageButtonClass}
					onClick={() => onPageClick(i)}>
					{i + 1}
				</button>,
			);
		}
	} else {
		const showEllipsisStart = currentPage > 3;
		const showEllipsisEnd = currentPage < totalPages - 4;

		pages.push(
			<button
				key={0}
				className={currentPage === 0 ? activePageClass : pageButtonClass}
				onClick={() => onPageClick(0)}>
				1
			</button>,
		);

		if (showEllipsisStart) {
			pages.push(
				<span
					key='start-ellipsis'
					className={ellipsisClass}>
					...
				</span>,
			);
		}

		let startPage = Math.max(1, currentPage - 1);
		let endPage = Math.min(totalPages - 2, currentPage + 1);

		if (currentPage <= 3) {
			startPage = 1;
			endPage = Math.min(totalPages - 2, 5);
		}

		if (currentPage >= totalPages - 4) {
			startPage = Math.max(1, totalPages - 6);
			endPage = totalPages - 2;
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(
				<button
					key={i}
					className={currentPage === i ? activePageClass : pageButtonClass}
					onClick={() => onPageClick(i)}>
					{i + 1}
				</button>,
			);
		}

		if (showEllipsisEnd) {
			pages.push(
				<span
					key='end-ellipsis'
					className={ellipsisClass}>
					...
				</span>,
			);
		}

		if (totalPages > 1) {
			pages.push(
				<button
					key={totalPages - 1}
					className={
						currentPage === totalPages - 1 ? activePageClass : pageButtonClass
					}
					onClick={() => onPageClick(totalPages - 1)}>
					{totalPages}
				</button>,
			);
		}
	}

	return pages;
}
