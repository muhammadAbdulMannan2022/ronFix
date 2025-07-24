import { useForm } from "react-hook-form";
import {
	CheckCircle,
	Mail,
	Phone,
	User,
	MessageSquare,
	Send,
	Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			message: "",
		},
	});

	const onSubmit = async (data) => {
		setIsLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			console.log("Form Submitted:", data);
			setIsSubmitted(true);
			setTimeout(() => {
				reset();
				setIsSubmitted(false);
			}, 3000);
		} catch (error) {
			console.error("Submission error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const formVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	const imageVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
	};

	if (isSubmitted) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md"
				>
					<div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
						<CheckCircle className="text-green-600 w-8 h-8" />
					</div>
					<h3 className="text-2xl font-bold mt-4">Thank You!</h3>
					<p className="text-gray-600 mt-2 text-sm">
						Your message is on its way! We'll reach out within 24
						hours.
					</p>
				</motion.div>
			</div>
		);
	}

	return (
		<div
			id="contact_us"
			className="md:min-h-[80vh] bg-blue-50 py-20 md:px-4 flex items-center justify-center"
			style={{
				backgroundImage:
					'url("https://i.ibb.co/0pWC3fzm/Group-2147226355.png")',
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="container mx-auto">
				<motion.div
					variants={formVariants}
					initial="hidden"
					animate="visible"
					className="text-center mb-8"
				>
					<h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#16437E] text-center md:text-start">
						get in touch today
					</h1>
					<p className="text-gray-600 text-sm pt-5 md:text-base md:w-2/4 text-center md:text-start">
						Reach out to us with your questions, concerns, or
						inquiries. We're here to help and look forward to
						connecting!
					</p>
				</motion.div>
				<div className="grid md:grid-cols-2 gap-6 md:gap-8">
					<motion.form
						variants={formVariants}
						initial="hidden"
						animate="visible"
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-5 bg-white p-6 rounded-none shadow-md w-full"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mt-8 mt-0">
							<div>
								<label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
									<User className="w-4 h-4" /> First Name
								</label>
								<input
									{...register("first_name", {
										required:
											"Please enter your first name",
									})}
									className={`w-full p-2 text-sm bg-white text-[#003794] border rounded ${errors.first_name ? "border-red-400" : "border-gray-300"}`}
									placeholder="Your first name"
								/>
								{errors.first_name && (
									<p className="text-xs text-red-500 mt-1">
										{errors.first_name.message}
									</p>
								)}
							</div>
							<div>
								<label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
									<User className="w-4 h-4" /> Last Name
								</label>
								<input
									{...register("last_name", {
										required: "Please enter your last name",
									})}
									className={`w-full p-2 text-sm bg-white text-[#003794] border rounded ${errors.last_name ? "border-red-400" : "border-gray-300"}`}
									placeholder="Your last name"
								/>
								{errors.last_name && (
									<p className="text-xs text-red-500 mt-1">
										{errors.last_name.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
								<Mail className="w-4 h-4" /> Email
							</label>
							<input
								type="email"
								{...register("email", {
									required: "We need your email to reach you",
									pattern: {
										value: /^\S+@\S+\.\S+$/,
										message:
											"Please use a valid email address",
									},
								})}
								className={`w-full p-2 text-sm border bg-white text-[#003794] rounded ${errors.email ? "border-red-400" : "border-gray-300"}`}
								placeholder="Your email address"
							/>
							{errors.email && (
								<p className="text-xs text-red-500 mt-1">
									{errors.email.message}
								</p>
							)}
						</div>

						<div>
							<label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
								<Phone className="w-4 h-4" /> Phone
							</label>
							<input
								type="tel"
								{...register("phone", {
									required: "Please provide a phone number",
								})}
								className={`w-full p-2 text-sm border bg-white text-[#003794] rounded ${errors.phone ? "border-red-400" : "border-gray-300"}`}
								placeholder="Your phone number"
							/>
							{errors.phone && (
								<p className="text-xs text-red-500 mt-1">
									{errors.phone.message}
								</p>
							)}
						</div>

						<div>
							<label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
								<MessageSquare className="w-4 h-4" /> Message
							</label>
							<textarea
								{...register("message", {
									required: "Let us know how we can help",
								})}
								className={`w-full p-2 text-sm border bg-white text-[#003794] rounded min-h-[100px] md:min-h-[120px] resize-none ${errors.message ? "border-red-400" : "border-gray-300"}`}
								placeholder="Tell us how we can assist you..."
							></textarea>
							{errors.message && (
								<p className="text-xs text-red-500 mt-1">
									{errors.message.message}
								</p>
							)}
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="flex items-center uppercase justify-center w-full py-2.5 md:py-3 bg-[#0B2A52] text-white rounded-lg hover:bg-[#0B2A52] transition text-sm md:text-base"
						>
							{isLoading ? (
								<>
									<span className="loading loading-bars loading-md"></span>
								</>
							) : (
								<>
									Send Message{" "}
									<Send className="w-4 h-4 ms-2" />
								</>
							)}
						</button>
					</motion.form>

					<motion.div
						variants={imageVariants}
						initial="hidden"
						animate="visible"
						className="hidden md:flex justify-center items-center"
					>
						<img
							src="https://i.ibb.co/HTSk1Wzk/contact-img.jpg"
							alt="Veteran illustration"
							className=" max-w-2xl rounded-tr-[50px] rounded-bl-[50px]"
						/>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
