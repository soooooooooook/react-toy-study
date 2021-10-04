import http from "./http";

export async function login(email, password) {
    return http.post('auth/login', {
        email,
        password
    })
}

