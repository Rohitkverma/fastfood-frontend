import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import swal from 'sweetalert';

export const Card = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");


  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      } else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        return
      }
      return
      
    }
    swal({
      text: "Order placed",
      icon: "success",
      buttons: false,
      timer: 2000,
    })
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    // console.log(data)
  }

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  return (
    <>
      <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "400px", boxShadow: "0 0 5px 2px rgba(255, 255, 255, 0.5)"  }}>
        <img src={props.foodItem.img} className="cardImg card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
        <div className="card-body bg-dark text-light">
          <h5 className="card-title d-flex ">{props.foodItem.name}</h5>
          {/* <p className="card-text d-flex">this is me from jaipur</p> */}
          <div className='w-100'>
            <select className='m-2 h-100 bgOrange rounded' onChange={(e) => { setQty(e.target.value) }}>
              {
                Array.from(Array(6), (e, i) => {
                  return <option key={i + 1} value={i + 1}>{i + 1}</option>
                })
              }
            </select>

            <select className='m-2 h-100 bgOrange rounded' ref={priceRef} onChange={(e) => { setSize(e.target.value) }}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })
              }
            </select>

            <div className='d-inline h-100 fs-5'>
              ₹ {finalPrice}-/
            </div>

            <hr></hr>
            <buttom className="btn btn-outline-warning justify-content-center ms-2" onClick={handleAddToCart}>Add to cart</buttom>
          </div>
        </div>
      </div>
    </>
  )
}
