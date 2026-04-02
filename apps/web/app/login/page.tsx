"use client"
import { useRef } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"



const Login = () => {
    const router = useRouter()



    const usernameRef = useRef<HTMLInputElement | null > (null)
    const passwordRef = useRef <HTMLInputElement | null > (null)


async function login (){

 const username = usernameRef.current?.value
        const password = passwordRef.current?.value

    try{
    const response = await axios.post("http://localhost:5000/api/auth/login", {
     username , 
     password 
    }, {
     withCredentials: true
    })
    if (response.data.data.user?.hasOnboarded) {
        router.push("/dashboard")
       } else {
        router.push("/onboarding")
       }

    } catch(error){
        console.error("there was an error during login" , error)
    }
}

return(

    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4 bg-[rgb(240,235,229)]" >

 <input ref={usernameRef} placeholder="username" className="border text-black p-2 font-mono  "    />
  <input ref={passwordRef} placeholder="password" className="border text-black p-2 font-mono  "    />

<button onClick={login} className="px-4 py-2 rounded-lg bg-gray-100 border text-black font-mono tracking-tighter" >
Login
</button>

    </div>

)



}

export default Login 