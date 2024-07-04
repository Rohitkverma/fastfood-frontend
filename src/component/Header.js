import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Model';
import Cart from '../screen/Cart';
import { useCart } from './ContextReducer';
import swal from 'sweetalert';

export const Header = () => {
  const navigate = useNavigate();

  const[cartView, setCartView] = useState(false);

  let data = useCart();

  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    swal({
      text: "Logged Out",
      icon: "success",
      buttons: false,
      timer: 3000,
    })
    navigate("/login")
  }
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bgHeader">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 fst-italic" to="/">FastFood</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                </li>
                {
                  (localStorage.getItem('authToken')) ?
                    <li className="nav-item">
                      <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                    </li>
                    : ""
                }
              </ul>

              {(!localStorage.getItem('authToken')) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-secondary mx-1 " to="/login">Login</Link>
                <Link className="btn bg-white text-secondary mx-1" to="/creatuser">SignUp</Link>
              </div>
              : 
              <div>
                <div className='btn bg-white text-secondary mx-2' onClick={()=>{setCartView(true)}}>
                  My Cart {" "}
                  <Badge pill bg='danger'>{data.length}</Badge>
                </div>
                  {cartView ? <Modal onClose={()=>setCartView(false)}><Cart></Cart></Modal> : null}
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  LogOut
                </div>
              </div>}



            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
