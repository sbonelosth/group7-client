import React, { useState } from 'react'
import { useMernAccess } from 'mern-access-client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login() {
  const { login, verify, resetPassword } = useMernAccess();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await login(id, pw);

    if (res.success) {
      toast.success("Login successful!");
      setIsLoading(false);
      navigate("/dashboard");
    } else if (res.error.includes("not verified")) {
      toast.info(res.error || "Login failed");
      localStorage.setItem("userId", id);
      const _res = await verify(id, undefined);
      if (_res.success) {
        toast.success("OTP sent! Please check your email.");
        navigate("/verify");
      } else {
        toast.error(_res.error || "Failed to send OTP");
      }
    } else {
      toast.error(res.error || "Login failed");
    }
    setIsLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!id) {
      toast.warn("Email or username is required.");
      return;
    }

    const res = await resetPassword(id);
    
    if (res.success) {
      toast.success("OTP sent! Please check your email.");
      localStorage.setItem("userId", id);
      navigate("/reset");
    } else {
      toast.error(res.error || "Failed to send OTP");
    }
  };

  return (
    <div className="w-[420px] bg-[#e9e9e9] py-7 px-10 rounded-bl-xl rounded-br-xl shadow-md text-center">
      <h2 className="text-[#007bff] mb-6 text-xl font-bold">Welcome Back</h2>
      <form id="login-form" onSubmit={onSubmit}>
        <div className="text-left mb-5">
          <label htmlFor="username" className="block mb-1 text-[#555] font-bold">Email or username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={id}
            onChange={e => setId(e.target.value)}
            autoComplete="username"
            className="w-full p-2.5 border border-[#ddd] rounded box-border"
          />
        </div>
        <div className="text-left mb-5">
          <label htmlFor="password" className="block mb-1 text-[#555] font-bold">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={pw}
            onChange={e => setPw(e.target.value)}
            autoComplete="current-password"
            className="w-full p-2.5 border border-[#ddd] rounded box-border"
          />
          <div className="text-right mt-2.5">
            <button 
              type='button' 
              className="bg-none border-none text-[#0056b3] cursor-pointer p-0 text-base hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>
        </div>
        <button 
          type="submit" 
          id="submit-btn" 
          disabled={isLoading}
          className="w-full py-3 bg-[#007bff] text-white border-none rounded cursor-pointer text-base transition-colors hover:bg-[#0056b3]"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}

export default Login