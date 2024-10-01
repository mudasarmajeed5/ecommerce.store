import Layout from '../AdminLayout'
import { AdminRoutes } from '@/app/component/AdminSession'
import { GoGraph } from "react-icons/go";
import { SlGraph } from "react-icons/sl";
import { MdOutlineAutoGraph } from "react-icons/md";
import { VscGraphScatter } from "react-icons/vsc";
import { Active_OrdersTable } from '@/components/active_order_table';
const Orders = () => {
  let data={
    title:"Sales here",
    numberOfOrders:5,
    graphData:<GoGraph/>
  }
  let data2={
    title:"Orders here",
    numberOfOrders:15,
    graphData:<SlGraph />,
  }
  let data3={
    title:"Retun In Investment",
    numberOfOrders:50,
    graphData:<VscGraphScatter />
  }
  let data4={
    title:"Returns",
    numberOfOrders:37,
    graphData:<MdOutlineAutoGraph/>
  }
  const CardComponent=({data}:any)=>{
    return (<>
      <div className='flex w-full p-2 flex-col border border-black rounded-md justify-center'>
        <h1 className='font-bold'>{data.title}</h1>
        <h3 className='text-2xl font-bold'>{data.numberOfOrders}</h3>
        <h3 className='text-6xl mx-auto text-center'>{data.graphData}</h3>
      </div>
    </>)
  }
  return (
    <>
      <AdminRoutes>
        <Layout>
          <div className="min-h-screen overflow-hidden bg-white">
            <div>
              <div className="cards flex md:flex-row flex-col justify-center md:justify-between m-4 gap-4">
                <CardComponent data={data} />
                <CardComponent data={data2} />
                <CardComponent data={data3} />
                <CardComponent data={data4} />
              </div>
            </div>
            <div className="mx-4">
            <Active_OrdersTable/>
            </div>
          </div>
        </Layout>
      </AdminRoutes>
    </>
  )
}

export default Orders