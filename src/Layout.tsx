import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({children}:{children:ReactNode}){
    return(
        <div className="md:lg:flex min-h-[100vh]">
        <Navbar />
        <div className="min-h-full w-full">
        {children}
    <div className="w-full bg-red-200 fixed bottom-0">
        <Footer />
    </div>
        </div>
    </div>
    )
}
export default Layout;