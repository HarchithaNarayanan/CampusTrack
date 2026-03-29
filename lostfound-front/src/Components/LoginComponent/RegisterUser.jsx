import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from '../../Services/LoginService';
import '../../DisplayView.css';

const RegisterUser = () => {
  const [lostFoundUser, setLostFoundUser] = useState({
    username: "", password: "", personalName: "", email: "", role: "",
    department: "", yearOfStudy: ""
  });
  const [flag, setFlag] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const emailPattern = /^[^\s@]+@university\.edu$/i;

  const createNewUser = (event) => {
    event.preventDefault();
    if (lostFoundUser.password === confirmPassword) {
      registerNewUser(lostFoundUser).then(() => setFlag(true));
    }
  };

  useEffect(() => { setFlag(false); }, []);

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setLostFoundUser(values => ({ ...values, [name]: value }));
  };

  const returnBack = () => { navigate('/'); };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;
    if (!lostFoundUser.username.trim()) { tempErrors.username = "Username is required"; isValid = false; }
    if (!lostFoundUser.password.trim()) { tempErrors.password = "Password is required"; isValid = false; }
    else if (lostFoundUser.password.length < 5 || lostFoundUser.password.length > 10) { tempErrors.password = "Password must be 5–10 characters"; isValid = false; }
    else if (lostFoundUser.password !== confirmPassword) { tempErrors.password = "Passwords do not match"; isValid = false; }
    if (!lostFoundUser.personalName.trim()) { tempErrors.personalName = "Personal name is required"; isValid = false; }
    if (!lostFoundUser.email.trim()) { tempErrors.email = "Email is required"; isValid = false; }
    else if (!emailPattern.test(lostFoundUser.email)) { tempErrors.email = "Only @university.edu emails allowed"; isValid = false; }
    if (!lostFoundUser.role.trim()) { tempErrors.role = "Role is required"; isValid = false; }
    if (!lostFoundUser.department.trim()) { tempErrors.department = "Department is required"; isValid = false; }
    if (lostFoundUser.role === 'Student' && !lostFoundUser.yearOfStudy.trim()) { tempErrors.yearOfStudy = "Year of study is required"; isValid = false; }
    if (!confirmPassword.trim()) { tempErrors.confirmPassword = "Please confirm your password"; isValid = false; }
    setErrors(tempErrors);
    if (isValid) createNewUser(event);
  };

  return (
    <div className="ct-login-page">
      <div className="ct-login-card" style={{ maxWidth: '520px' }}>
        <div className="ct-login-logo">
          <h1>🎓 CampusTrack</h1>
          <p>Create Your Account</p>
        </div>

        <div className="ct-title">New User Registration</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="ct-form-group">
            <label>Username</label>
            <input placeholder="username" name="username" value={lostFoundUser.username} onChange={onChangeHandler} />
            {errors.username && <span className="ct-error">{errors.username}</span>}
          </div>
          <div className="ct-form-group">
            <label>Personal Name</label>
            <input placeholder="full name" name="personalName" value={lostFoundUser.personalName} onChange={onChangeHandler} />
            {errors.personalName && <span className="ct-error">{errors.personalName}</span>}
          </div>
          <div className="ct-form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Email</label>
            <input placeholder="email@example.com" name="email" value={lostFoundUser.email} onChange={onChangeHandler} />
            {errors.email && <span className="ct-error">{errors.email}</span>}
          </div>
          <div className="ct-form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Role</label>
            <input list="roles" name="role" placeholder="Select role" value={lostFoundUser.role} onChange={onChangeHandler} />
            <datalist id="roles">
              <option value="Student" />
              <option value="Admin" />
            </datalist>
            {errors.role && <span className="ct-error">{errors.role}</span>}
          </div>
          <div className="ct-form-group">
            <label>Department</label>
            <input placeholder="e.g. Computer Science" name="department" value={lostFoundUser.department} onChange={onChangeHandler} />
            {errors.department && <span className="ct-error">{errors.department}</span>}
          </div>
          {lostFoundUser.role === 'Student' && (
            <div className="ct-form-group">
              <label>Year of Study</label>
              <input placeholder="e.g. 3rd Year" name="yearOfStudy" value={lostFoundUser.yearOfStudy} onChange={onChangeHandler} />
              {errors.yearOfStudy && <span className="ct-error">{errors.yearOfStudy}</span>}
            </div>
          )}
          <div className="ct-form-group">
            <label>Password</label>
            <input type="password" name="password" value={lostFoundUser.password} onChange={onChangeHandler} />
            {errors.password && <span className="ct-error">{errors.password}</span>}
          </div>
          <div className="ct-form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {errors.confirmPassword && <span className="ct-error">{errors.confirmPassword}</span>}
          </div>
        </div>

        {flag && (
          <div className="ct-success-msg">
            ✅ Account created! &nbsp;
            <button className="ct-btn ct-btn-green" onClick={returnBack} style={{ padding: '5px 14px', fontSize: '0.82rem' }}>Go to Login</button>
          </div>
        )}

        <div className="ct-btn-group" style={{ marginTop: '20px' }}>
          <button className="ct-btn ct-btn-primary" onClick={handleValidation} style={{ flex: 1 }}>Register</button>
          <button className="ct-btn ct-btn-gold" onClick={returnBack}>Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;