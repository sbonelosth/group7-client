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
      toast.success("Signup successful! Please check your email for the OTP.");
      navigate("/verify");
    } else {
      toast.error(res.error || "Signup failed");
    }
    setIsLoading(false);
  };

  return (
      <div className="signup-container">
        <h2>Create Account</h2>
        <form id="signup-form" onSubmit={onSubmit}>
          <div className="input-group">
            <label htmlFor="new-username">Username</label>
            <input
              type="text"
              id="new-username"
              name="new-username"
              required
              value={signupData.username}
              onChange={e => setSignupData({ ...signupData, username: e.target.value })}
              autoComplete="username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={signupData.email}
              onChange={e => setSignupData({ ...signupData, email: e.target.value })}
              autoComplete="email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="new-password">
              Password:
              <span
                className='toggle-pwd'
                role="button"
                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                style={{ cursor: 'pointer', color: '#3498db' }}
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
            />
          </div>
          <button type="submit" id="signup-btn">{isLoading ? "Signing up..." : "Sign Up"}</button>
        </form>
      </div>
  )
}

export default Signup