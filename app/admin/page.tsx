'use client'
import Layout from "./AdminLayout"
import AdminDashboard from "@/components/admin-dashboard"
import { AdminRoutes } from "../component/AdminSession"
const AdminPage: React.FC = () => {
    return (
        <AdminRoutes>
            <Layout>
                <AdminDashboard />
            </Layout>
        </AdminRoutes>
    )
}
export default AdminPage