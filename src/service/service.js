import http from "./http"

export function getUserListApi(page) {
    return http.get(`member/all?page=${page}&size=10`)
}

export function deleteMemberApi(email) {
    return http.delete(`member/${email}`)
}

export function editMemberApi(data) {
    return http.put('member/', data);
}

export function changeAuthApi(authority, email) {
    return http.put('member/auth', {
        authority,
        email
    })
}

export function refreshAuthApi(token) {
    return http.post('auth/check', token)
}

export function getBoardListApi(page) {
    return http.get(`board/all?page=${page}&size=10`)
}

export function getBoardItemApi(id) {
    return http.get(`board/${id}`)
}

export function saveReplyApi(data) {
    return http.post('board/reply', data)
}

export function deleteReplyApi(id) {
    return http.delete(`board/reply/${id}`)
}

export function createBoardApi(data) {
    return http.post('board/', data)
}

export function editBoardApi(data) {
    return http.put('board/', data)
}

export function delBoardApi(id) {
    return http.delete(`board/${id}`)
}
