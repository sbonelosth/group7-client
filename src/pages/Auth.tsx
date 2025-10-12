import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

function Auth() {
  const [formMode, setFormMode] = useState("login");

  return (
    <div className="auth-container">
      <div className='form-toggle'>
        <button
          className={formMode === "login" ? "active" : ""}
          onClick={() => setFormMode("login")}
        >
          Login
        </button>
        <button
          className={formMode === "signup" ? "active" : ""}
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