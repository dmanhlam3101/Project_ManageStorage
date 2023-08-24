import { API_URL_User } from '../constants/configUrl';
import axiosClient from './httpCommon';

export const getListUser = () => {
	return axiosClient.get(`${API_URL_User}`)
}
export const getUserById = (id) => {
	return axiosClient.get(`${API_URL_User}/GetUserByUserId/${id}`)
}
export const addUser = (data) => {
	return axiosClient.post(`${API_URL_User}/add`,data)
}
export const editUser = (data) => {
	return axiosClient.put(`${API_URL_User}/edit/${data.userId}`,data)
}
export const deleteUser = (id) => {
	return axiosClient.put(`${API_URL_User}/delete/${id}`)
}