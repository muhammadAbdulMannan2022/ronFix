
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import logo from "../../../assets/VALR_logo.png";
import { IoMailOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="bg-[#152A45] text-white py-10 px-4 md:px-6">
			<div className="container mx-auto">
				{/* Top Section */}
				<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
					{/* Logo & Description */}
					<div className="text-center md:text-left">
						<img
							src={logo}
							alt="logo"
							className="mx-auto md:mx-0 h-[75px] w-[90px] mb-5"
						/>
						<p className="text-gray-300 text-sm max-w-xs md:max-w-md mx-auto md:mx-0">
							Valr is a veteran-owned organization dedicated to
							simplifying the VA process. Whether you’ve been
							denied before or never applied, we’re here to fight
							for you.
						</p>

						{/* Social Icons */}
						<div className="flex justify-center md:justify-start space-x-4 mt-4">
							<a
								href="https://facebook.com"
								className="text-gray-300 hover:text-white"
							>
								<FaFacebookF className="h-5 w-5" />
							</a>
							<a
								href="https://linkedin.com"
								className="text-gray-300 hover:text-white"
							>
								<FaLinkedinIn className="h-5 w-5" />
							</a>
							<a
								href="https://instagram.com"
								className="text-gray-300 hover:text-white"
							>
								<FaInstagram className="h-5 w-5" />
							</a>
						</div>
					</div>

					{/* Helpful Links & Contact Info */}
					<div className="grid grid-cols-1 text-center md:text-start sm:grid-cols-2 md:grid-cols-2 gap-8">
						{/* Helpful Links */}
						<div>
							<h3 className="text-base font-semibold mb-3 underline">
								HELPFUL LINKS
							</h3>
							<ul className="space-y-2 text-sm text-gray-300">
								<li>
									<Link
										to="/about_us"
										className="hover:text-white"
									>
										About us
									</Link>
								</li>
							
								<li>
									<Link
										to="/contact"
										className="hover:text-white"
									>
										Contact us
									</Link>
								</li>
							</ul>
						</div>

						{/* Contact Info */}
						<div>
							<h3 className="text-base  font-semibold mb-3 underline">
								CONTACT INFORMATION
							</h3>
							<ul className="space-y-3 text-sm  text-gray-300">
								<li className="flex items-center justify-center md:justify-start">
									<IoMailOutline className="text-sm text-white" />
									<a
										href="mailto:support@valrpro.com"
										className="hover:text-white text-sm  "
									>
										  <span className="ms-2 flex">support@valrpro.com</span>
									</a>
								</li>
								<li className="flex items-center justify-center md:justify-start">
									<BsTelephone className="mr-2 text-white" />
									<a
										href="tel:7252586118"
										className="hover:text-white"
									>
										725-258-6118
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-600 my-6"></div>

				{/* Disclaimer */}
				<p className="text-center text-[11px] text-gray-400 w-full container mx-auto leading-relaxed px-2">
					<span className="text-red-700 font-semibold">
						Disclaimer:
					</span>
					  VARL is not an accredited agent and/or a pool of
					attorneys, law firm or law office. It is not an accredited
					or recognized VA claim agent nor is it an individual or
					entity that is allowed and accredited by the VA to represent
					any and all of its Affiliates. Vac2023 does NOT represent
					veterans before the VA or BVA in connection with any claim
					for VA disability benefits. Veterans are appraised that
					there are free resources available to aid them in the
					applications they have before Department of Veterans Affairs
					(VA) such as but not limited to the preparation, filing,
					presentation and processing of the VA disability claim.
					<br />
					<span className="block mt-2">
					© {new Date().getFullYear()} VALR. All Rights Reserved.
					</span>

				</p>
			</div>
		</footer>
	);
}
