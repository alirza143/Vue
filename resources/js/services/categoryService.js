import { http, httpFile } from "./http_service";

export function createRecord(url, data) {
    return httpFile().post(url, data)
}

export function getAllRecords(url) {
    return http().get(url);
}

export function deleteRecords(url, id) {
    return http().delete(`${url}/${id}`);
}

export function updateRecords(url, id, data) {
    return httpFile().post(`${url}/${id}`, data);
}

export function getMoreRecords(url, nextPage) {
    return http().get(`${url}/?page=${nextPage}`);
}
// for (var key of data.entries()) {
//     console.log(key[0] + ', ' + key[1]);
// }