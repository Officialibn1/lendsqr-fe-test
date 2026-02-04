import { useState, useRef, useEffect } from "react";
import { useGetOrganizationsQuery } from "../../services/userApi";
import type { FilterParams } from "../../services/userApi";
import styles from "@/styles/filterDropdown.module.scss";

interface FilterDropdownProps {
	isOpen: boolean;
	onClose: () => void;
	onApplyFilters: (filters: FilterParams) => void;
	currentFilters: FilterParams;
}

const statusOptions = ["Active", "Inactive", "Pending", "Blacklisted"];

export const FilterDropdown = ({
	isOpen,
	onClose,
	onApplyFilters,
	currentFilters,
}: FilterDropdownProps) => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { data: organizations = [] } = useGetOrganizationsQuery();

	const [filters, setFilters] = useState<FilterParams>(currentFilters);

	useEffect(() => {
		setFilters(currentFilters);
	}, [currentFilters]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	const handleInputChange = (field: keyof FilterParams, value: string) => {
		setFilters((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleApplyFilters = () => {
		onApplyFilters(filters);
		onClose();
	};

	const handleReset = () => {
		const resetFilters: FilterParams = {};
		setFilters(resetFilters);
		onApplyFilters(resetFilters);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div
			className={styles.dropdown}
			ref={dropdownRef}>
			<div className={styles.filterGroup}>
				<label className={styles.label}>Organization</label>
				<select
					className={styles.select}
					value={filters.organization || ""}
					onChange={(e) => handleInputChange("organization", e.target.value)}>
					<option value=''>Select</option>
					{organizations.map((org) => (
						<option
							key={org}
							value={org}>
							{org}
						</option>
					))}
				</select>
			</div>

			<div className={styles.filterGroup}>
				<label className={styles.label}>Username</label>
				<input
					type='text'
					className={styles.input}
					placeholder='User'
					value={filters.username || ""}
					onChange={(e) => handleInputChange("username", e.target.value)}
				/>
			</div>

			<div className={styles.filterGroup}>
				<label className={styles.label}>Email</label>
				<input
					type='email'
					className={styles.input}
					placeholder='Email'
					value={filters.email || ""}
					onChange={(e) => handleInputChange("email", e.target.value)}
				/>
			</div>

			<div className={styles.filterGroup}>
				<label className={styles.label}>Date</label>
				<input
					type='date'
					className={styles.input}
					value={filters.date || ""}
					onChange={(e) => handleInputChange("date", e.target.value)}
				/>
			</div>

			<div className={styles.filterGroup}>
				<label className={styles.label}>Phone Number</label>
				<input
					type='tel'
					className={styles.input}
					placeholder='Phone Number'
					value={filters.phoneNumber || ""}
					onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
				/>
			</div>

			<div className={styles.filterGroup}>
				<label className={styles.label}>Status</label>
				<select
					className={styles.select}
					value={filters.status || ""}
					onChange={(e) => handleInputChange("status", e.target.value)}>
					<option value=''>Select</option>
					{statusOptions.map((status) => (
						<option
							key={status}
							value={status}>
							{status}
						</option>
					))}
				</select>
			</div>

			<div className={styles.buttonGroup}>
				<button
					className={styles.resetButton}
					onClick={handleReset}>
					Reset
				</button>
				<button
					className={styles.filterButton}
					onClick={handleApplyFilters}>
					Filter
				</button>
			</div>
		</div>
	);
};
