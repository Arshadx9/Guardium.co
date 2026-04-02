import Navbar from "@/Components/Navbar";

import Link from "next/link"

export default function Homepage ()  {
  return(
 


    <div className="bg-[rgb(240,235,229)] min-w-screen h-screen p-4">
 <Navbar />


<div className="text-black font-medium font-editorial flex flex-col justify-center items-center text-7xl mt-32 mb-10 ">
  
  
  <div  >know the moment your api breaks </div>
  <div> not hours later </div>
 
</div>




<div className="text-black font-mono font-light flex flex-col justify-center items-center text-lg  tracking-tighter">
  
  
  <div>Real-time API monitoring powered by event streams and WebSockets. </div>
  <div> Get instant alerts before your users notice.</div>
 
</div>
<div className=" flex  gap-2  justify-center p-8">
<Link href="/register">
<button className="px-4 py-2 rounded-lg bg-gray-100 border text-black font-mono tracking-tighter">
Register
</button>

</Link>


<Link href="/login">


<button className="px-4 py-2 rounded-lg bg-gray-100 border text-black font-mono tracking-tighter">
Login
</button>

</Link>



</div>





 </div>

  
  )
}




