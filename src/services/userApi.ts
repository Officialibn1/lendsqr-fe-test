import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUser } from "../typings";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/" }),
	endpoints: (builder) => ({
		getUsers: builder.query<IUser[], string | undefined>({
			query: () => "api/users.json",
			transformResponse: (response: IUser[], _, searchTerm) => {
				if (!searchTerm || searchTerm.trim() === "") {
					return response;
				}

				const lowercaseSearchTerm = searchTerm.toLowerCase();

				return response.filter((user) => {
					return (
						user.firstName.toLowerCase().includes(lowercaseSearchTerm) ||
						user.lastName.toLowerCase().includes(lowercaseSearchTerm) ||
						user.email.toLowerCase().includes(lowercaseSearchTerm) ||
						user.orgName.toLowerCase().includes(lowercaseSearchTerm) ||
						user.phoneNumber.includes(searchTerm) ||
						`${user.firstName} ${user.lastName}`
							.toLowerCase()
							.includes(lowercaseSearchTerm)
					);
				});
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

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;
