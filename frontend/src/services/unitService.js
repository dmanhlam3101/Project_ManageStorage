import { API_URL_Unit } from '../constants/configUrl';
import axiosClient from './httpCommon';

export const getListUnit = () => {
	return axiosClient.get(`${API_URL_Unit}`)
}