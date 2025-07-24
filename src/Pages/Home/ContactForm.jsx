// import { useForm } from "react-hook-form";
// import {
// 	CheckCircle,
// 	Mail,
// 	Phone,
// 	User,
// 	MessageSquare,
// 	Send,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function ContactForm() {
// 	const [isSubmitted, setIsSubmitted] = useState(false);
// 	const [isLoading, setIsLoading] = useState(false);

// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 		reset,
// 	} = useForm({
// 		defaultValues: {
// 			first_name: "",
// 			last_name: "",
// 			email: "",
// 			phone: "",
// 			message: "",
// 		},
// 	});

// 	const onSubmit = async (data) => {
// 		setIsLoading(true);
// 		try {
// 			await new Promise((resolve) => setTimeout(resolve, 2000));
// 			console.log("Form Submitted:", data);
// 			setIsSubmitted(true);
// 			setTimeout(() => {
// 				reset();
// 				setIsSubmitted(false);
// 			}, 3000);
// 		} catch (error) {
// 			console.error("Submission error:", error);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	const formVariants = {
// 		hidden: { opacity: 0, y: 20 },
// 		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// 	};

// 	const imageVariants = {
// 		hidden: { opacity: 0, scale: 0.8 },
// 		visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
// 	};

	
// 	return (
// 		<div
// 			id="contact_us"
// 			className="md:min-h-[80vh]   md:py-20 py-12 md:px-4 flex items-center justify-center"
// 			style={{
// 				backgroundImage:
// 					'url("https://i.ibb.co/0pWC3fzm/Group-2147226355.png")',
// 				backgroundSize: "cover",
// 				backgroundPosition: "center",
// 			}}
// 		>
// 			<div className="md:container mx-auto">
// 				<motion.div
// 					variants={formVariants}
// 					initial="hidden"
// 					animate="visible"
// 					className="text-center mb-8"
// 				>
// 					<h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#16437E] text-center md:text-start">
// 						get in touch today
// 					</h1>
// 					<p className="text-gray-600 text-sm md:pt-5 pt-3 p-2 md:text-base md:w-2/4 text-center md:text-start">
// 						Reach out to us with your questions, concerns, or
// 						inquiries. We're here to help and look forward to
// 						connecting!
// 					</p>
// 				</motion.div>
// 				<div className="grid md:grid-cols-2 gap-6 md:gap-8">
// 					<motion.form
// 						variants={formVariants}
// 						initial="hidden"
// 						animate="visible"
// 						onSubmit={handleSubmit(onSubmit)}
// 						className="space-y-5 bg-white md:p-6 p-3 py-10 md:py-0 rounded-none shadow-md w-full"
// 					>
// 						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mt-8 mt-0 md:pt-5">
// 							<div className="">
// 								<label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
// 									<User className="w-4 h-4" /> First Name
// 								</label>
// 								<input
// 									{...register("first_name", {
// 										required: "Please enter your first name",
// 										pattern: {
// 											value: /^[A-Za-z\s]+$/,
// 											message: "First name should only contain letters and spaces",
// 										},
// 										minLength: {
// 											value: 2,
// 											message: "First name must be at least 2 characters",
// 										},
// 										maxLength: {
// 											value: 50,
// 											message: "First name cannot exceed 50 characters",
// 										},
// 									})}
// 									className={`w-full p-2 text-sm bg-white text-[#003794] border rounded ${errors.first_name ? "border-red-400" : "border-gray-300"}`}
// 									placeholder="Your first name"
// 								/>
// 								{errors.first_name && (
// 									<p className="text-xs text-red-500 mt-1">
// 										{errors.first_name.message}
// 									</p>
// 								)}
// 							</div>
// 							<div>
// 								<label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
// 									<User className="w-4 h-4" /> Last Name
// 								</label>
// 								<input
// 									{...register("last_name", {
// 										required: "Please enter your last name",
// 										pattern: {
// 											value: /^[A-Za-z\s]+$/,
// 											message: "Last name should only contain letters and spaces",
// 										},
// 										minLength: {
// 											value: 2,
// 											message: "Last name must be at least 2 characters",
// 										},
// 										maxLength: {
// 											value: 50,
// 											message: "Last name cannot exceed 50 characters",
// 										},
// 									})}
// 									className={`w-full p-2 text-sm bg-white text-[#003794] border rounded ${errors.last_name ? "border-red-400" : "border-gray-300"}`}
// 									placeholder="Your last name"
// 								/>
// 								{errors.last_name && (
// 									<p className="text-xs text-red-500 mt-1">
// 										{errors.last_name.message}
// 									</p>
// 								)}
// 							</div>
// 						</div>

