import React, { useState } from "react";
import API from "../services/api";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", form);
      alert(res.data.message);
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
        /><br />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
        /><br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
        /><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
