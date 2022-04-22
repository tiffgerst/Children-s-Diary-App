import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.0.75:3000',
  //baseURL: 'http://172.20.10.3:3000',
  //baseURL: 'http://85.255.233.224:3000',
})

export default api
