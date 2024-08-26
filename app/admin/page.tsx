'use client'
import Layout from "./AdminLayout"
import { AdminRoutes } from "../component/AdminSession"
const AdminPage: React.FC = () => {
    return (
        <AdminRoutes>
            <Layout>
                <h1 className="min-h-[80vh] flex justify-center items-center text-3xl">Hello Admin</h1>
            </Layout>
        </AdminRoutes>
    )
}
export default AdminPage