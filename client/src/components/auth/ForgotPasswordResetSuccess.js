import React from 'react'
import "../css/auth/ForgotPassword.css";

export default () => {
  return (
    <div>
      <div>
      <div className="forgot-password-container">
        <div className="forgot-password-box">
          <div>
            <p className="forgot-password-title">Congrats !!</p>
          </div>
          <p className="forgot-password-subtitle">
            Your password has been rest successfully .
          </p>

          <div className="forgot-password-link-container">
            <div className="forgot-password-right-links">
              <a
                className="forgot-password-create-account-link forgot-password-link"
                href="/login"
              >
                Login!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
