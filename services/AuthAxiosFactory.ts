import axios, { AxiosInstance } from 'axios'

export default function(jwt: string): AxiosInstance {
  return axios.create({
    headers: {
      common: {
        Authorization: `Token ${jwt}`
      }
    }
  })
}
