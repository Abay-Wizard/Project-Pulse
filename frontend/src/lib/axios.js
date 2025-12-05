import axios from 'axios'
const axiosInstance=axios.create({
    baseURL:'https://project-pulse-1-bd4l.onrender.com/api',
    withCredentials:true
})





export default axiosInstance