import { API_URL_Customer } from '../constants/configUrl';
import axiosClient from './httpCommon';

export const getListCustomer = () => {
	return axiosClient.get(`${API_URL_Customer}`)
}

export const getListCustomerById = (id) => {
	return axiosClient.get(`${API_URL_Customer}/GetCustomerById/${id}`)
}
export const editCustomer = (data) => {
	return axiosClient.put(`${API_URL_Customer}/edit/${data.CustomerId}`,data)
}
export const addCustomer = (data) => {
	return axiosClient.post(`${API_URL_Customer}/add`,data)
}
export const deleteCustomer = (CustomerId) => {
	return axiosClient.put(`${API_URL_Customer}/delete/${CustomerId}`)
}