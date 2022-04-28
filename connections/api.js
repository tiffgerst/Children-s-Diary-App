import axios from 'axios'

const api = axios.create({
  baseURL: 'https://mirradiaryapp.azurewebsites.net',
})

export default api
