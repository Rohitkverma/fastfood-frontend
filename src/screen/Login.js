import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export const Login = () => {
  const baseUrl="https://fastfood-backend2.onrender.com";
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  console.log(baseUrl)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl+'/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'learning app'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      if (!response.ok) {
        // Log the response for debugging
        const text = await response.text();
        // console.error('Response was not ok:', text);
        
        throw new Error(`Server error: ${response.status}`);
      }
      
      const json = await response.json();
      console.log(json);
      if(json.success){
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('authToken', json.authToken);
        console.log(localStorage.getItem('authToken'));
        swal({
          text: "Logged In",
          icon: "success",
          buttons: false,
          timer: 3000,
        })
        navigate('/');
      }
    } catch (error) {
      swal({
        text: "Invalid Credentials",
        icon: "error",
        buttons: false,
        timer: 3000,
      })
      // console.log('Authorization failed:', error.message);
      // alert("Enter correct email and password");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='container'>
        <div>
          <h1 className='m-3 d-flex justify-content-center align-item-center'>Login </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-outline-warning">Login</button>
          <Link to={'/creatuser'} className="m-3 btn btn-outline-danger">Create an account</Link>
        </form>
      </div>
    </>
  )
}
