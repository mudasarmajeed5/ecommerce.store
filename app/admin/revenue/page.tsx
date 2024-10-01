import Layout from '../AdminLayout'
import { AdminRoutes } from '@/app/component/AdminSession'

const Revenue = () => {
  return (
    <>
      <AdminRoutes>
        <Layout>
          <div className="min-h-screen">
            <div className="flex justify-between items-center gap-5 mt-10 mx-5 flex-wrap">
              <div className='flex gap-2'>
                <CardDetails text={"Revenue"} amount={5000} />
                <CardDetails text={"Subscribers"} amount={2000} />
              </div>
              <div className='flex gap-2'>
                <span className='underline underline-offset-2'>Daily</span>
                <span className='underline underline-offset-2'>Monthly</span>
                <span className='underline underline-offset-2'>Yearly</span>
              </div>
            </div>
          </div>
        </Layout>
      </AdminRoutes>
    </>
  )
}
function CardDetails(props: any) {
  return (
    <div className="rounded-md px-8 py-5 flex flex-col bg-blue-100">
      <div className="flex gap-2 items-center"><span className='font-bold text-3xl'>${props.amount}</span><span className='text-md font-semibold'>{props.text}</span></div>
    </div>
  );
}
export default Revenue