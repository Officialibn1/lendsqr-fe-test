import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUser } from "../typings";

export interface FilterParams {
	searchTerm?: string;
	organization?: string;
	status?: string;
	date?: string;
	username?: string;
	email?: string;
	phoneNumber?: string;
}

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/" }),
	endpoints: (builder) => ({
		getUsers: builder.query<IUser[], FilterParams>({
			query: () => "api/users.json",
			transformResponse: (response: IUser[], _, filters = {}) => {
				let filteredUsers = [...response];

				if (filters.searchTerm && filters.searchTerm.trim() !== "") {
					const lowercaseSearchTerm = filters.searchTerm.toLowerCase();
					filteredUsers = filteredUsers.filter((user) => {
						return (
							user.firstName.toLowerCase().includes(lowercaseSearchTerm) ||
							user.lastName.toLowerCase().includes(lowercaseSearchTerm) ||
							user.email.toLowerCase().includes(lowercaseSearchTerm) ||
							user.orgName.toLowerCase().includes(lowercaseSearchTerm) ||
							user.phoneNumber.includes(filters.searchTerm!) ||
							`${user.firstName} ${user.lastName}`
								.toLowerCase()
								.includes(lowercaseSearchTerm)
						);
					});
				}

				if (filters.organization && filters.organization !== "") {
					filteredUsers = filteredUsers.filter(
						(user) => user.orgName === filters.organization,
					);
				}

				if (filters.status && filters.status !== "") {
					filteredUsers = filteredUsers.filter(
						(user) => user.status === filters.status,
					);
				}

				if (filters.username && filters.username.trim() !== "") {
					const lowercaseUsername = filters.username.toLowerCase();
					filteredUsers = filteredUsers.filter((user) =>
						`${user.firstName} ${user.lastName}`
							.toLowerCase()
							.includes(lowercaseUsername),
					);
				}

				if (filters.email && filters.email.trim() !== "") {
					const lowercaseEmail = filters.email.toLowerCase();
					filteredUsers = filteredUsers.filter((user) =>
						user.email.toLowerCase().includes(lowercaseEmail),
					);
				}

				// Phone number filter
				if (filters.phoneNumber && filters.phoneNumber.trim() !== "") {
					filteredUsers = filteredUsers.filter((user) =>
						user.phoneNumber.includes(filters.phoneNumber!),
					);
				}

				if (filters.date && filters.date.trim() !== "") {
					const filterDate = new Date(filters.date);
					filteredUsers = filteredUsers.filter((user) => {
						const userDate = new Date(user.createdAt);

						return (
							userDate.getFullYear() === filterDate.getFullYear() &&
							userDate.getMonth() === filterDate.getMonth() &&
							userDate.getDate() === filterDate.getDate()
						);
					});
				}

				return filteredUsers;
			},
		}),
		getOrganizations: builder.query<string[], void>({
			query: () => "api/users.json",
			transformResponse: (response: IUser[]) => {
				const organizations = [
					...new Set(response.map((user) => user.orgName)),
				];
				return organizations.sort();
			},
		}),
		getUserById: builder.query<IUser, string>({
			query: () => "api/users.json",
			transformResponse: (response: IUser[], _, arg) => {
				return response.find((user) => user.id === arg) as IUser;
			},
		}),
	}),
});

export const {
	useGetUsersQuery,
	useGetOrganizationsQuery,
	useGetUserByIdQuery,
} = userApi;
