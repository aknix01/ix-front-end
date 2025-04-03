
import { commonRequest } from "./axios";
import { base_url, carturl, getcarturl } from "./url";


export const fetchproducts=async()=>{
    return await commonRequest('GET',base_url)
}
export const Adding=async(body)=>{
    return await commonRequest('POST',base_url,body)
}

export const sign=async(body)=>{
    return await commonRequest('POST',base_url,body,"")
}

export const addtocart=async(body,action)=>{
    const urlWithParams=`${carturl}?action=${action}`
    return await commonRequest("POST",urlWithParams,body,"")
}

export const fetchcart=async(body)=>{
    
    return await commonRequest("POST",getcarturl,body,"")
}

export const removefromcart=async(id,username)=>{
    const urlWithParams=`${carturl}?action=delete&id=${id}&username=${username}`;
    return await commonRequest("DELETE",urlWithParams,{},"")
    
}