import React from 'react';
// import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../component/ContextReducer';
import swal from 'sweetalert';

export default function Cart() {
  const baseUrl="https://fastfood-backend2.onrender.com";
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 test-success'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    try {
      let userEmail = localStorage.getItem("userEmail");
  
      if (!userEmail) {
        console.error("User email not found in localStorage");
        return;
      }
  
      if (!data || data.length === 0) {
        console.error("Order data is empty");
        return;
      }

  
      // Make the POST request to the server
      let response = await fetch(baseUrl+"/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
  
      console.log("JSON RESPONSE:::::", response.status);
  
      if (response.status === 200) {
        dispatch({ type: "DROP" });
        swal({
          text: "Check out successfully",
          icon: "success",
          buttons: false,
          timer: 3000,
        })
      } else {
        // Handle non-200 status codes
        let errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      swal({
        text: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      })
      console.error("Error during checkout:", error);
    }
  };
  


  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table  text-warning'>
          <thead className='text-warning fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className='text-white'>
                <th  scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                    {/* this will remove item from cart */}
                  <button
                    type="button"
                    className="btn p-0 deleteIcon"
                    onClick={() => dispatch({ type: "REMOVE", index: index })}
                  >
                    <svg className='deleteIcon' width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z" fill="#FFFFFF"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn btn-outline-warning mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}