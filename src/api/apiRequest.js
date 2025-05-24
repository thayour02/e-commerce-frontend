import axios  from "axios"

let API_URL = 'https://backend-e-commerce-0n7p.onrender.com/api';

export const API = axios.create({
   baseURL: API_URL,
   responseType:'json'
})

export const apiRequest = async({url,method,data,token})=>{
  try {
    const result = await API(url,{
        data:data,
        method:method || "GET",
          headers:{
            "Content-Type":"application/json",
            Authorization: token ? `Bearer ${token}` : ""
          }
    })
    return result?.data
  } catch (error) {
   const err = error.response.data
    return {status:err.success, message:err.message}
  }
}

//upload file to online data
export const handleFileUpload = async (uploadFile)=>{
  const formData = new FormData();
  formData.append('file', uploadFile)
  formData.append('upload_preset', "orderApp");
  try {
      const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dph03t5st/image/upload/",
          formData
      );
      return response.data.secure_url
  } catch (error) {
      return error
  }
}