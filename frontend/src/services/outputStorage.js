import { API_URL_OutputStorage } from '../constants/configUrl';
import axiosClient from './httpCommon';

export const getListOutputStorage = () => {
	return axiosClient.get(`${API_URL_OutputStorage}`)
}
export const getListOutputStorageTransaction = () => {
	return axiosClient.get(`${API_URL_OutputStorage}/getOutputTransaction`)
}
export const getListOutputStorageById = (id) => {
	return axiosClient.get(`${API_URL_OutputStorage}/GetOutputByOutputId/${id}`)
}
export const addOutputStorage = (data) => {
	return axiosClient.post(`${API_URL_OutputStorage}/add`,data)
}
export const editOutputStorage = (data) => {
	return axiosClient.put(`${API_URL_OutputStorage}/edit/${data.OutputId}`,data)
}
export const deleteOutputStorage = (id) => {
	return axiosClient.put(`${API_URL_OutputStorage}/delete/${id}`)
}
