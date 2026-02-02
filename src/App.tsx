// import reactLogo from "./assets/react.svg";
import lendSqrLogo from "./assets/lendqsr-logo.svg";
import signInImage from "./assets/pablo-sign-in.svg";
import "./App.css";
import "@radix-ui/themes/styles.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "@/styles/app.module.scss";
import loginFormSchema, {
	type LoginFormData,
} from "./components/schemas/loginSchema";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";

function App() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
	});

	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = async (data: LoginFormData) => {
		console.log("Form Data:", data);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		toast.success("Login Successful!");

		navigate("/dashboard");
	};
	return (
		<section className={styles.signinPage}>
			<div className={styles.imageSectionContainer}>
				<img
					src={lendSqrLogo}
					className={styles.logo}
				/>

				<img
					src={signInImage}
					className={styles.signInImage}
				/>
			</div>

			<div className={styles.signinFormContainer}>
				<img
					src={lendSqrLogo}
					className={styles.mobileLogo}
				/>
				<div className={styles.titleContainer}>
					<h1 className={styles.title}>Welcome.</h1>

					<p className={styles.description}>Enter details to login.</p>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.form}>
					{/* Email Field */}
					<div className={styles.fieldGroup}>
						<input
							{...register("email")}
							className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
							type='email'
							id='email'
							placeholder='Email'
						/>
						{errors.email && (
							<span className={styles.errorText}>{errors.email.message}</span>
						)}
					</div>

					{/* Password Field */}
					<div className={styles.fieldGroup}>
						<input
							{...register("password")}
							className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
							type={showPassword ? "text" : "password"}
							id='password'
							placeholder='Password'
						/>

						<div
							className={styles.showHidePassword}
							onClick={() => setShowPassword((prev) => !prev)}>
							<span>{showPassword ? "HIDE" : "SHOW"}</span>
						</div>

						{errors.password && (
							<span className={styles.errorText}>
								{errors.password.message}
							</span>
						)}
					</div>

					<Link
						to={"/"}
						className={styles.forgotPassword}>
						FORGOT PASSWORD?
					</Link>

					<button
						type='submit'
						className={styles.submitBtn}
						disabled={isSubmitting}>
						{isSubmitting ? "LOGGING IN..." : "LOG IN"}
					</button>
				</form>
			</div>
		</section>
	);
}

export default App;
