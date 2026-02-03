import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUser } from "../typings";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/" }),
	endpoints: (builder) => ({
		getUsers: builder.query<IUser[], void>({
			query: () => "api/users.json",
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
