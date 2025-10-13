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
        <div className="auth-container">
            <div className="login-container">
                <h2>Reset Password</h2>
                <form id="login-form" onSubmit={onSubmit}>
                    <div className="input-group">
                        <label htmlFor="otp">OTP</label>
                        <input
                            type="text"
                            name="otp"
                            required
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" id="submit-btn" disabled={isLoading}>
                        {isLoading ? "Resetting password..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPwd