import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

export async function isLoggedIn() {
  let login = false
  try {
    const credentials = await SecureStore.getItemAsync('token')
    if (credentials) {
      axios
        .post(`https://mirradiaryapp.azurewebsites.net/appUser/isLoggedIn`, {
          headers: {
            Authorization: credentials,
          },
        })
        .then(() => {
          login = true
        })
        .catch((error) => {
          login = false
        })
    }
  } catch (err) {
    console.log(err)
  }
}
