import { API_URL_User } from '../constants/configUrl';
import axiosClient from './httpCommon';

export const login = (credentials) => {
	return axiosClient.post(`${API_URL_User}/login`,credentials)
}
export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('username');
	localStorage.removeItem('role');
};
