import { Outlet } from "react-router-dom"
import Navbar from "../Pages/Shared/Navbar/Navbar"
import Footer from "../Pages/Shared/Footer/Footer"
import ScrollToTop from "../Pages/ScrollTop/ScrollToTop"

const Main = () => {
  return (
    <div>
      <ScrollToTop/>
   
        <Navbar/>

      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Main
