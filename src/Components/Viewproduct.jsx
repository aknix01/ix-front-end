
import React from 'react'
import Navi from './Navi'
import { useState, useEffect } from 'react'
import { addtocart, fetchproducts } from '../services/apicalls'
import { Await, useNavigate } from 'react-router-dom'
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
import Slider from '@mui/material/Slider';
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import { TbShoppingCartPlus } from "react-icons/tb";
import { TbHeartPlus } from "react-icons/tb";


const TruncatedDescription = ({ description, maxLength = 50 }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    // Check if truncation is needed
    const needsTruncation = description.length > maxLength;
    const truncatedText = needsTruncation
        ? `${description.substring(0, maxLength)}...`
        : description;

    const handleMouseEnter = (event) => {
        if (needsTruncation) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Typography
                variant="body2"
                style={{ alignSelf: "center" }}
                sx={{ color: 'text.secondary' }}
            >
                {truncatedText}
            </Typography>

            <Popover
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={handleMouseLeave}
                disableRestoreFocus
                sx={{
                    pointerEvents: 'none',
                }}
            >
                <Box sx={{ p: 2, maxWidth: 300 }}>
                    <Typography variant="body2">{description}</Typography>
                </Box>
            </Popover>
        </div>
    );
};

function Viewproduct() {
    const [product, setProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    //token are initialised
    const [refreshToken, setRefreshToken] = useState("")
    const [accessToken, setAccessToken] = useState("")
    const [idtoken, setIdtoken] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [priceRange, setPriceRange] = useState([0, 100]);


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

                setRefreshToken(session.getRefreshToken().getToken())
                // console.log("refresh token", refreshToken);
            }
        });
    }

    const details = async(item)=>{
        navigate("/details",{state:{item}})
    }
    const navcart = async (e) => {

        if (sessionStorage.getItem("Role")) {
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
        else {
            toast.warn("Please login ")
            navigate("/login")

        }

    }
    console.log("idtoken", idtoken);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 8;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = product.slice(pagesVisited, pagesVisited + usersPerPage).map((item, index) => {

        const imageName = extractName(item.image_url);
        return (

            <div key={index} className='col mt-2 my-3 my-lg-5 mx-4 col-lg-2'>
                <Card sx={{ maxWidth: 345 }} style={{
                    cursor:"pointer"
                }}  onClick={() => details(item)} >
                    <CardMedia
                        component="img" 
                        alt="product image"  
                        height="140px"
                        image={`https://d3cceuazvytzw7.cloudfront.net/uploads/${imageName}`}
                        style={{ objectFit: "cover" }}
                    />
                    <CardContent className='d-flex justify-content-center flex-column'>
                        <Typography gutterBottom variant="h5" style={{
                            fontFamily: "PT Sans Narrow",
                            fontWeight: "bold",
                            alignSelf: "center"
                        }} component="div">
                            {item.name}
                        </Typography>

                        {/* Replace the existing Typography with our custom component */}
                        <Typography variant="body2" style={{
                            alignSelf: "center"
                        }} sx={{ color: 'text.secondary' }}>
                            <TruncatedDescription description={item.description} maxLength={15} />

                        </Typography>

                        <Typography variant="body2" 
                        className='mt-2' style={{
                            fontWeight: "bold",

                            color: "red",
                            alignSelf: "center"
                        }} sx={{ color: 'text.secondary' }}>
                            ${item.price}
                        </Typography>
                    </CardContent>
                    <CardActions className='d-flex justify-content-center ' >
                        {/* <Button size="small">Share</Button> */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navcart(item);
                            }}
                            style={{
                                fontSize: "20px"
                            }}
                            className="add-to-cart-btn  "><TbShoppingCartPlus />

                           
                           </button>
                           
                        <button
                        
                             onClick={(e) => e.stopPropagation()}
                            style={{
                                fontSize: "20px"
                            }}
                            className="add-to-cart-btn  "><TbHeartPlus /></button>
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

    const handlePriceChange = (event) => {
        setPriceRange([0, parseInt(event.target.value)]);
    };



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
        <Footer />
    </div>;
    return (
        <>

            <div style={{
                backgroundColor: "#E4F5EC",
                minHeight: "100vh"
            }}>
                <Navi />

                <div className="" style={{ paddingTop: "80px" }}>
                    <div className="row">
                        {/* Left Sidebar Filter Column */}
                        <div style={{
                            height: "70vh",
                            backgroundColor: "#E4F5EC"
                        }}
                            className="col-md-3 col-lg-2 mt-5 mb-4 position-fixd">
                            <div style={{

                                backgroundColor: "#E4F5EC"
                            }} className="card ms-3 shadow-sm">
                                <div className="card-header ">
                                    <h5 className="mb-0"
                                        style={{ fontFamily: 'PT Sans Narrow', textAlign: "center" }}>Filter </h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex flex-column">
                                        <button
                                            onClick={() => setSelectedCategory("one")}
                                            className={`btn mb-2 text-start ${selectedCategory === "one" ? "btn-dark" : "btn-outline-dark"}`}
                                            style={{ borderRadius: "20px", fontSize: "14px" }}>
                                            Vegetables
                                        </button>
                                        <button
                                            onClick={() => setSelectedCategory("two")}
                                            className={`btn mb-2 text-start ${selectedCategory === "two" ? "btn-dark" : "btn-outline-dark"}`}
                                            style={{ borderRadius: "20px", fontSize: "14px" }}>
                                            Grains
                                        </button>
                                        <button
                                            onClick={() => setSelectedCategory("three")}
                                            className={`btn mb-2 text-start ${selectedCategory === "three" ? "btn-dark" : "btn-outline-dark"}`}
                                            style={{ borderRadius: "20px", fontSize: "14px" }}>
                                            Oil
                                        </button>
                                        <button
                                            onClick={() => setSelectedCategory("four")}
                                            className={`btn mb-2 text-start ${selectedCategory === "four" ? "btn-dark" : "btn-outline-dark"}`}
                                            style={{ borderRadius: "20px", fontSize: "14px" }}>
                                            Fruits
                                        </button>
                                        <button
                                            onClick={() => setSelectedCategory("five")}
                                            className={`btn mb-2 text-start ${selectedCategory === "five" ? "btn-dark" : "btn-outline-dark"}`}
                                            style={{ borderRadius: "20px", fontSize: "14px" }}>
                                            Spices
                                        </button>
                                        <button
                                            onClick={() => setSelectedCategory("viewall")}
                                            className={`btn mb-2 text-start ${selectedCategory === "viewall" ? "btn-dark" : "btn-outline-dark"}`}
                                            style={{ borderRadius: "20px", fontSize: "14px" }}>
                                            View All
                                        </button>
                                    </div>
                                </div>
                                <h6 className="fw-bold text-center" style={{ fontFamily: 'PT Sans Narrow' }}>Price Range</h6>
                                <div className="d-flex justify-content-between mx-1">
                                    <span>{priceRange[0]}</span>
                                    <span>{priceRange[1]}</span>
                                </div>
                                <input
                                    style={
                                        {
                                            backgroundColor: "green",
                                            maxWidth: "170px"

                                        }
                                    }
                                    type="range"
                                    className="form-range mx-2"
                                    min="0"
                                    max="500"
                                    value={priceRange[1]}
                                    onChange={handlePriceChange}
                                />
                                <div className="text-center my-2">
                                    <span className="badge bg-success">
                                        Selected: ${priceRange[0]} - ${priceRange[1]}
                                    </span>
                                </div>
                            </div>


                        </div>

                        {/* Main Content Area */}
                        <div className="col-md-9 col-lg-10">
                            <div className="row">
                                {displayUsers}
                            </div>

                            <div className='d-flex mt-4 mb-3 justify-content-center'>
                                <ReactPaginate
                                    previousLabel={<MdNavigateBefore />}
                                    nextLabel={<MdNavigateNext />}
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
                </div>
            </div>
            <Footer />
        </>




    )
}

export default Viewproduct