
import { commonRequest } from "./axios";
import { base_url, carturl, getcarturl,orderUrl,getOrderUrl } from "./url";


export const fetchproducts=async()=>{
    return await commonRequest('GET',base_url)
}
export const Adding=async(body)=>{
    return await commonRequest('POST',base_url,body)
}

export const sign=async(body)=>{
    return await commonRequest('POST',base_url,body,"")
}

export const addtocart=async(body,action,header)=>{
    const urlWithParams=`${carturl}?action=${action}`
    return await commonRequest("POST",urlWithParams,body,header)
}

export const fetchcart=async(body)=>{ 
    return await commonRequest("POST",getcarturl,body,"")
}

export const removefromcart=async(id,username)=>{
    const urlWithParams=`${carturl}?action=delete&id=${id}&username=${username}`;
    console.log(urlWithParams)
    return await commonRequest("DELETE",urlWithParams,{},"")  
}

export const incrementQuantity=async(body,action)=>{
    const urlWithParams=`${carturl}?action=${action}`;
    console.log(urlWithParams)
    return await commonRequest("PUT",urlWithParams,body,"")
}
export const decrementQuantity=async(body,action)=>{
    const urlWithParams=`${carturl}?action=${action}`;
    console.log(urlWithParams)
    return await commonRequest("PUT",urlWithParams,body,"")
}
export const Ordering=async(body)=>{
    return await commonRequest('POST',orderUrl,body)
}

export const fetchOrders=async(username)=>{
    const urlWithParams=`${getOrderUrl}?username=${username}`;
    return await commonRequest('GET',urlWithParams)
}