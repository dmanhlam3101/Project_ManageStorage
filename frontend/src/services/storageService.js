import { API_URL_STORAGE ,API_URL_Product} from '../constants/configUrl';
import axiosClient from './httpCommon';



export const getListStorage = () => {
	return axiosClient.get(`${API_URL_STORAGE}`)
}
export const getSupllierStorage = (productId) => {
	return axiosClient.get(`${API_URL_STORAGE}/getSupllierOfProduct/${productId}`)
}
export const getProductById = (id) => {
	return axiosClient.get(`${API_URL_Product}/${id}`)
}
export const getProduct = () => {
	return axiosClient.get(`${API_URL_Product}`)
}
export const deleteProduct = (productId) => {
	return axiosClient.put(`${API_URL_Product}/delete/${productId}`)
}
export const editProduct = (data) => {
	return axiosClient.put(`${API_URL_Product}/edit/${data.productId}`,data)
}
export const addProduct = (data) => {
	return axiosClient.post(`${API_URL_Product}/add`,data)
}
