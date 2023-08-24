import { API_URL_Supplier } from '../constants/configUrl';
import axiosClient from './httpCommon';

export const getListSupplier = () => {
	return axiosClient.get(`${API_URL_Supplier}`)
}
export const getListSupplierById = (id) => {
	return axiosClient.get(`${API_URL_Supplier}/GetSupplierById/${id}`)
}
export const addListSupplier = (data) => {
	return axiosClient.post(`${API_URL_Supplier}/add`,data)
}
export const editListSupplier = (data) => {
	return axiosClient.put(`${API_URL_Supplier}/edit/${data.SupplierId}`,data)
}
export const deleteListSupplier = (id) => {
	return axiosClient.put(`${API_URL_Supplier}/delete/${id}`)
}