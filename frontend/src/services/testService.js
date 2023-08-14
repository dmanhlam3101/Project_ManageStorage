import { API_URL_TEST } from '../constants/configUrl';
import axiosClient from './httpCommon';



export const getListOrders = () => {
	return axiosClient.get(`${API_URL_TEST}`)
	// var a =axiosClient.get(`${API_URL_TEST}`, (req, res) => {
	// 	res.header("Access-Control-Allow-Origin", "*");
	//   });
	//   return a;
}
