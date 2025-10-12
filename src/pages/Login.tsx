import React, { useState } from 'react'
import { useMernAccess } from 'mern-access-client'
import { useNavigate } from 'react-router-dom'
// Add this import if you use react-toastify
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
    <div className="login-container">
      <h2>Welcome Back</h2>
      <form id="login-form" onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="username">Email or username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={id}
            onChange={e => setId(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={pw}
            onChange={e => setPw(e.target.value)}
            autoComplete="current-password"
          />
          <div className="forgot-pwd" style={{ textAlign: 'right', marginTop: 10 }}>
            <button type='button' onClick={handleForgotPassword}>Forgot password?</button>
          </div>
        </div>
        <button type="submit" id="submit-btn" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}

export default Login