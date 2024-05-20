import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
let baseURL = 'http://localhost:5343/api'

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = 'http://localhost:5125/api/v1'
}

const api = axios.create({
  baseURL
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if(token){
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
})

// use this to handle errors gracefully
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 500) {
//       throw new Error(error.response.data)
//     }
//   }
// )

export default api
