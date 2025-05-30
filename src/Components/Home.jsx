import React, { useEffect, useState } from 'react'
import Navi from './Navi'
import Carousel from 'react-bootstrap/Carousel';
import slider1 from "../assets/slider1.png"
import slider2 from "../assets/slider2.webp"
import slider3 from "../assets/slider3.jpg"
import { useNavigate } from 'react-router-dom';
import { fetchproducts } from '../services/apicalls';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer from './Footer';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';




function Home() {


  const navigate = useNavigate()
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true);



  const fetch = async () => {
    const result = await fetchproducts()
    if (result.success) {
      setProduct(result.data.body.data)
    }
    setLoading(false);
  }
  const extractName = (url) => {
    return url.substring(url.lastIndexOf("/") + 1)

  }

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {

  }, [product])

  console.log(product)


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

      <div>
        <Navi />
        <div className='' style={{
          backgroundColor: "#E4F5EC",
          paddingTop: "90px",

          height: "auto"

        }}>

          <div className='d-block d-md-none'> {/* Display only on small screens, hide on medium and up */}
            <Carousel variant='dark' fade className='mt-3'>
              <Carousel.Item>
                <img
                  style={{
                    borderRadius: "15px",
                    width: "100%", // Full width of container
                    height: "40vh", // Shorter height for mobile
                    objectFit: "fit"
                  }}
                  src="https://d3cceuazvytzw7.cloudfront.net/carousel/slider1.png"
                  alt="Mobile carousel slide"
                />
                {/* <Carousel.Caption style={{
                  color: "black",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: "8px",
                  padding: "5px",
                  fontSize: "smaller" // Smaller text for mobile screens
                }}>
                  <h5>Mobile View Slide</h5>
                  <p className="small">Mobile-optimized caption text</p>
                </Carousel.Caption> */}
              </Carousel.Item>
              <Carousel.Item className='d-flex justify-content-center'>
                <img  style={{
                    borderRadius: "15px",
                    width: "100%", // Full width of container
                    height: "40vh", // Shorter height for mobile
                    objectFit: "fit"
                  }} src="https://d3cceuazvytzw7.cloudfront.net/carousel/banner-home3-01-1.jpg" alt="" />
                
                
              </Carousel.Item><Carousel.Item className='d-flex justify-content-center'>
                <img style={{
                    borderRadius: "15px",
                    width: "100%", // Full width of container
                    height: "40vh", // Shorter height for mobile
                    objectFit: "fit"
                  }} src="https://d3cceuazvytzw7.cloudfront.net/carousel/slider2.webp" alt="" />
                
              </Carousel.Item>    <Carousel.Item className='d-flex justify-content-center'>
                <img  style={{
                    borderRadius: "15px",
                    width: "100%", // Full width of container
                    height: "40vh", // Shorter height for mobile
                    objectFit: "fit"
                  }} src="https://d3cceuazvytzw7.cloudfront.net/carousel/slider3.jpg" alt="" />
               
              </Carousel.Item>

              {/* Add more Carousel.Items for mobile as needed */}

            </Carousel>
          </div>
          <div className='d-none d-md-block'> {/* Hide on small screens, display from medium screens up */}
            <Carousel variant='dark' fade style={{
              color: "black"
            }} className='mt-container '>
              <Carousel.Item className='d-flex justify-content-center'>
                <img style={{
                  borderRadius: "20px",
                  width: "50vw",
                  height: "30vh", alignSelf: "center"
                }} src="https://d3cceuazvytzw7.cloudfront.net/carousel/slider1.png" alt="" />
                <Carousel.Caption style={{
                  color: "black"
                }}>
                  {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className='d-flex justify-content-center'>
                <img style={{
                  borderRadius: "20px",
                  width: "50vw",
                  height: "30vh", alignSelf: "center"
                }} src="https://d3cceuazvytzw7.cloudfront.net/carousel/banner-home3-01-1.jpg" alt="" />
                
                
              </Carousel.Item>
              <Carousel.Item className='d-flex justify-content-center'>
                <img style={{
                  borderRadius: "20px",
                  width: "50vw",
                  height: "30vh", alignSelf: "center"
                }} src="https://d3cceuazvytzw7.cloudfront.net/carousel/slider2.webp" alt="" />
                
              </Carousel.Item>
              <Carousel.Item className='d-flex justify-content-center'>
                <img style={{
                  borderRadius: "20px",
                  width: "50vw",
                  height: "30vh", alignSelf: "center"
                }} src="https://d3cceuazvytzw7.cloudfront.net/carousel/slider3.jpg" alt="" />
               
              </Carousel.Item>
            </Carousel>
          </div>
          {/* {loader && <div className='d-flex justify-content-center my-5'>
    <CircularProgress color="success" />
    </div>
} */}
          <div className='container '>
            <div className='d-flex my-3'> <div className='bg-success' style={{
              height: "35px",
              width: "20px",

              borderRadius: "5px",

            }}> </div><span className='mx-2 ' style={{
              alignSelf: "center",
              fontSize:"19px",
              fontWeight: "400", fontFamily: 'Archivo'
            }}  >This  Month</span></div>
            <div className='d-flex justify-content-space-between mb-5 '>
              <h3 style={{
                fontFamily: 'Archivo',
                fontWeight: "400",
                display: "inline",
                textAlign: "center"
              }}>Best  Selling  Products </h3>
              <div className='ms-5 ' style={{
                display: "inline",

              }}>
                <button onClick={() => navigate("/products")}
                  style={{

                    color: "",
                    fontFamily: 'Archivo',
                    fontWeight: ""


                  }} className='btn btn-success mx-5'>View all</button>
              </div>
            </div>
            <div className='d-flex justify-content-evenly row'>

              {product.slice(0, 4).map((item) => {

                const imageName = extractName(item.image_url)
                return (
                  <div className=' mb-4 col-lg-2 ' >
                    <Card style={{


                      margin: "auto",
                      maxWidth: "200px"
                    }} sx={{ maxWidth: 300 }}>
                      <CardMedia

                        component="img"
                        alt={item.name}
                        height="150"
                        image={`https://d3cceuazvytzw7.cloudfront.net/uploads/${imageName}`}
                        style={{
                          objectFit: "fit"

                        }}
                      />
                      <CardContent className='d-flex justify-content-center flex-column'>
                        <Typography gutterBottom variant="h6" style={{
                          fontWeight: "500", fontFamily: "Archivo",
                          alignSelf: "center"
                        }} component="div">
                          {item.name}
                        </Typography>
         <Typography variant="body2" style={{
                          fontWeight: "bold",
                          color: "green",
                          alignSelf: "center"
                        }} sx={{ color: 'text.secondary' }}>
                          ${item.price}
                        </Typography>
                      </CardContent>

                    </Card>

                  </div>
                )
              })}
            </div>
          </div>


        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
