import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function RegisterPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false)
  const auth = getAuth();

  const register=async()=>{
      try {
          setLoading(true)
          const result = await createUserWithEmailAndPassword(auth, email, password)
          console.log(result)
          setLoading(false)
          toast.success('Registration successful')
          setEmail('')
          setPassword('')
          setCpassword('')
      } catch (error) {
          console.log(error)
          toast.error('Registration failed')
          setLoading(false)
      }
  }


  return (
    <div className="register-parent">
        {loading && (<Loader />)}
      <div className="register-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5 lottie-player">
          <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_vzha3j1t.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4 z1">
          <div className="register-form">
            <h2>Register</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />

            <button className="my-3" onClick={register}>Register</button>

            <hr />
            <Link to="/Login">Click Here To Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
