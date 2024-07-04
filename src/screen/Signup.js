import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export const Signup = () => {
    const baseUrl="https://fastfood-backend2.onrender.com";
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        geolocation: ''
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(baseUrl+'/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'learning app'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });

            if (!response.ok) {
                // Log the response for debugging
                const text = await response.text();
                console.error('Response was not ok:', text);
                throw new Error(`Server error: ${response.status}`);
            }

            const json = await response.json();
            swal({
                text: "Account created successfully",
                icon: "success",
                buttons: false,
                timer: 3000,
              })
            navigate('/login');
            console.log(json);
        } catch (error) {
            // console.log('Authorization failed:', error.message);
            swal({
                text: "Authorization failed: Enter valid Credentials",
                icon: "error",
                buttons: false,
                timer: 3000,
              })
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div>
                <h1 className='m-3 d-flex justify-content-center align-item-center'>SignUp </h1>
            </div>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputgeolocation" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-outline-warning">Submit</button>

                    <Link to={'/login'} className="m-3 btn btn-outline-danger">Already have account</Link>
                </form>
            </div>
        </>
    );
};