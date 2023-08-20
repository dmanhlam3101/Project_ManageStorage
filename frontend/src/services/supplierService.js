import { API_URL_Supplier } from '../constants/configUrl';
import axiosClient from './httpCommon';

export const getListSupplier = () => {
	return axiosClient.get(`${API_URL_Supplier}`)
}