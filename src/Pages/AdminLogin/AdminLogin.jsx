import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoggedInUserMutation } from "../../redux/features/baseApi";

const AdminLogin = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loggedInUser, { isLoading }] = useLoggedInUserMutation();
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false); // Local state for submission
	const [loginError, setLoginError] = useState(null); // For error handling

	const onSubmit = async (data) => {
		setIsSubmitting(true); // Start loading
		setLoginError(null); // Reset error
		const { email, password } = data;
		const userData = { email, password, role: "admin" };

		try {
			const response = await loggedInUser(userData).unwrap();
			localStorage.setItem("access_token", response?.access_token);
			localStorage.setItem("refresh_token", response?.refresh_token);
			console.log("admin res", response);

			setTimeout(() => {
				setIsSubmitting(false); // Stop loading
				navigate("/admin"); // Navigate to admin route
			}, 1000);
		} catch (error) {
			console.log("error admin login", error);
			setIsSubmitting(false); // Stop loading on error
			setLoginError("Invalid email or password. Please try again.");
		}
	};

	return (
		<section className="min-h-screen">
			<div className="flex items-center">
				<div className="basis-6/12 bg-[#0A3161] h-screen flex flex-col items-center justify-center">
					<img
						src="https://i.ibb.co.com/RZzJHnG/Group-2147225243.png"
						alt="logo"
					/>
				</div>

				<div className="basis-8/12 h-screen flex flex-col justify-center items-center bg-white">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="text-[#0A3161] md:p-8 rounded-lg w-full md:max-w-lg"
					>
						<h2 className="md:text-4xl text-3xl font-bold mb-10 text-start">
							Login
						</h2>

						{/* Error Message */}
						{loginError && (
							<p className="text-red-500 text-sm mb-4">
								{loginError}
							</p>
						)}

						{/* Email */}
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-sm font-semibold"
							>
								Your Email
							</label>
							<input
								type="email"
								id="email"
								className="w-full p-3 border bg-white border-gray-300 rounded-lg mt-2"
								placeholder="Enter Email"
								{...register("email", {
									required: "Email is required",
								})}
							/>
							{errors.email && (
								<p className="text-red-500 text-xs">
									{errors.email.message}
								</p>
							)}
						</div>

						{/* Password */}
						<div className="mb-6">
							<label
								htmlFor="password"
								className="block text-sm font-semibold"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								className="w-full p-3 border bg-white border-gray-300 rounded-lg mt-2"
								placeholder="Enter Password"
								{...register("password", {
									required: "Password is required",
								})}
							/>
							{errors.password && (
								<p className="text-red-500 text-xs">
									{errors.password.message}
								</p>
							)}
						</div>

						{/* Hidden Role Field */}
						<input
							type="hidden"
							{...register("role")}
							value="admin"
						/>

						{/* Forgot Password */}
						<div className="flex justify-end hover:underline items-center mb-4">
							<Link
								to="/recovery"
								className="text-sm text-[#B31942] font-medium"
							>
								Forgot Password?
							</Link>
						</div>

						{/* Submit Button with Loading State */}
						<button
							type="submit"
							className="w-full p-3 bg-[#B31942] text-white rounded-lg font-semibold hover:bg-[#af2a4d] transition flex items-center justify-center"
							disabled={isSubmitting || isLoading} // Disable during submission
						>
							{isSubmitting || isLoading ? (
								<span className="loading loading-bars loading-md"></span>
							) : (
								"Login"
							)}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default AdminLogin;
