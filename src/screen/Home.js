import React, { useEffect, useState } from 'react'
import { Header } from '../component/Header';
import { Footer } from '../component/Footer';
import { Card } from '../component/Card';
export const Home = () => {
  const baseUrl="https://fastfood-backend2.onrender.com";
  const [search, setSearch] = useState([])
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch(baseUrl+'/api/foodData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'learning app'
      }
    });
    response = await response.json();
    // console.log(response[0], response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
      <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
                <div className="carousel-inner" id='crousel-fit'>
                    <div className='carousel-caption' style={{zIndex:"10"}}>
                        <div class="d-flex justify-content-center">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                            {/* <button class="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://media.istockphoto.com/id/998309062/photo/burger-with-beef-and-cheese.jpg?s=1024x1024&w=is&k=20&c=8dsV5BdPbebUGFkWuFenRKeaOe95BEnlcRkPqEo6PxA=" className="d-block w-100" style={{ filter: "brightness(70%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.southernliving.com/thmb/j_6gABRIAMegN6RFHxOgbUqBxjA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg" className="d-block w-100" style={{ filter: "brightness(70%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.istockphoto.com/id/1397193477/photo/club-sandwich-made-with-bacon-ham-turkey-cheese-lettuce-and-tomato.jpg?s=1024x1024&w=is&k=20&c=EgKaFxIZuleOPPoruSDanq1tuBmbP4paR9jTIu4G87o=" className="d-block w-100" style={{ filter: "brightness(70%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
      </div>

      {/* **** this is for data filter and for send props in Card  */}
      <div className='container-xxl'>
        {
          foodCat.length !== 0
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3 '>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />

                  {foodItem.length !== 0
                    ?
                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(String(search).toLocaleLowerCase())))
                      .map(filterItems => {
                        return (
                          <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodItem = {filterItems}
                              options = {filterItems.options[0]} 
                            ></Card>
                          </div>
                        )
                      }
                      ) : <div> No such data found</div>
                  }
                </div>
              )
            }) : "Loading..."
        }

      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
