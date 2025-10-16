import React, { useState } from 'react'
import { useMernAccess } from 'mern-access-client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function VerifyOtp() {
  const { verify, isLoading } = useMernAccess();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await verify(id || "", otp);
    if (!res.success) {
      toast.error(res.error || "OTP verification failed");
      return;
    }

    toast.success("OTP verified! Logging you in...");
    navigate("/dashboard");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#2c3e5011] backdrop-blur-sm">
      <div className="w-[420px] bg-[#e9e9e9] py-7 px-10 rounded-xl shadow-md text-center">
        <h2 className="text-[#007bff] mb-6 text-xl font-bold">Email Verification</h2>
        <form id="otp-form" onSubmit={onSubmit}>
          <div className="text-left mb-5">
            <label htmlFor="otp" className="block mb-1 text-[#555] font-bold">Enter OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              required
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="w-full p-2.5 border border-[#ddd] rounded box-border font-mono text-center"
              maxLength={6}
            />
          </div>
          <button 
            type="submit" 
            id="otp-btn"
            className="w-full py-3 bg-[#007bff] text-white border-none rounded cursor-pointer text-base transition-colors hover:bg-[#0056b3]"
          >
            {isLoading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerifyOtp