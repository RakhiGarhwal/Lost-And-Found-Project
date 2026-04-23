import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password
      });

      window.location = "/";
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <div className="container">
      <h2>📝 Register</h2>

      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}