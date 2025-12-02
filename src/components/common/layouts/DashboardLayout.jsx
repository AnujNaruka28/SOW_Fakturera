import Header from "../../cores/dashboard/Header"
import Sidebar from "../../cores/dashboard/Sidebar"
import '../../../styles/dashboard/dashboard-lay.css';
import { Outlet } from "react-router-dom";
const DashboardLayout = () => {
    return (
        <main className="dashboard-layout">
            <Header/>
            <section className="dashboard-main">
                <Sidebar/>
                <Outlet/>
            </section>
        </main>
    )
}

export default DashboardLayout;