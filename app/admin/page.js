'use client'
import Layout from "./AdminLayout"
import { AdminRoutes } from "../component/AdminSession"
const AdminPage = () => {
  return (
    <>
      <AdminRoutes>
        <Layout>

        </Layout>
      </AdminRoutes>
    </>

  )
}

export default AdminPage