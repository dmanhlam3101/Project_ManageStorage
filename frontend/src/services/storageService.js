import { API_URL_STORAGE } from '../constants/configUrl';
import axiosClient from './httpCommon';



export const getListStorage = () => {
	return axiosClient.get(`${API_URL_STORAGE}`)
}
export const getSupllierStorage = (productId) => {
	return axiosClient.get(`${API_URL_STORAGE}/getSupllierOfProduct/${productId}`)
}
