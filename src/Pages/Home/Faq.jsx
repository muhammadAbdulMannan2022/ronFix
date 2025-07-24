import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const faqs = [
	{
		question: "What benefits can I qualify for?",
		answer: "Veterans can qualify for healthcare, disability compensation, education assistance, housing loans, pension benefits, vocational training, and survivor support programs.",
	},
	{
		question: "What happens if I've been denied before?",
		answer: "If you have been denied before, we can guide you through the appeal process to ensure you get the benefits you deserve.",
	},
	{
		question: "How long does the process take?",
		answer: "The process varies depending on the case, but generally it takes a few weeks to a few months.",
	},
	{
		question: "What is your guest screening process?",
		answer: "Our guest screening process includes background checks and verification to ensure a safe and secure environment.",
	},
	{
		question: "How much are your Co-Hosting fees?",
		answer: "Our Co-Hosting fees vary depending on the services you require. Contact us for more detailed pricing information.",
	},
];

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleAccordion = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="bg-[#E0F7FF] dark:bg-[#E0F7FF] md:py-20">
			<div className="bg-[#0A3161] container mx-auto text-white py-10 md:px-10 bg-faq-pattern bg-cover bg-no-repeat bg-top">
				<div className=" md:p-14 px-2 md:px-0 text-white">
					<div className=" mx-auto text-center mb-12">
						<h2 className="md:text-4xl text-2xl md:text-start font-bold">
							Frequently Asked Questions
						</h2>
						<p className="text-base md:text-start mt-4">
							We have your answers.
						</p>
					</div>

					<div className="space-y-4">
						{faqs.map((faq, index) => (
							<div
								key={index}
								className="border border-gray-200 rounded-none "
							>
								<div
									onClick={() => toggleAccordion(index)}
									className="flex justify-between items-center p-3  cursor-pointer transition-all"
								>
									<h3 className="text-[14px] md:text-[20px] lg:text-[20px] font-medium">
										{faq.question}
									</h3>
									<IoChevronDownOutline />
								</div>

								{openIndex === index && (
									<div className="p-4 bg-white text-xs md:text-[16px] lg:text-[16px] text-gray-900 rounded-none">
										<p>{faq.answer}</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
