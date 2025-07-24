
import { Shield, Award, Heart, CheckCircle } from "lucide-react"

const AboutUs = () => {
  return (
    <section className="pt-20 md:pt-0">
      {/* Hero Section */}
      <div className="relative w-full  bg-gradient-to-br from-[#0B2A52] via-[#0d3461] to-[#0f3e70]">
        <div className="relative z-10 flex items-center py-20 md:py-32 px-4 sm:px-6 md:px-12">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-6xl font-bold text-white text-center md:text-start max-w-4xl leading-tight">
              Dedicated to Simplifying the VALR Process for Veterans
            </h1>
            <p className="text-blue-100 text-base md:text-lg mt-6 md:mt-8 leading-relaxed max-w-3xl text-center md:text-start">
              At VALR, we bridge the gap between veterans and the benefits they've earned. Our mission is to simplify
              the complex Veterans Affairs process with expert guidance, personalized support, and unwavering advocacy
              for every veteran we serve.
            </p>
            <div className="mt-8 md:mt-10 text-center md:text-start">
              <button className="bg-white  text-[#0B2A52] hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="px-4 sm:px-6 lg:px-12 py-16 md:py-20 bg-white dark:bg-white  transition-colors">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-black mb-6 ">Our Mission</h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-black leading-relaxed">
            VALR exists to bridge the gap between veterans and the benefits they've earned through their service. We
            understand that navigating the Veterans Affairs system can be complex and overwhelming. Our mission is to
            simplify this process, providing clear guidance, expert support, and unwavering advocacy for every veteran
            we serve.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className="px-4 sm:px-6 lg:px-12 py-16 md:py-20 bg-gray-50 dark:bg-white transition-colors">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-black mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 dark:text-black max-w-2xl mx-auto">
              These principles guide everything we do and shape how we serve our veteran community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Integrity",
                description:
                  "We operate with complete transparency and honesty, ensuring veterans receive accurate information and ethical guidance.",
                color: "text-[#0B2A52] dark:text-blue-400",
              },
              {
                icon: Heart,
                title: "Compassion",
                description:
                  "We understand the unique challenges veterans face and approach every interaction with empathy and respect.",
                color: "text-[#0B2A52] dark:text-blue-400",
              },
              {
                icon: Award,
                title: "Excellence",
                description:
                  "We strive for the highest standards in everything we do, from our services to our customer support.",
                color: "text-[#0B2A52] dark:text-blue-400",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg shadow-lg bg-white dark:bg-[#0f3e70] transition-colors border border-gray-200 dark:border-gray-600"
              >
                <div className="pt-6">
                  <value.icon className={`w-12 h-12 ${value.color} mx-auto mb-4`} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>




      {/* Call to Action */}
      <div className="px-4 sm:px-6 lg:px-12 py-16 md:py-20 bg-white dark:bg-white transition-colors">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-black mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 dark:text-black mb-8 leading-relaxed">
            Don't navigate the VALR process alone. Our experienced team is here to guide you every step of the way.
            Contact us today and take the first step toward securing the benefits you've earned.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#0B2A52] hover:bg-[#0d3461] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Schedule Free Consultation
            </button>
            <button className="px-8 py-3 rounded-lg border-2 border-[#0B2A52] text-[#0B2A52] hover:bg-[#0B2A52] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 bg-transparent transition-colors duration-200">
              Learn More About Our Services
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
