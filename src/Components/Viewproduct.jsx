import React from 'react'
import Navi from './Navi'
import { useState, useEffect } from 'react'
import { addtocart, fetchproducts } from '../services/apicalls'
import { Await } from 'react-router-dom'
import { getSignedUrl } from '@aws-sdk/cloudfront-signer'

import ReactPaginate from 'react-paginate'
import userPool from '../services/cognito/Userpool'
import { FormLabel } from 'react-bootstrap'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer from './Footer'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



function Viewproduct() {


    const [product, setProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    //token are initialised
    const [refreshToken, setRefreshToken] = useState("")
    const [accessToken, setAccessToken] = useState("")
    const [idtoken, setIdtoken] = useState("")
    const [loading, setLoading] = useState(true)




    const user = userPool.getCurrentUser()
    const [selectedCategory, setSelectedCategory] = useState("");

    const extractName = (url) => {
        return url.substring(url.lastIndexOf("/") + 1)
    }

    const fetchTokens = async () => {
        user.getSession((err, session) => {
            if (err) {
                console.error("Error fetching session:", err);
            } else {

                setAccessToken(session.getAccessToken().getJwtToken())
                // console.log("accesstoken", accessToken);
                setIdtoken(session.getIdToken().getJwtToken())
                // console.log("idtoken", idtoken);
                setRefreshToken(session.getRefreshToken().getToken())
                // console.log("refresh token", refreshToken);
            }
        });
    }

    const navcart = async (e) => {
        const data = {
            id: e.id,
            username: user.username,
            quantity: e.quantity
        }

        const Header = {
            "Authorization": idtoken
        }
        console.log(data)
        const result = await addtocart(data, "add", Header)
        console.log(result)
        if (result.success) {
            toast.success("added to cart")
        }
        else {
            toast.error("already added Or something went wrong")
        }

    }
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 8;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = product.slice(pagesVisited, pagesVisited + usersPerPage).map((item) => {

        const imageName = extractName(item.image_url);
        return (

            <div className='col mt-2 my-3 my-lg-5 mx-5 col-lg-2'>
                <Card sx={{ maxWidth: 345 }}  >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={`https://d3cceuazvytzw7.cloudfront.net/uploads/${imageName}`}
                        style={{ objectFit: "cover" }}
                    />
                    <CardContent className='d-flex justify-content-center flex-column'>
                        <Typography gutterBottom variant="h5" style={{
                            fontWeight: "bold",
                            alignSelf: "center"
                        }} component="div">
                            {item.name}
                        </Typography>
                        <Typography variant="body2" style={{

                            alignSelf: "center"
                        }} sx={{ color: 'text.secondary' }}>
                            {/* {item.description}*/}
                            description
                        </Typography>
                        <Typography variant="body2" style={{
                            fontWeight: "bold",
                            color: "red",
                            alignSelf: "center"
                        }} sx={{ color: 'text.secondary' }}>
                            ${item.price}
                        </Typography>
                    </CardContent>
                    <CardActions className='d-flex justify-content-center' >
                        {/* <Button size="small">Share</Button> */}
                        <button
                            onClick={() => navcart(item)}
                            style={{
                                fontSize: "10px"
                            }}
                            className="add-to-cart-btn  ">Add to Cart</button>
                        <button
                            onClick={() => navcart(item)}
                            style={{
                                fontSize: "10px"
                            }}
                            className="add-to-cart-btn  ">Add to wishlist</button>
                    </CardActions>
                </Card>
            </div>


        )
    });

    const pageCount = Math.ceil(product.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
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
        setLoading(false)


    }





    const handleChange = (e) => {
        setSelectedCategory(e.target.value)

    }

    console.log(selectedCategory)
    console.log(product)


    useEffect(() => {
        fetch()
    }, [selectedCategory])

    useEffect(() => {
        // if(sessionStorage.getItem(Role)){
        //     setIdtoken(session.getIdToken().getJwtToken())
        // }
        fetchTokens()

    }, [])

    if (loading) return <div>
        <Navi />
        <div style={{
            paddingTop: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100dvh",
            backgroundColor: "#E4F5EC"
        }}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
        <Footer/>
    </div>;
    return (
        <>
            <div style={{
                backgroundColor: "#E4F5EC",
                height: "auto"

            }}>
                <Navi />
                <div>
                    {/* {
                    user && (
                        <div className='d-flex justify-content-center'><span style={{
                            alignSelf: "center"
                        }}>welcome User: {user.username}</span>
                        <button onClick={fetchTokens}>click here for token</button>
                        </div>
                    )
                } */}


                </div>
                <div style={{ paddingTop: "80px" }} className='d-flex  justify-content-center '>

                    <div className='d-flex justify-content-evenly' style={{
                        height: "50px",
                        width: "600px",
                        background: "#C8D4C3",
                        borderRadius: "20px"
                    }} >
                        <div style={{ alignSelf: "center", fontFamily: 'Roboto, sans-serif' }}>Select Category:</div>
                        <button
                            onClick={() => setSelectedCategory("one")}

                            style={{
                                borderRadius: "20px",
                                fontSize: "10px", backgroundColor: "black", color: "white"
                            }}
                            className='btn my-2 '>One</button>
                        <button
                            onClick={() => setSelectedCategory("two")}
                            style={{
                                borderRadius: "20px",
                                fontSize: "10px", backgroundColor: "black", color: "white"
                            }}
                            className='btn my-2 '>Two</button>
                        <button
                            onClick={() => setSelectedCategory("three")}
                            style={{
                                borderRadius: "20px",
                                fontSize: "10px", backgroundColor: "black", color: "white"
                            }}
                            className='btn my-2 '>Three</button>
                        <button
                            onClick={() => setSelectedCategory("four")}
                            style={{
                                borderRadius: "20px",
                                fontSize: "10px", backgroundColor: "black", color: "white"
                            }}
                            className='btn my-2 '>Four</button>
                        <button
                            onClick={() => setSelectedCategory("five")}
                            style={{
                                borderRadius: "20px",
                                fontSize: "10px", backgroundColor: "black", color: "white"
                            }}
                            className='btn my-2 '>Five</button>
                        <button
                            onClick={() => setSelectedCategory("viewall")}
                            style={{
                                borderRadius: "20px",
                                fontSize: "10px", backgroundColor: "black", color: "white"
                            }}
                            className='btn my-2 '>View All</button>



                    </div>
                </div>




                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100vw",
                    backgroundColor: ""
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



            </div>
            <Footer />
        </>




    )
}

export default Viewproduct