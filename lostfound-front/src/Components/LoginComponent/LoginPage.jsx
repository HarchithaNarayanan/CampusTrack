import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser } from '../../Services/LoginService';
import '../../DisplayView.css';

const LoginPage = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [flag, setFlag] = useState(true);

  const validateLogin = (e) => {
    e.preventDefault();
    validateUser(loginData.username, loginData.password).then((response) => {
      let role = String(response.data);
      if (role === "Admin") navigate('/admin-menu');
      else if (role === "Student") navigate('/student-menu');
      else setFlag(false);
    });
  };

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(true);
    const name = event.target.name;
    const value = event.target.value;
    setLoginData(values => ({ ...values, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;
    if (!loginData.username.trim()) { tempErrors.username = "Username is required"; isValid = false; }
    if (!loginData.password.trim()) { tempErrors.password = "Password is required"; isValid = false; }
    setErrors(tempErrors);
    if (isValid) validateLogin(event);
  };

  const registerNewUser = (e) => { navigate('/register'); };

  return (
    <div className="ct-login-page">
      <div className="ct-login-card">
        <div className="ct-login-logo">
          <h1>🎓 CampusTrack</h1>
          <p>Intelligent Lost &amp; Found Locator</p>
        </div>

        <div className="ct-title">Welcome Back</div>

        <div className="ct-form-group">
          <label>Username</label>
          <input
            placeholder="Enter your username"
            name="username"
            value={loginData.username}
            onChange={onChangeHandler}
          />
          {errors.username && <span className="ct-error">{errors.username}</span>}
        </div>

        <div className="ct-form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={loginData.password}
            onChange={onChangeHandler}
          />
          {errors.password && <span className="ct-error">{errors.password}</span>}
        </div>

        {!flag && <div className="ct-error-msg">❌ Invalid Username or Password</div>}

        <br />
        <div className="ct-btn-group">
          <button className="ct-btn ct-btn-primary" onClick={handleValidation} style={{ flex: 1 }}>
            Login
          </button>
        </div>

        <hr className="ct-divider" />

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: '#9B7FA6', marginBottom: '10px' }}>New to CampusTrack?</p>
          <button className="ct-btn ct-btn-gold" onClick={registerNewUser} style={{ width: '100%' }}>
            Register New User
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;