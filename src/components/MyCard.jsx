import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import StatusBadge from "./StatusBadge"
import { ArrowBigRight } from "lucide-react"
import { useNavigate } from "react-router-dom"


function MyCard({createdAt = "Due 19 Aug 2021", clientName = 'Jenson Huang', total = '1,800,90', id='1',  status ='draft'}) {

const navigate = useNavigate()
  return (
    <Card onClick={() =>{
      navigate(`/${id}`)
    }} className='border-2 transition-colors hover:border-blue-400 border-transparent cursor-pointer' >
  <CardHeader>
    <div className="flex items-center justify-between">
    <CardTitle># {id}</CardTitle>
    <CardDescription>{createdAt}</CardDescription>
    <span>{clientName}</span>
    <span>{total}</span>
    <div className="flex items-center gap-10">
    <StatusBadge className='mr-auto' status={status}/>
    <ArrowBigRight className="text-[#7C5DFA]" />
    </div>
    </div>
  </CardHeader>
</Card>

  )
}

export default MyCard
