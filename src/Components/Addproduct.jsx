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
                setProduct({ ...product, [name]: value })
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
                <div style={{ width: "75vw" }}>
                    <h2
                        className='mt-3 mb-3'
                        style={{
                            textAlign: "center",
                            fontFamily: "Impact, fantasy"
                        }}>ADD NEW PRODUCTS</h2>
                    <div
                        style={{
                            height: "5px",
                            backgroundColor: "black",
                            width: "100%",
                        }}
                    ></div>
                    <form onSubmit={(e) => { addproduct(e) }} action="" ref={formRef} className="row" >
                        <div className='col-lg-6 col-sm-12 mt-3'>
                            <FormLabel
                                className=''
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "Roboto",



                                }}
                            >
                                PRODUCT IMAGE<span style={{
                                    color: "red"
                                }}> *</span>
                                <input
                                    required

                                    onChange={handlefilechange}
                                    style={{
                                        border: "2px solid black"

                                    }}
                                    className='form-control mt-3'
                                    type='file'
                                    name='cover'
                                    id='cover'
                                />
                                <br />
                                {/* <img
                                    className='img-fluid mt-2'
                                    src={preview ? preview : upload}
                                    style={{
                                        width: "400px",
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
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "Roboto",
                                    display: "block"

                                }}
                            >
                                PRODUCT DESCRIPTION<span style={{
                                    color: "red"
                                }}> *</span>
                            </FormLabel>
                            <br />
                            <textarea
                                required
                                placeholder='About the Product!!'
                                className='form-control mb-2'
                                style={{
                                    height: "100px",
                                    border: "2px solid "
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
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "Roboto"

                                }}
                            >
                                PRODUCT EXPIRY DATE <span style={{
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
                                    border: "2px solid "

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
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "Roboto"

                                }}
                            >
                                PRODUCT TITLE  <span style={{
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
                                className='form-control mt-1'
                                style={{
                                    height: "50px",
                                    border: "2px solid "
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
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "Roboto"

                                }}
                                className='mt-2'
                            >
                                PRODUCT CATEGORY   <span style={{
                                    color: "red"
                                }}> *</span>
                            </FormLabel>
                            <br />

                            <select
                                required
                                value={product.category}
                                style={{
                                    height: "50px",
                                    border: "2px solid "
                                }}
                                className='form-control mt-1'
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
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "Roboto"
                                }}
                            >
                                QUANTITY <span style={{ color: "red" }}> *</span>
                            </FormLabel>
                            <div className="d-flex">
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
                                        borderRadius: "5px 0 0 5px"
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
                                        width: "auto"
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
                                className='mt-2'
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "Roboto"

                                }}
                            >
                                PRICE <span style={{
                                    color: "red"
                                }}> *</span>
                            </FormLabel>
                            <br />
                           
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
                                        border: "2px solid"
                                    }}
                                />
                                <div className="mt-2">
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="taxOption"
                                            id="taxIncluded"
                                            value="included"
                                            onChange={(e) => { add(e) }}
                                        />
                                        <label className="form-check-label" htmlFor="taxIncluded">
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
                                        <label className="form-check-label" htmlFor="taxExcluded">
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
                        <div className='d-flex justify-content-center '>
                                <button
                                    // onClick={(e) => { addproduct(e) }}
                                    type='submit'
                                    className='btn btn-success my-5 mx-3'
                                    style={{
                                        width: "20%",
                                        
                                        color: "white",
                            
                                        fontFamily: "Roboto"
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
                                    ADD!
                                </button>
                                <button
                                    onClick={handlereset}
                                    type='reset'
                                    className='btn  btn-success mx-3 my-5'
                                    style={{
                                        width: "20%",
                                        
                                        color: "white",
                            
                                        fontFamily: "Roboto"
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