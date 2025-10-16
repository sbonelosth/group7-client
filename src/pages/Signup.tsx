import React, { useState } from 'react'
import { useMernAccess } from 'mern-access-client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Signup() {
  const { signup } = useMernAccess();
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({ email: "", username: "", password: "" });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signup(signupData);
    if (res.success) {
      localStorage.setItem("userId", signupData.username);
      toast.success("Signup successful! Please check your email for the OTP.");
      navigate("/verify");
    } else {
      toast.error(res.error || "Signup failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-[420px] bg-[#e9e9e9] py-7 px-10 rounded-bl-xl rounded-br-xl shadow-md text-center">
      <h2 className="text-[#007bff] mb-6 text-xl font-bold">Create Account</h2>
      <form id="signup-form" onSubmit={onSubmit}>
        <div className="text-left mb-5">
          <label htmlFor="new-username" className="block mb-1 text-[#555] font-bold">Username</label>
          <input
            type="text"
            id="new-username"
            name="new-username"
            required
            value={signupData.username}
            onChange={e => setSignupData({ ...signupData, username: e.target.value })}
            autoComplete="username"
            className="w-full p-2.5 border border-[#ddd] rounded box-border"
          />
        </div>
        <div className="text-left mb-5">
          <label htmlFor="email" className="block mb-1 text-[#555] font-bold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={signupData.email}
            onChange={e => setSignupData({ ...signupData, email: e.target.value })}
            autoComplete="email"
            className="w-full p-2.5 border border-[#ddd] rounded box-border"
          />
        </div>
        <div className="text-left mb-5">
          <label htmlFor="new-password" className="block mb-1 text-[#555] font-bold">
            Password:
            <span
              className='toggle-pwd ml-1 cursor-pointer text-[#3498db]'
              role="button"
              onClick={() => setIsPasswordHidden(!isPasswordHidden)}
            >
              {isPasswordHidden ? " Show" : " Hide"}
            </span>
          </label>
          <input
            type={isPasswordHidden ? "password" : "text"}
            id="new-password"
            name="new-password"
            required
            value={signupData.password}
            onChange={e => setSignupData({ ...signupData, password: e.target.value })}
            autoComplete="new-password"
            className="w-full p-2.5 border border-[#ddd] rounded box-border"
          />
        </div>
        <button 
          type="submit" 
          id="signup-btn"
          className="w-full py-3 bg-[#007bff] text-white border-none rounded cursor-pointer text-base transition-colors hover:bg-[#0056b3]"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  )
}

export default Signup