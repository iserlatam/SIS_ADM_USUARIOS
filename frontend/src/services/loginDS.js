import axios from "axios"

const URI = 'http://localhost:4205/server/v1/auth/ingreso'

export const login = (data) => {
    return axios.post(URI, data)
}