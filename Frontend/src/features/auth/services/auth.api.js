import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function register({username, email, password}) {
    try {
        const response = await api.post("/api/auth/register", {  // ✅ api not axios
            username, email, password
        })
        return response.data
    } catch(err) {
        console.log(err)
    }
}

export async function login({email, password}) {
    try {
        const response = await api.post("/api/auth/login", {  // ✅ api not axios
            email, password
        })
        return response.data  // ✅ you were also missing this return
    } catch(err) {
        console.log(err)
    }
}

export async function logout() {
    try {
        const response = await api.get("/api/auth/logout")  // ✅ api not axios
        return response.data
    } catch(err) {
        console.log(err)
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me")  // ✅ api not axios
        return response.data
    } catch(err) {
        console.log(err)
    }
}