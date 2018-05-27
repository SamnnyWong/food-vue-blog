import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: process.env.PORT, withCredentials: true, crossDomain: true
    // baseURL: `http://localhost:3000`, withCredentials: true, crossDomain: true
    // baseURL: `http://sammy-food-blog.herokuapp.com/`
  })
}
