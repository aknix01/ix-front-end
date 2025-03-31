import React from 'react'
import Navi from './Navi'
import { useState, useEffect } from 'react'
import {  addtocart, fetchproducts } from '../services/apicalls'
import { Await } from 'react-router-dom'
import { getSignedUrl } from '@aws-sdk/cloudfront-signer'
import Pagination from './Pagination'
import ReactPaginate from 'react-paginate'
import userPool from '../services/cognito/Userpool'
import { FormLabel } from 'react-bootstrap'


function Viewproduct() {


    const [product, setProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const user = userPool.getCurrentUser()
    const [selectedCategory, setSelectedCategory] = useState("");

    const extractName = (url) => {
        return url.substring(url.lastIndexOf("/") + 1)
    }


    const navcart = async (e) => {
        const data = {
            id: e.id,
            username: user.username,
            quantity: e.quantity
        }
        console.log(data)
        const result = await addtocart(data)
        console.log(result)
        if (result.status == 200) {
            alert("added to cart")
        }
        else {
            alert("already added Or something went wrong")
        }

    }
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 2;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = product
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((item) => {

            const imageName = extractName(item.image_url);
            return (
                <div className="product-card  col mt-2 my-3 my-lg-5 mx-5 col-lg-2">

                    <img
                        src={`https://d3cceuazvytzw7.cloudfront.net/uploads/${imageName}`}
                        alt=""
                        className="product-image" />
                    <h3
                        style={{
                            color: "black"
                        }}
                        className="product-name mt-5">{item.name}</h3>
                    <p className="product-price">{item.description}</p>
                    <p className="product-price">${item.price}</p>
                    <button
                        onClick={() => navcart(item)}
                        className="add-to-cart-btn mx-2">Add to Cart</button>
                    {/* <Button><i class="fa-solid fa-heart-circle-plus"></i></Button> */}
                    <button
                        onClick={
                            () => wish(item)}
                        className=""
                        style={{
                            color: "white",
                            backgroundColor: "#C8BDE5",
                            border: " none",
                            padding: " 8px 16px",
                            borderRadius: "4px"
                        }}

                    > Buy Now</button>
                </div>)
        });

    const pageCount = Math.ceil(product.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);

    };




    const fetch = async () => {
        const result = await fetchproducts()
        if (selectedCategory == "viewall") {
            setProduct(result.data.body.data)
        }
        else if (selectedCategory) {
            // Filter products based on selected category
            const filteredProducts = result.data.body.data.filter(
                (item) => item.category === selectedCategory
            );
            setProduct(filteredProducts);
        }
        else {
            setProduct(result.data.body.data)

        }


    }





    const fitler = () => {

    }

    console.log(selectedCategory)
    console.log(product)


    useEffect(() => {
        fetch()
    }, [selectedCategory])

    return (
        <>
            <Navi />
            <div>
                {
                    user && (
                        <div className='d-flex justify-content-center'><span style={{
                            alignSelf: "center"
                        }}>welcome User: {user.username}</span></div>
                    )
                }


            </div>
            <div
                style={{
                    backgroundColor: "#BDE0A6",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: ""
                }}
            >
                <FormLabel style={{
                    fontSize: "15px"
                }} className='mt-4'>
                    View categorywise: 
                </FormLabel>
                <select
                    className='mt-2'
                    id="category"
                    value={selectedCategory}
                    onChange={handleChange}
                    style={{
                        padding: "8px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    }}
                >
                    <option value="" disabled>Select an category</option>
                    <option value="viewall">View All</option>
                    <option value="one">One</option>
                    <option value="two">Two</option>
                    <option value="three">Three</option>
                    <option value="four">Four</option>
                    <option value="five">Five</option>
                </select>
                {/* <FormLabel>
                    select Price range
                </FormLabel>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleChange}
                    style={{
                        padding: "8px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    }}
                >
                    <option value="" disabled>Select an option</option>
                    <option value="one">One</option>
                    <option value="two">Two</option>
                    <option value="three">Three</option>
                    <option value="four">Four</option>
                    <option value="five">Five</option>
                </select> */}




            </div>


           
            <div style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "100vw",
                backgroundColor: "#BDE0A6"
            }}>
                <div className='App row'>
                    {displayUsers}

                </div>
                <div className='d-flex mt-4 mb-3  justify-content-center'>
                    <ReactPaginate

                        previousLabel={"Prev"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"} />
                </div>


            </div>



        </>




    )
}

export default Viewproduct