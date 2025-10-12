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
      toast.error(res.error?.error || "OTP verification failed");
      return;
    }

    toast.success("OTP verified! Logging you in...");
    navigate("/dashboard");
  };

  return (
    <div className="otp-container">
      <h2>Email Verification</h2>
      <form id="otp-form" onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="text"
            id="otp"
            name="otp"
            required
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
        </div>
        <button type="submit" id="otp-btn">{isLoading ? "Verifying OTP..." : "Verify OTP"}</button>
      </form>
    </div>
  )
}

export default VerifyOtp