import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "../../../assets/VALR_logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetLoggedUserQuery, useUpdateUserProfileMutation } from "../../../redux/features/baseApi";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";

import { toast, Toaster } from "sonner";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import Profile from "../../AdminDashboard/Profile";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true" ? true : false || false);
  const { data: loggedInUser, isLoading } = useGetLoggedUserQuery();
  console.log("loggedInUser", loggedInUser)
  const baseURL = "https://backend.valrpro.com"

  const [updateProfile, { data, isLoading: isUpdating }] = useUpdateUserProfileMutation();

  console.log({ loggedInUser, data })

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (loggedInUser) {
      setFormData({
        name: loggedInUser.name || "",
        email: loggedInUser.email || "",
        phone_number: loggedInUser.phone_number || "",
        image: null,
      });
      setPreviewImage(loggedInUser.image);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (loggedInUser?.image) {
      console.log(`${baseURL}${loggedInUser.image}`);
    }
  }, [loggedInUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };



  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about_us" },
    { name: "Calculator", path: "/calculator" },
    
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);


  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("isAdmin");



    setTimeout(() => {
      setIsLoggingOut(false);
      navigate("/login");
      refetch()
    }, 2000);
  };

  const openLogoutModal = () => {
    document.getElementById("logout_modal")?.showModal();
  };

  const openProfileModal = () => {
    document.getElementById("profile_modal")?.showModal();
  };



  return (
    <nav className="fixed top-0 z-50 w-full bg-[#0B2A52] shadow-lg md:px-20">
      <Toaster/>
      <div className="md:container mx-auto flex items-center justify-between py-3 ps-3 md:ps-0">
        {/* Logo */}
        <div className="z-10 flex items-center font-bold text-white">
          <img
            src={logo}
            alt="VALR Logo"
            width={72}
            height={52}
            className="h-[60px] w-[60px]  transition-all duration-300 sm:h-[80px] sm:w-[80px] md:h-[70px] md:w-[80px]"
          />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden space-x-14 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              to={link.path}
              className={`relative text-white uppercase tracking-wide hover:text-opacity-90 transition-all after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-white after:transition-transform after:duration-300 ${location.pathname === link.path
                ? "after:scale-x-100 font-semibold"
                : "after:scale-x-0 opacity-75 hover:opacity-100 hover:after:scale-x-100"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop User Section */}
        <div className="hidden md:flex items-center space-x-3 relative">
          {isLoading ? null : loggedInUser ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar flex items-center">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                  <img
                    src={
                      loggedInUser?.image
                        ? `${baseURL}/${loggedInUser.image}`
                        : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                    }
                    alt="User Avatar"
                    className="w-[50px] h-[50px] object-cover "
                  />


                </div>
                <ChevronDown size={20} className="text-white ml-2" />
              </div>
              <ul className="menu dropdown-content z-[999] p-3 mt-1 shadow bg-[#002b5c] opacity-90 rounded-box w-48 space-y-2 border border-white/20">

                {isAdmin ? <Link to="/admin"
                  className="flex text-white items-center gap-3 py-2 px-3 text-base hover:bg-[#104685] rounded-md"
                >

                  <RiDashboardHorizontalLine className="w-5 h-5" />Dashboard
                </Link> : <li>
                  <Link to="/va-form"
                    className="flex text-white items-center gap-3 py-2 px-3 text-base hover:bg-[#104685] rounded-md"
                  >

                    <FaRegFilePdf className="w-5 h-5" /> VA-Form
                  </Link>
                </li>}

                <li>
                  <button
                    onClick={openLogoutModal}
                    className="flex text-white items-center gap-3 py-2 px-3 text-sm hover:bg-[#104685] rounded-md uppercase"
                  >
                    <FaSignOutAlt className="w-5 h-5 text-red-500" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md bg-[#B31942] px-6 py-2.5 text-white font-semibold hover:scale-105 transition"
              >
                Sign In
              </Link>
              <Link
                to="/sign_up"
                className="rounded-md bg-white px-6 py-2.5 text-[#0A3161] font-semibold hover:scale-105 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="rounded-lg me-2 p-1 text-2xl text-white hover:bg-white/10 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 transition-opacity md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-[#0B2A52] shadow-lg transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-full flex-col py-3">
          <div className="flex h-[80px] items-center mx-auto border-b border-white/10 px-6">
            <img
              src={logo}
              alt="VALR Logo"
              width={80}
              height={80}
              className="h-[70px] w-[70px]"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  to={link.path}
                  className={`px-6 py-4 text-white transition duration-200 relative ${location.pathname === link.path
                    ? "bg-white/10 font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white"
                    : "hover:bg-white/5"
                    }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 p-6">
            {isLoading ? null : loggedInUser ? (
              <div className="flex flex-col items-center gap-4">
                {/* <img
                  src={
                    loggedInUser.image ||
                    "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                  }
                  alt="User Avatar"
                  className="h-12 w-12 rounded-full object-cover"
                /> */}


                <img
                  src={
                    loggedInUser?.image
                      ? `${baseURL}${loggedInUser?.image}`

                      : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                  }
                  alt="User Avatar"
                  className="h-12 w-12 rounded-full object-cover"
                />



                <button
                  onClick={openProfileModal}
                  className="flex items-center uppercase gap-3 rounded-md bg-[#104685] px-6 py-2.5 text-white font-semibold hover:bg-opacity-90"
                >
                  <FaUser className="w-5 h-5 " />
                  Profile
                </button>

                <button
                  onClick={openLogoutModal}
                  className="flex items-center gap-3 rounded-md bg-[#B31942] px-6 py-2.5 text-white font-semibold hover:bg-opacity-90"
                >
                  <FaSignOutAlt className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="rounded-md bg-[#B31942] px-6 py-2.5 text-center font-semibold text-white hover:bg-opacity-90"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/sign_up"
                  className="rounded-md bg-white px-6 py-2.5 text-center font-semibold text-[#0A3161] hover:bg-opacity-90"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <dialog id="logout_modal" className="modal backdrop-blur-[1px]">
        <div className="modal-box bg-[#002b5c] text-white">
          <h3 className="font-bold text-lg">Confirm Logout</h3>
          <p className="py-4">Are you sure you want to log out?</p>
          <div className="modal-action">
            <form method="dialog" className="space-x-2">
              <button className="btn btn-outline text-white hover:bg-white/10">
                Cancel
              </button>
              <button
                className="btn btn-error text-white"
                onClick={handleLogout}
                disabled={isLoading || isLoggingOut}
              >
                {isLoggingOut ? (
                  <span className="loading loading-bars loading-xl text-red-600"></span>
                ) : (
                  "Logout"
                )}
              </button>
            </form>
          </div>
        </div>
      </dialog>



    </nav>
  );
}