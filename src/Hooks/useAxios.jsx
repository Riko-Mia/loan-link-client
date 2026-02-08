import axios from "axios"
// const axios = require('axios').default;

// import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxios = () =>{
    // console.log(config, 'Log use Axios')
    return axiosInstance
}

export default useAxios