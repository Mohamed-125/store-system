import { useEffect, useState } from "react";
import emailIcon from "../../assets/react.svg";
import avatarIcon from "../../assets/react.svg";
import locationIcon from "../../assets/react.svg";
import lockIcon from "../../assets/react.svg";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Form.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      navigate("/login");
    } catch (err) {
      console.log(err.message);

      switch (err.message) {
        case "Firebase: Error (auth/email-already-in-use).":
          alert("email already in use");
          break;
        case "Firebase: Password should be at least 6 characters (auth/weak-password)":
          alert("Password should be at least 6 characters");
          break;
        case "Firebase: Error (auth/invalid-email).":
          alert("invalid email");
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-div container">
        <form onSubmit={submitHandler}>
          <h2>Sign up</h2>
          <div className="input-icons-div  ">
            <img src={avatarIcon} />
            <input
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>

          <div className="input-icons-div  ">
            <img src={emailIcon} />
            <input
              type="email"
              required
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="input-icons-div  ">
            <img src={lockIcon} />
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="input-icons-div  ">
            <img src={locationIcon} />
            <input
              type="text"
              required
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>
          <div className="form-checkbox-div ">
            <input type="checkbox" />
            <p>
              I agree with <span>Terms</span> and
              <span>Privacy</span>
            </p>
          </div>
          <button type="submit">Submit</button>
          <p>
            Do you have an account already ?
            <span>
              <Link to={"/login"}> Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;