import { z } from "zod";

const loginFormSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(8, "Password must at least 8 characters."),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export default loginFormSchema;
