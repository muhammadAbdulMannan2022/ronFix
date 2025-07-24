import { Link } from "react-router-dom"
import logo from "../../../assets/VALR_logo.png"
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export default function Footer() {
	return (
		<footer className="bg-[#1a2332] text-white">
			<div className="container mx-auto px-5 md:px-20 py-12 lg:py-16">
				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
					{/* Logo & Description */}
					<div className="lg:col-span-1">
						<div className="flex items-center mb-6">
							<img src={logo} alt="VALR Logo" className="h-20 w-auto" />
						</div>
						<p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm">
							AC IS A VETERAN-OWNED ORGANIZATION DEDICATED TO SIMPLIFYING THE VA PROCESS. WHETHER YOU'VE BEEN DENIED
							BEFORE OR NEVER APPLIED, WE'RE HERE TO FIGHT FOR YOU.
						</p>
						{/* Social Icons
						<div className="flex space-x-4">
							<a
								href="https://facebook.com"
								className="text-gray-400 hover:text-white transition-colors"
								aria-label="Facebook"
							>
								<Facebook className="h-5 w-5" />
							</a>
							<a
								href="https://linkedin.com"
								className="text-gray-400 hover:text-white transition-colors"
								aria-label="LinkedIn"
							>
								<Linkedin className="h-5 w-5" />
							</a>
							<a
								href="https://instagram.com"
								className="text-gray-400 hover:text-white transition-colors"
								aria-label="Instagram"
							>
								<Instagram className="h-5 w-5" />
							</a>
						</div> */}
					</div>

					{/* Helpful Links */}
					<div>
						<h3 className="text-white font-semibold text-sm mb-4 tracking-wider">HELPFUL LINKS</h3>
						<ul className="space-y-3">
							<li>
								<Link to="/" className="text-gray-300 hover:text-white text-sm transition-colors">
									HOME
								</Link>
							</li>
							<li>
								<Link to="/about" className="text-gray-300 hover:text-white text-sm transition-colors">
									ABOUT US
								</Link>
							</li>
							<li>
								<Link to="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">
									CONTACT US
								</Link>
							</li>
						</ul>
					</div>

					{/* Other Links */}
					<div>
						<h3 className="text-white font-semibold text-sm mb-4 tracking-wider">OTHER LINKS</h3>
						<ul className="space-y-3">
							<li>
								<Link to="/privacy-policy" className="text-gray-300 hover:text-white text-sm transition-colors">
									PRIVACY POLICY
								</Link>
							</li>
							<li>
								<Link to="/calculator" className="text-gray-300 hover:text-white text-sm transition-colors">
									CALCULATOR
								</Link>
							</li>
							<li>
								<Link to="/faqs" className="text-gray-300 hover:text-white text-sm transition-colors">
									FAQS
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Information */}
					<div>
						<h3 className="text-white font-semibold text-sm mb-4 tracking-wider">CONTACT INFORMATION</h3>
						<ul className="space-y-4">
							<li className="flex items-center">
								<Mail className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
								<a
									href="mailto:dummyemail@gmail.com"
									className="text-gray-300 hover:text-white text-sm transition-colors"
								>
									dummyemail@gmail.com
								</a>
							</li>
							<li className="flex items-center">
								<Phone className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
								<a href="tel:12345678790" className="text-gray-300 hover:text-white text-sm transition-colors">
									12345678790
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-600 my-8"></div>

				{/* Disclaimer */}
				<div className="text-center">
					<p className="text-gray-400 text-xs leading-relaxed max-w-4xl mx-auto">
						<span className="text-red-500 font-semibold">DISCLAIMER:</span> VARL IS NOT AN ACCREDITED AGENT AND/OR A
						POOL OF ATTORNEYS, LAW FIRM OR LAW OFFICE. IT IS NOT AN ACCREDITED OR RECOGNIZED VA CLAIM AGENT NOR IS IT AN
						INDIVIDUAL OR ENTITY THAT IS ALLOWED AND ACCREDITED BY THE VA TO REPRESENT ANY AND ALL OF ITS AFFILIATES.
						VAC2023 DOES NOT REPRESENT VETERANS BEFORE THE VA OR BVA IN CONNECTION WITH ANY CLAIM FOR VA DISABILITY
						BENEFITS. VETERANS ARE APPRAISED THAT THERE ARE FREE RESOURCES AVAILABLE TO AID THEM IN THE APPLICATIONS
						THEY HAVE BEFORE DEPARTMENT OF VETERANS AFFAIRS (VA) SUCH AS BUT NOT LIMITED TO THE PREPARATION, FILING,
						PRESENTATION AND PROCESSING OF THE VA DISABILITY CLAIM.
					</p>
					<p className="text-gray-500 text-xs mt-4">© {new Date().getFullYear()} VALR. All Rights Reserved.</p>
				</div>
			</div>
		</footer>
	)
}