// 						<div>
// 							<label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
// 								<Mail className="w-4 h-4" /> Email
// 							</label>
// 							<input
// 								type="email"
// 								{...register("email", {
// 									required: "We need your email to reach you",
// 									pattern: {
// 										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
// 										message: "Please use a valid email address",
// 									},
// 									maxLength: {
// 										value: 100,
// 										message: "Email cannot exceed 100 characters",
// 									},
// 								})}
// 								className={`w-full p-2 text-sm border bg-white text-[#003794] rounded ${errors.email ? "border-red-400" : "border-gray-300"}`}
// 								placeholder="Your email address"
// 							/>
// 							{errors.email && (
// 								<p className="text-xs text-red-500 mt-1">
// 									{errors.email.message}
// 								</p>
// 							)}
// 						</div>

// 						<div>
// 							<label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
// 								<Phone className="w-4 h-4" /> Phone
// 							</label>
// 							<input
// 								type="tel"
// 								{...register("phone", {
// 									required: "Please provide a phone number",
// 									pattern: {
// 										value: /^\d{10,15}$/,
// 										message: "Phone number must be 10-15 digits",
// 									},
// 								})}
// 								className={`w-full p-2 text-sm border bg-white text-[#003794] rounded ${errors.phone ? "border-red-400" : "border-gray-300"}`}
// 								placeholder="Your phone number"
// 							/>
// 							{errors.phone && (
// 								<p className="text-xs text-red-500 mt-1">
// 									{errors.phone.message}
// 								</p>
// 							)}
// 						</div>

// 						<div>
// 							<label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
// 								<MessageSquare className="w-4 h-4" /> Message
// 							</label>
// 							<textarea
// 								{...register("message", {
// 									required: "Let us know how we can help",
// 									minLength: {
// 										value: 10,
// 										message: "Message must be at least 10 characters",
// 									},
// 									maxLength: {
// 										value: 1000,
// 										message: "Message cannot exceed 1000 characters",
// 									},
// 								})}
// 								className={`w-full p-2 text-sm border bg-white text-[#003794] rounded min-h-[100px] md:min-h-[120px] resize-none ${errors.message ? "border-red-400" : "border-gray-300"}`}
// 								placeholder="Tell us how we can assist you..."
// 							></textarea>
// 							{errors.message && (
// 								<p className="text-xs text-red-500 mt-1">
// 									{errors.message.message}
// 								</p>
// 							)}
// 						</div>

// 						<button
// 							type="submit"
// 							disabled={isLoading}
// 							className="flex items-center uppercase justify-center w-full py-2.5 md:py-3 bg-[#0B2A52] text-white rounded-lg hover:bg-[#0B2A52] transition text-sm md:text-base"
// 						>
// 							{isLoading ? (
// 								<>
// 									<span className="loading loading-bars loading-md"></span>
// 								</>
// 							) : (
// 								<>
// 									Send Message{" "}
// 									<Send className="w-4 h-4 ms-2" />
// 								</>
// 							)}
// 						</button>
// 					</motion.form>

// 					<motion.div
// 						variants={imageVariants}
// 						initial="hidden"
// 						animate="visible"
// 						className="hidden md:flex justify-center items-center"
// 					>
// 						<img
// 							src="https://i.ibb.co/HTSk1Wzk/contact-img.jpg"
// 							alt="Veteran illustration"
// 							className=" max-w-2xl rounded-tr-[50px] rounded-bl-[50px]"
// 						/>
// 					</motion.div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }


