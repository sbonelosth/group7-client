import React, { useState } from 'react'
import { useMernAccess } from 'mern-access-client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ResetPwd = () => {
    const { resetPassword } = useMernAccess();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");

        if (!userId) {
            toast.error("Missing user identifier. Please restart the reset process.");
            navigate("/auth");
            return;
        }
        setIsLoading(true);
        const res = await resetPassword(userId as string, otp, newPassword);
        if (res.success) {
            toast.success("Password reset successful! Redirecting...");
            localStorage.removeItem("userId");
            navigate("/auth");
        } else {
            toast.error(res.error || "Failed to reset password");
        }
        setIsLoading(false);
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-[#2c3e5011] backdrop-blur-sm">
            <div className="w-[420px] bg-[#e9e9e9] py-7 px-10 rounded-xl shadow-md text-center">
                <h2 className="text-[#007bff] mb-6 text-xl font-bold">Reset Password</h2>
                <form id="login-form" onSubmit={onSubmit}>
                    <div className="text-left mb-5">
                        <label htmlFor="otp" className="block mb-1 text-[#555] font-bold">OTP</label>
                        <input
                            type="text"
                            name="otp"
                            required
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            className="w-full p-2.5 border border-[#ddd] rounded box-border font-mono text-center"
                            maxLength={6}
                        />
                    </div>
                    <div className="text-left mb-5">
                        <label htmlFor="password" className="block mb-1 text-[#555] font-bold">New Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className="w-full p-2.5 border border-[#ddd] rounded box-border"
                        />
                    </div>
                    <button 
                        type="submit" 
                        id="submit-btn" 
                        disabled={isLoading}
                        className="w-full py-3 bg-[#007bff] text-white border-none rounded cursor-pointer text-base transition-colors hover:bg-[#0056b3] disabled:opacity-50"
                    >
                        {isLoading ? "Resetting password..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPwd