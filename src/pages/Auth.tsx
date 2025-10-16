import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

function Auth() {
  const [formMode, setFormMode] = useState("login");

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#2c3e5011] backdrop-blur-sm">
      <div className="w-[420px] flex justify-center">
        <button
          className={`w-full text-black border-none rounded-tl-xl rounded-tr-xl rounded-br-none rounded-bl-none py-5 px-5 cursor-pointer text-xl transition-all ${
            formMode === "login" ? "bg-[#e9e9e9] shadow-[0_-4px_8px_#0000001a] font-bold" : "bg-transparent"
          } hover:bg-transparent`}
          onClick={() => setFormMode("login")}
        >
          Login
        </button>
        <button
          className={`w-full text-black border-none rounded-tl-xl rounded-tr-xl rounded-br-none rounded-bl-none py-5 px-5 cursor-pointer text-xl transition-all ${
            formMode === "signup" ? "bg-[#e9e9e9] shadow-[0_-4px_8px_#0000001a] font-bold" : "bg-transparent"
          } hover:bg-transparent`}
          onClick={() => setFormMode("signup")}
        >
          Signup
        </button>
      </div>
      {formMode === "login" && <Login />}
      {formMode === "signup" && <Signup />}
    </div>
  )
}

export default Auth