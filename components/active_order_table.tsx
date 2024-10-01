'use client'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Package, Search, Copy } from "lucide-react"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Mock data for active orders
const orders = [
  { id: 1, status: 'In Transit', price: 99.99, customerName: 'John Doe', phoneNumber: '(555) 123-4567' },
  { id: 2, status: 'Pending', price: 149.99, customerName: 'Jane Smith', phoneNumber: '(555) 987-6543' },
  { id: 3, status: 'Delivered', price: 199.99, customerName: 'Bob Johnson', phoneNumber: '(555) 246-8135' },
  { id: 4, status: 'In Transit', price: 79.99, customerName: 'Alice Brown', phoneNumber: '(555) 369-2580' },
  { id: 5, status: 'Pending', price: 129.99, customerName: 'Charlie Davis', phoneNumber: '(555) 147-2589' },
]

export function Active_OrdersTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredOrders = orders.filter(order => 
    (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || order.status === statusFilter)
  )

  const copyToClipboard = (orderId: number) => {
    navigator.clipboard.writeText(orderId.toString()).then(() => {
      toast.success('Order ID copied to clipboard!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Package className="mr-2" />
        Active Orders
      </h1>
      <div className="mb-4 flex space-x-2">
        {['All', 'Pending', 'In Transit', 'Delivered'].map((status) => (
          <Button
            key={status}
            onClick={() => setStatusFilter(status)}
            variant={statusFilter === status ? "default" : "outline"}
          >
            {status}
          </Button>
        ))}
      </div>
      <div className="mb-4 relative ">
        <Search className="absolute left-2 top-3 h-4 w-4 text-black" />
        <Input
          placeholder="Search by customer name or status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 text-white"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${order.status === 'Delivered' ? 'bg-green-200 text-green-800' :
                    order.status === 'In Transit' ? 'bg-blue-200 text-blue-800' :
                    'bg-yellow-200 text-yellow-800'}`}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>${order.price.toFixed(2)}</TableCell>
              <TableCell>{order.phoneNumber}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(order.id)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy ID
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ToastContainer />
    </div>
  )
}