import { useForm } from "react-hook-form";
import { CheckCircle, Mail, Phone, User, MessageSquare, Send } from "lucide-react";
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
      console.log("Form Submitted:", data);
      // Simulate async request
      await new Promise((res) => setTimeout(res, 1500));
      setIsSubmitted(true);
      reset(); // reset form after success
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const nameRules = {
    required: "This field is required",
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Only letters and spaces allowed",
    },
    minLength: { value: 2, message: "Minimum 2 characters" },
    maxLength: { value: 50, message: "Maximum 50 characters" },
  };

  const emailRules = {
    required: "This field is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Invalid email address",
    },
    maxLength: { value: 100, message: "Maximum 100 characters" },
  };

  const phoneRules = {
    required: "This field is required",
    pattern: {
      value: /^[0-9+\s()-]{7,20}$/,
      message: "Invalid phone number",
    },
  };

  const messageRules = {
    required: "This field is required",
    minLength: { value: 10, message: "Minimum 10 characters" },
    maxLength: { value: 1000, message: "Maximum 1000 characters" },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <div
      id="contact_us"
      className="md:py-20 py-12 md:px-14 flex items-center justify-center"
      style={{
        backgroundImage: 'url("https://i.ibb.co/0pWC3fzm/Group-2147226355.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="md:container mx-auto">
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#16437E] text-center md:text-start">
            get in touch today
          </h1>
          <p className="text-gray-600 text-sm md:pt-5 pt-3 p-2 md:text-base md:w-2/4 text-center md:text-start">
            Reach out to us with your questions, concerns, or inquiries. We're here to help and look forward to connecting!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <motion.form
            variants={formVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 bg-white md:p-6 p-3 py-10 md:py-0 rounded-none shadow-md w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mt-8 mt-0 md:pt-16">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <User className="w-4 h-4" /> First Name
                </label>
                <input
                  type="text"
                  {...register("first_name", nameRules)}
                  className={`w-full p-2 text-sm bg-white text-[#003794] border rounded ${
                    errors.first_name ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="Your first name"
                />
                {errors.first_name && (
                  <p className="text-xs text-red-500 mt-1">{errors.first_name.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <User className="w-4 h-4" /> Last Name
                </label>
                <input
                  type="text"
                  {...register("last_name", nameRules)}
                  className={`w-full p-2 text-sm bg-white text-[#003794] border rounded ${
                    errors.last_name ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="Your last name"
                />
                {errors.last_name && (
                  <p className="text-xs text-red-500 mt-1">{errors.last_name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Mail className="w-4 h-4" /> Email
              </label>
              <input
                type="email"
                {...register("email", emailRules)}
                className={`w-full p-2 text-sm border bg-white text-[#003794] rounded ${
                  errors.email ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Your email address"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MessageSquare className="w-4 h-4" /> Message
              </label>
              <textarea
                {...register("message", messageRules)}
                className={`w-full p-2 text-sm border bg-white text-[#003794] rounded min-h-[100px] md:min-h-[120px] resize-none ${
                  errors.message ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Tell us how we can assist you..."
              ></textarea>
              {errors.message && (
                <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center uppercase justify-center w-full py-2.5 md:py-3 bg-[#0B2A52] text-white rounded-lg hover:bg-[#0B2A52]/90 transition text-sm md:text-base"
            >
              {isLoading ? (
                <span className="loading loading-bars loading-md"></span>
              ) : (
                <>
                  Send Message <Send className="w-4 h-4 ms-2" />
                </>
              )}
            </button>

            {isSubmitted && (
              <p className="text-green-600 text-sm flex items-center gap-2 justify-center mt-4">
                <CheckCircle className="w-4 h-4" /> Message sent successfully!
              </p>
            )}
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
              className="max-w-2xl rounded-tr-[50px] rounded-bl-[50px]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
