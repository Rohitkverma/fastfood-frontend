import React, { useEffect, useState } from 'react'
import { Footer } from '../component/Footer'
import { Header } from '../component/Header'
import { Puff} from 'react-loader-spinner'

export const MyOrder = () => {
    const baseUrl="https://fastfood-backend2.onrender.com";
    const [orderData, setorderData] = useState({})
    const[loading, setLoading] = useState(true)
    const fetchMyOrder = async () => {
        setLoading(true);
        console.log(localStorage.getItem('userEmail'))
        await fetch(baseUrl+"/api/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
            setLoading(false)
        }).catch((error)=>{
            console.log("the error in Fatching data from database "+error)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, []);

    return (
        <>
            <div>
                <Header />
            </div>

            <div className='container'>
                {
                    loading ? <div className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}><Puff color="#00BFFF" height={100} width={100} /></div> : 
                <div className='row'>

                    {orderData.length !== 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        
                                                        <hr />
                                                    </div> :
                                                        
                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                                <div className="card-body text-dark">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0 text-dark' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : <div className='m-5 w-100 text-center fs-3 test-success'>This Field is Empty</div>
                        )
                    }) : <div>this field is empty</div>}
                </div>
                }

            </div>

            <div>
            <Footer />
            </div>

        </>
    )
}
