import React from 'react'
import Layout from '../AdminLayout'
import { AdminRoutes } from '@/app/component/AdminSession'
const Orders = () => {
  return (
    <>
      <AdminRoutes>
        <Layout>
          This is orders page
        </Layout>
      </AdminRoutes>
    </>
  )
}

export default Orders