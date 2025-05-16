// import {
//     Card,
//     CardDescription,
//     CardHeader,
//     CardTitle,
//   } from "@/components/ui/card"
// import StatusBadge from "./StatusBadge"
// import { ArrowBigRight } from "lucide-react"
// import { useNavigate } from "react-router-dom"


// function MyCard({createdAt = "Due 19 Aug 2021", clientName = 'Jenson Huang', total = '1,800,90', id='1',  status ='draft'}) {

// const navigate = useNavigate()
//   return (
//     <Card onClick={() =>{
//       navigate(`/${id}`)
//     }} className='border-2 transition-colors hover:border-blue-400 border-transparent cursor-pointer'  >
//   <CardHeader>
//     <div className="flex items-center justify-between">
//     <CardTitle># {id}</CardTitle>
//     <CardDescription>{createdAt}</CardDescription>
//     <span>{clientName}</span>
//     <span>{total}</span>
//     <div className="flex items-center gap-10">
//     <StatusBadge className='mr-auto' status={status}/>
//     <ArrowBigRight className="text-[#7C5DFA]" />
//     </div>
//     </div>
//   </CardHeader>
// </Card>

//   )
// }

// export default MyCard




import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import StatusBadge from "./StatusBadge"
import { ArrowBigRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

function MyCard({createdAt = "Due 19 Aug 2021", clientName = 'Jenson Huang', total = '1,800,90', id='1', status ='draft'}) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/${id}`)}
      className='border-2 transition-colors hover:border-blue-400 border-transparent cursor-pointer'
    >
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center justify-between sm:justify-start sm:gap-4 w-full sm:w-auto">
            <CardTitle className="text-lg sm:text-base">#{id}</CardTitle>
            <span className="text-base sm:text-base text-muted-foreground sm:hidden">{clientName}</span>
          </div>

          <CardDescription className="text-base sm:text-base sm:order-first">
            {createdAt}
          </CardDescription>

          <span className="hidden sm:inline text-sm sm:text-base font-medium">
            {clientName}
          </span>

          <span className="text-lg sm:text-base font-bold">
            £{total}
          </span>

          <div className="flex items-center justify-between gap-4 w-full sm:w-auto">
            <StatusBadge status={status} className="sm:ml-auto sm:justify-end " />
            <ArrowBigRight className="text-[#7C5DFA]  h-5 w-5" />
          </div>

        </div>
      </CardHeader>
    </Card>
  )
}

export default MyCard