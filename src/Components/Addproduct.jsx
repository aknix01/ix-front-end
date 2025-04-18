import React from 'react'

import { FormLabel } from 'react-bootstrap'
import { useState } from 'react'
import upload from '../assets/imgupload.jpg'
import { useEffect } from 'react'
import { Adding } from '../services/apicalls'
import { useRef } from 'react'
import { v4 } from 'uuid'
import Navi from './Navi'
import { toast } from 'react-toastify'

function Addproduct() {

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


    const handlefilechange=async(e)=>{
        const file=e.target.files[0]
        console.log(file)
        setProduct({...product,img:e.target.files[0]})
    
        if(file){
            console.log("hi")
            const reader=new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend=()=>{
                const encode=reader.result.split(",")[1]
                setProduct({...product,cover:encode})
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
            if (!!value.match(/^[a-z A-Z._-]{1,}$/)) {
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
            if (!!value.match(/^[0-9a-zA-Z .,]/)) {
                setProduct({ ...product, [name]: value })
                setValidatedescription(true)

            }
            else {
                setValidatedescription(false)
            }
        }


        else {
            if (!!value.match(/^[0-9]/)) {
                setProduct({ ...product, [name]: value })
                setValidateprice(true)

            }
            else {
                setValidateprice(false)
            }

        }

    }  
    console.log(product)
    const addproduct = async (e) => {
        e.preventDefault()
        if (!validateexpiry || !validatetitle || !validatecategory || !validatedescription || !validatequantity) {
            toast.warning("insert all values")
        }
        else {
            if (validateexpiry && validatetitle && validatecategory && validatedescription && validatequantity) {
                const uid=v4()
                const productadd = new FormData()
                productadd.append("id",uid)
                productadd.append("expiry", product.expiry)
                productadd.append("title", product.title)
                productadd.append("cover", product.cover)
                productadd.append("category", product.category)
                productadd.append("description", product.description)
                productadd.append("price", product.price)
                productadd.append("quantity", product.quantity)

                console.log(productadd)
                const result = await Adding(productadd)

                console.log(result)
                if (result.status == 200) {
                    toast.success("Added successfully")
                    setProduct({
                        expiry: "",
                        title: "",
                        category: "",
                        cover: "",
                        description:" ",
                        quantity:"",
                        price: "",
                        img:""

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
            img:"",
            description: "",
            quantity: "",
            price: ""


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
            <Navi/>
            <div style={{
                backgroundColor:"#E4F5EC"
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
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "FreeMono, monospace",


                                }}
                            >
                                PRODUCT IMAGE<span style={{
                                    color: "red"
                                }}> *</span>
                                <input
                                    
                                    onChange={handlefilechange}
                                    style={{
                                        display: "none"
                                    }}
                                    className='form-control'
                                    type='file'
                                    name='cover'
                                    id='cover'
                                />
                                <br />
                                <img
                                    className='img-fluid mt-2'
                                    src={preview ? preview : upload}
                                    style={{
                                        width: "400px",
                                        height: "300px"
                                    }}
                                />
                            </FormLabel>
                            {
                                !validatecover &&
                                <div style={{ color: "red" }}>
                                    upload product image !
                                </div>
                            }
                            <FormLabel
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "FreeMono, monospace"

                                }}
                            >
                                PRODUCT DESCRIPTION<span style={{
                                    color: "red"
                                }}> *</span>
                            </FormLabel>
                            <br />
                            <textarea
                                placeholder='About the Product!!'
                                className='form-control'
                                style={{
                                    height: "100px",
                                    border: "2px solid "
                                }}
                                onChange={(e) => { add(e) }}
                                
                                name="description"
                                id="description">

                            </textarea>
                            {
                                !validatedescription &&
                                <div style={{ color: "red" }}>
                                    Enter Product title !
                                </div>
                            }






                        </div>
                        <div className='col-lg-6 col-sm-12 mt-2'>

                            <FormLabel
                                className='mt-1'
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "FreeMono, monospace"

                                }}
                            >
                                PRODUCT TITLE  <span style={{
                                    color: "red"
                                }}> *</span>
                            </FormLabel>
                            <br />
                            <input
                                
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
                            {
                                !validatetitle &&
                                <div style={{ color: "red" }}>
                                    Enter Product title !
                                </div>
                            }
                            <FormLabel
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "FreeMono, monospace"

                                }}
                                className='mt-1'
                            >
                                PRODUCT CATEGORY   <span style={{
                                    color: "red"
                                }}> *</span>
                            </FormLabel>
                            <br />

                            <select
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
                                    value="one"
                                    style={{
                                        backgroundColor: "white",
                                        color: "black"
                                    }}
                                    className='form-control'>
                                    one
                                </option>
                                <option
                                    value="two"
                                    style={{
                                        backgroundColor: "white",
                                        color: "black"
                                    }}
                                    className='form-control'>
                                    two
                                </option>
                                <option
                                    value="three"

                                    style={{
                                        backgroundColor: "white",
                                        color: "black"
                                    }}
                                    className='form-control'>
                                    three
                                </option>
                                <option
                                    value="four"
                                    style={{
                                        backgroundColor: "white",
                                        color: "black"
                                    }}
                                    className='form-control'>
                                    four
                                </option>
                                <option
                                    value="five"
                                    style={{
                                        backgroundColor: "white",
                                        color: "black"
                                    }}
                                    className='form-control'>
                                    five
                                </option>




                            </select>
                            {
                                !validatecategory &&
                                <div style={{ color: "red" }}>
                                    Enter Product category !
                                </div>
                            }



                            <FormLabel
                                className='mt-1'
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "FreeMono, monospace"

                                }}
                            >
                                QUANTITY <span style={{
                                    color: "red"
                                }}> *</span>
                            </FormLabel>
                            <br />
                            <input
                                value={product.quantity}
                                placeholder='Enter Quantity!!'
                                type="number"
                                onChange={(e) => { add(e) }}
                                name='quantity'
                                id='quantity'
                                className='form-control mt-1'
                                style={{
                                    height: "50px",
                                    border: "2px solid "

                                }}

                            />
                            {
                                !validatequantity &&
                                <div style={{ color: "red" }}>
                                    Enter quantity !
                                </div>
                            }
                            <FormLabel
                                className='mt-1'
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "FreeMono, monospace"

                                }}
                            >
                                PRICE <span style={{
                                    color: "red"
                                }}> *</span>
                            </FormLabel>
                            <br />
                            <input
                                
                                type="number"
                                placeholder='Enter Price !!'
                                onChange={(e) => { add(e) }}
                                name='price'
                                id='price'
                                className='form-control mt-1'
                                style={{
                                    height: "50px",
                                    border: "2px solid "

                                }}

                            />
                            {
                                !validateprice &&
                                <div style={{ color: "red" }}>
                                    Enter quantity !
                                </div>
                            }
                            <FormLabel
                                className='mt-1'
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    fontFamily: "FreeMono, monospace"

                                }}
                            >
                                PRODUCT EXPIRY DATE <span style={{
                                    color: "red"
                                }}> *</span>
                            </FormLabel>
                            <br />
                            <input
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
                            {
                                !validateexpiry &&
                                <div style={{ color: "red" }}>
                                    Enter Product expiry date !
                                </div>
                            }
                            <div className='d-flex '>
                                <button
                                    // onClick={(e) => { addproduct(e) }}
                                    type='submit'
                                    className='btn my-5 mx-2'
                                    style={{
                                        width: "100%",
                                        backgroundColor: "grey",
                                        color: "black",
                                        border: "2px solid",
                                        fontFamily: "FreeMono, monospace"
                                    }}
                                >
                                    ADD!
                                </button>
                                <button
                                    onClick={handlereset}
                                    type='reset'
                                    className='btn my-5'
                                    style={{
                                        width: "100%",
                                        backgroundColor: "grey",
                                        color: "black",
                                        border: "2px solid",
                                        fontFamily: "FreeMono, monospace"
                                    }}
                                >
                                    Reset!
                                </button>
                            </div>





                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Addproduct