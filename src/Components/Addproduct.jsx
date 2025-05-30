import React from 'react'

import { FormLabel } from 'react-bootstrap'
import { useState } from 'react'
import upload from '../assets/imgupload.jpg'
import { useEffect } from 'react'
import { Adding } from '../services/apicalls'
import { useRef } from 'react'
import { v4 } from 'uuid'
import Navi from './Navi'
import Footer from './Footer'
import { toast } from 'react-toastify'
import userPool from '../services/cognito/Userpool'

function Addproduct() {

    const user=userPool.getCurrentUser()

    const [product, setProduct] = useState({

    })

    const [preview, setPreview] = useState()

    const formRef = useRef()

    const [validateexpiry, setValidateexpiry] = useState(true)
    const [validatetitle, setValidatetitle] = useState(true)
    const [validatecover, setValidatecover] = useState(true)
    const [validatecategory, setValidatecategory] = useState(true)
    const [validatequantity, setValidatequantity] = useState(true)
    const [validatedescription, setValidatedescription] = useState(true)
    const [validateprice, setValidateprice] = useState(true)
    const [validateunit, setValidateunit] = useState(true)
    const [validatetaxOption, setValidatetaxOption] = useState(true)





    const handlefilechange = async (e) => {
        const file = e.target.files[0]
        console.log(file)
        setProduct({ ...product, img: e.target.files[0] })

        if (file) {
            console.log("hi")
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                const encode = reader.result.split(",")[1]
                setProduct({ ...product, cover: encode })
            }
        }

    }




    const add = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target

        if (name == "expiry") {
            if (!!value) {
                setProduct({ ...product, [name]: value })
                setValidateexpiry(true)
            }
            else {
                setValidateexpiry(false)
            }
        }
        else if (name == "title") {
            if (!!value.match(/^[a-z 0-9A-Z._-]{1,}$/)) {
                 const input = value
                const formatted = input
                    .toLowerCase()
                    .split(" ")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                setProduct({ ...product, [name]: formatted})
                setValidatetitle(true)
            }
            else {
                setValidatetitle(false)
            }

        }
        else if (name == "category") {
            if (!!value.match(/^[a-z A-Z]{1,}$/)) {
                setProduct({ ...product, [name]: value })
                setValidatecategory(true)
            }
            else {
                setValidatecategory(false)
            }
        }
        else if (name == "quantity") {

            if (!!value.match(/^[0-9]{1,}$/)) {
                setProduct({ ...product, [name]: value })
                setValidatequantity(true)
            }
            else {
                setValidatequantity(false)
            }

        }
        else if (name == "description") {
            if (!!value.match(/^[0-9a-zA-Z -=.,]/)) {
                setProduct({ ...product, [name]: value })
                setValidatedescription(true)

            }
            else {
                setValidatedescription(false)
            }
        }
        else if (name == "price") {
            if (!!value.match(/^[0-9]/)) {
                setProduct({ ...product, [name]: value })
                setValidateprice(true)

            }
            else {
                setValidateprice(false)
            }

        }
        else if (name == "taxOption") {
            if (!!value.match(/^[A_Z a-z]/)) {
                setProduct({ ...product, [name]: value })
                setValidatetaxOption(true)

            }
            else {
                setValidatetaxOption(false)
            }

        }


        else {
            if (!!value.match(/^[a-z A-Z]/)) {
                setProduct({ ...product, [name]: value })
                setValidateunit(true)

            }
            else {
                setValidateunit(false)
            }

        }

    }
    console.log(product)
    const addproduct = async (e) => {
        e.preventDefault()
        if (!validateexpiry || !validatetitle || !validatecategory || !validatedescription || !validatequantity || !validatetaxOption) {
            toast.warning("insert all values")
        }
        else {
            if (validateexpiry && validatetitle && validatecategory && validatedescription && validatequantity) {
                const uid = v4()
                const productadd = new FormData()
                productadd.append("id", uid)
                productadd.append("userId",user.username)
                productadd.append("expiry", product.expiry)
                productadd.append("title", product.title)
                productadd.append("cover", product.cover)
                productadd.append("category", product.category)
                productadd.append("description", product.description)
                productadd.append("price", product.price)
                productadd.append("quantity", product.quantity)
                productadd.append("unit", product.unit)
                productadd.append("tax", product.taxOption)

                console.log(productadd)
                const result = await Adding(productadd)

                console.log(result)
                if (result.success) {
                    toast.success("Added successfully")
                    setProduct({
                        expiry: "",
                        title: "",
                        category: "",
                        cover: "",
                        description: " ",
                        quantity: "",
                        price: "",
                        img: "",
                        unit: "",
                        taxOption: ""

                    })
                    formRef.current.reset()

                    setPreview(upload)
                    handlereset()
                }
                else {
                    toast.error("failed")
                }

            }


        }

    }



    const handlereset = () => {
        setProduct({
            expiry: "",
            title: "",
            category: "",
            img: "",
            description: "",
            quantity: "",
            price: "",
            unit: "",
            taxOption: ""


        })
        setPreview("")


    }
    useEffect(() => {
        if (product.img) {
            setPreview(URL.createObjectURL(product.img))
        }

    }, [product.img])


    return (
        <>
            <Navi />
            <div style={{
                paddingTop: "80px",
                backgroundColor: "#E4F5EC"
            }} className='d-flex justify-content-center'>
                <div style={{ maxWidth: "75vw" ,margin:"auto"}}>
                    <h2
                        className='mt-3 mb-3 text-success'
                        style={{
                            textAlign: "center",
                            fontFamily: "Archivo",
                            fontWeight:"1"
                        }}>ADD NEW PRODUCTS</h2>
                    <div
                        className='bg-success'
                        style={{
                            height: "1px",
                            backgroundColor: "black",
                            width: "100%",
                        }}
                    ></div>
                    <form onSubmit={(e) => { addproduct(e) }} action="" ref={formRef} className="row" >
                        <div className='col-lg-6 col-sm-12 mt-3'>
                            <FormLabel
                                className=''
                                style={{
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    fontFamily: "Archivo",



                                }}
                            >
                                Product Image<span style={{
                                    color: "red"
                                }}> *</span>
                                <input
                                    required

                                    onChange={handlefilechange}
                                    style={{
                                        border: "2px solid black"

                                    }}
                                    className='form-control mt-3 mb-4'
                                    type='file'
                                    name='cover'
                                    id='cover'
                                />
                                <br />
                                {/* <img
                                    className='img-fluid mt-2'
                                    src={preview ? preview : upload}
                                    style={{
                                        width: "500px",
                                        height: "300px"
                                    }}
                                /> */}
                            </FormLabel>
                            {/* {
                                !validatecover &&
                                <div style={{ color: "red" }}>
                                    upload product image !
                                </div>
                            } */}
                            <FormLabel
                                style={{
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    fontFamily: "Archivo",
                                    display: "block"

                                }}
                            >
                                Product Description<span style={{
                                    color: "red"
                                }}> *</span>
                            </FormLabel>
                           
                            <textarea
                                required
                                placeholder='About the Product!!'
                                className='form-control mb-5'
                                style={{
                                    height: "100px",
                                    border: "2px solid ",
                                    fontFamily:"Archivo"
                                }}
                                onChange={(e) => { add(e) }}

                                name="description"
                                id="description">

                            </textarea>
                            {/* {
                                !validatedescription &&
                                <div style={{ color: "red" }}>
                                    Enter Product title !
                                </div>
                            } */}
                            <FormLabel
                                className='mt-1'
                                style={{
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    fontFamily: "Archivo"

                                }}
                            >
                                Product Expiry Date<span style={{
                                    color: "red"
                                }}> *</span>
                            </FormLabel>
                            <br />
                            <input
                                required
                                value={product.expiry}
                                onChange={(e) => add(e)}
                                name='expiry'
                                id='expiry'
                                type='date'
                                className='form-control mt-1'
                                style={{
                                    height: "50px",
                                    border: "2px solid ",
                                    fontFamily:"Archivo"

                                }}

                            />
                            {/* {
                                !validateexpiry &&
                                <div style={{ color: "red" }}>
                                    Enter Product expiry date !
                                </div>
                            } */}






                        </div>
                        <div className='col-lg-6 col-sm-12 mt-2'>

                            <FormLabel
                                className='mt-1'
                                style={{
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    fontFamily: "Archivo"

                                }}
                            >
                                Product Title  <span style={{
                                    color: "red"
                                }}> *</span>
                            </FormLabel>
                            <br />
                            <input
                            
                                required
                                placeholder='Enter Product Name!!'
                                onChange={(e) => { add(e) }}
                                name='title'
                                id='title'
                                className='form-control mt-2 mb-3'
                                style={{
                                    height: "50px",
                                    border: "2px solid ",
                                    fontFamily:"Archivo"
                                }}

                            />
                            {/* {
                                !validatetitle &&
                                <div style={{ color: "red" }}>
                                    Enter Product title !
                                </div>
                            } */}
                            <FormLabel
                                style={{
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    fontFamily: "Archivo",


                                }}
                                className=''
                            >
                                Product Category   <span style={{
                                    color: "red"
                                }}> *</span>
                            </FormLabel>
                            <br />

                            <select
                                required
                                value={product.category}
                                style={{
                                    height: "50px",
                                    border: "2px solid ",
                                    fontFamily:"Archivo"
                                }}
                                className='form-control mt-1 mb-2'
                                name="category"
                                id="category"
                                defaultValue="select category"
                                onChange={(e) => { add(e) }}
                            >
                                <option
                                    disabled


                                    value="select category"
                                    style={{
                                        backgroundColor: "white",
                                        color: "black"
                                    }}
                                    className='form-control'>
                                    Select Category
                                </option>
                                <option
                                    value="Vegetable"
                                    style={{
                                        backgroundColor: "white",
                                        color: "black"
                                    }}
                                    className='form-control'>
                                    Vegetable
                                </option>
                                <option
                                    value="Fruit"
                                    style={{
                                        backgroundColor: "white",
                                        color: "black"
                                    }}
                                    className='form-control'>
                                    Fruit
                                </option>
                                <option
                                    value="Grain"

                                    style={{
                                        backgroundColor: "white",
                                        color: "black"
                                    }}
                                    className='form-control'>
                                    Grain
                                </option>
                                <option
                                    value="Oil"
                                    style={{
                                        backgroundColor: "white",
                                        color: "black"
                                    }}
                                    className='form-control'>
                                    Oil
                                </option>
                                <option
                                    value="Spice"
                                    style={{
                                        backgroundColor: "white",
                                        color: "black"
                                    }}
                                    className='form-control'>
                                    Spice
                                </option>




                            </select>
                            
                            <FormLabel
                                className='mt-2'
                                style={{
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    fontFamily: "Archivo"
                                }}
                            >
                                Quantity <span style={{ color: "red" }}> *</span>
                            </FormLabel>
                            <div className="d-flex mt-1 mb-4"
                            style={{
                                height:"auto"
                            }}>
                                <input
                                    required
                                    value={product.quantity}
                                    placeholder='Enter Quantity'
                                    type="number"
                                    onChange={(e) => { add(e) }}
                                    name='quantity'
                                    id='quantity'
                                    className='form-control mt-1'
                                    style={{
                                        height: "50px",
                                        border: "2px solid",
                                        borderRadius: "5px 0 0 5px",
                                        fontFamily:"Archivo"
                                    }}
                                />
                                <select
                                    required
                                    value={product.unit}
                                    defaultValue="unit"
                                    onChange={(e) => { add(e) }}
                                    name='unit'
                                    id='unit'
                                    className='form-control mt-1'
                                    style={{
                                        height: "50px",
                                        border: "2px solid",
                                        borderRadius: "0 5px 5px 0",
                                        width: "auto",fontFamily:"Archivo"
                                    }}
                                > <option disabled value="unit">Unit</option>
                                    <option value="piece">Piece</option>
                                    <option value="kg">kg</option>
                                    <option value="g">g</option>
                                    <option value="liter">liter</option>
                                    <option value="ml">ml</option>
                                    <option value="dozen">dozen</option>
                                    {/* Add other units as needed */}
                                </select>
                            </div>
                            {/* {
                                !validatequantity &&
                                <div style={{ color: "red" }}>
                                    Enter quantity !
                                </div>
                            } */}
                            <FormLabel
                                className='mt-'
                                style={{
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    fontFamily: "Archivo"

                                }}
                            >
                                Price <span style={{
                                    color: "red",
                                    fontFamily:"Archivo"
                                }}> *</span>
                            </FormLabel>
                           
                           
                            <div className="d-flex flex-column">
                                <input
                                    required
                                    type="number"
                                    placeholder='Enter Price !!'
                                    onChange={(e) => { add(e) }}
                                    name='price'
                                    id='price'
                                    className='form-control mt-1'
                                    style={{
                                        height: "50px",
                                        border: "2px solid",
                                    fontFamily:"Archivo"
                                    }}
                                />
                                <div className="mt-2 d-flex ">
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="taxOption"
                                            id="taxIncluded"
                                            value="included"
                                            onChange={(e) => { add(e) }}
                                        />
                                        <label style={{
                                            fontFamily:"Archivo",
                                            fontWeight:"500"
                                        }}  className="form-check-label" htmlFor="taxIncluded">
                                            Tax Included
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                           
                                            className="form-check-input"
                                            type="radio"
                                            name="taxOption"
                                            id="taxExcluded"
                                            value="excluded"
                                            onChange={(e) => { add(e) }}
                                        />
                                        <label style={{
                                            fontFamily:"Archivo",
                                            fontWeight:"500"
                                        }} className="form-check-label" htmlFor="taxExcluded">
                                            Tax Excluded
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {
                                !validatetaxOption &&
                                <div style={{ color: "red" }}>
                                    Enter tax
                                </div>
                            }
                           


                        </div>
                        <div className='d-flex justify-content-center my-3 '>
                                <button
                                    // onClick={(e) => { addproduct(e) }}
                                    type='submit'
                                    className='btn btn-success my-lg-5 p-lg-3 mx-3'
                                    style={{
                                        width: "20%",
                                        alignSelf:"center",
                                        
                                        color: "white",
                            
                                        fontFamily: "Archivo"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "#28a745"; // Darker green
                                        e.target.style.color = "white";
                                        e.target.style.transform = "scale(1.05)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = ""; // Reset to default
                                        e.target.style.color = "white";
                                        e.target.style.transform = "scale(1)";
                                      }}
                                >
                                    Add!
                                </button>
                                <button
                                    onClick={handlereset}
                                    type='reset'
                                    className='btn  btn-success mx-3 my-lg-5 p-lg-3 my-2'
                                    style={{
                                        width: "20%",
                                         alignSelf:"center",
                                        
                                        
                                        color: "white",
                            
                                        fontFamily: "Archivo"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "#28a745"; // Darker green
                                        e.target.style.color = "white";
                                        e.target.style.transform = "scale(1.05)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = ""; // Reset to default
                                        e.target.style.color = "white";
                                        e.target.style.transform = "scale(1)";
                                      }}
                                >
                                    Reset!
                                </button>
                            </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Addproduct