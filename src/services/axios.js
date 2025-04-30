// import axios from "axios"
// export const commonRequest=async(method,url,body,headers)=>{
//     let axiosConfig={
//         method,url,data:body,headers:headers?headers:{'Content-Type':'application/json'},timeout:10000
//     }
//     return await axios(axiosConfig).then((res)=>{
        
//         return res
//     }).catch(rej=>{
//         return rej
//     })
// }
import axios from "axios";

export const commonRequest = async (method, url, body, headers) => {
    let axiosConfig = {
        method,
        url,
        data: body,
        headers: headers || { 'Content-Type': 'application/json' },
        timeout: 10000
    };

    try {
        const response = await axios(axiosConfig);
        return { success: true, data: response.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response ? error.response.data : error.message 
        };
    }
};
