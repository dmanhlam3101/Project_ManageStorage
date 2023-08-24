import { API_URL_InputStorage } from '../constants/configUrl';
import axiosClient from './httpCommon';

export const getListInputStorage = () => {
	return axiosClient.get(`${API_URL_InputStorage}`)
}
export const getListInputStorageTransaction = () => {
	return axiosClient.get(`${API_URL_InputStorage}/getInpuTransaction`)
}
export const getListInputStorageById = (id) => {
	return axiosClient.get(`${API_URL_InputStorage}/GetInputByInputId/${id}`)
}
export const editInputStorageById = (data) => {
	return axiosClient.put(`${API_URL_InputStorage}/edit/${data.InputId}`,data)
}
export const addInputStorage = (data) => {
	return axiosClient.post(`${API_URL_InputStorage}/add`,data)
}
export const deleteInputStorage = (InputId) => {
	return axiosClient.put(`${API_URL_InputStorage}/delete/${InputId}`)
}