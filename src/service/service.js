import http from "./http"

export function getUserListApi(page) {
    return http.get(`member/all?page=${page}&size=10`)
}

export function deleteMemberApi(email) {
    return http.delete(`member/${email}`)
}

export function editMemberApi(email) {
    return http.get(`member/?email=${email}`);
}

export function changeNameApi(name, email) {
    return http.put('member/', {
        name,
        email
    })
}

export function changeAuthApi(authority, email) {
    return http.put('member/auth', {
        authority,
        email
    })
}
