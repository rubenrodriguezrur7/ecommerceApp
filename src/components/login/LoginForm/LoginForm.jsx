import { useId, useState } from "react";
import "./LoginForm.css";
useId;

const LoginForm = ({ onLogin }) => {
  const nameId = useId();
  const passwordId = useId();
  const [isPasswordVisible, setisPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newFormData = {...formData, [name]: value };

    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) return;

    onLogin(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor={nameId}>Email</label>
      </div>
      <input className="form-input"
        type="email"
        value={formData.email}
        onChange={handleChange}
        id={nameId}
        name="email"
       required
      />

      <div>
        <label htmlFor={passwordId}>Password</label>
      </div>
      <input className="form-input"
        type={isPasswordVisible ? "text": "password"}
        value={formData.password}
        onChange={handleChange}
        id={passwordId}
        name="password"
        required
      />
      <button
        type="button"
        onClick={() => setisPasswordVisible(!isPasswordVisible)}
      >
        <i className="bx bx-low-vision"></i>
      </button>

      <div className="form-login_button">
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;