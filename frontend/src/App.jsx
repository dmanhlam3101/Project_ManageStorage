
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Storage from './views/Storage/Storage';
import EditProduct from './views/Storage/EditProduct';
import Login from './views/Login/Login';
import Layout from './components/Layout/Layout';
import AddProduct from './views/Storage/AddProduct';
import AuthGuard from './Guard/AuthGuard';
import InputStorage from './views/InputStorage/InputStorage';
import CustomerIndex from './views/Customer/CustomerIndex';
import EditCustomer from './views/Customer/EditCustomer';
import AddCustomer from './views/Customer/AddCustomer';


const allRouters = [
	{
		path: '/storage',
		element: (
				<AuthGuard>

					<Storage />
				</AuthGuard>

		),
		title: 'Storage',

		
	},
	{
		path: '/storage/editProduct/:productId',
		element: (

					<EditProduct />

		),
		title: 'Edit Product',

		
	},
	{
		path: '/storage/addProduct',
		element: (

					<AddProduct />

		),
		title: 'Add Product',

		
	},
	
	{
		path: '/inputStorage',
		element: (

					<InputStorage />

		),
		title: 'Input Storage',

		
	},
	{
		path: '/customer',
		element: (

					<CustomerIndex />

		),
		title: 'Customer',

		
	},
	{
		path: '/customer/editCustomer/:CustomerId',
		element: (

					<EditCustomer />

		),
		title: 'Edit Customer',

		
	},
	{
		path: '/customer/addCustomer',
		element: (

					<AddCustomer />

		),
		title: 'Add Customer',

		
	},
];
function App() {
	return (
		<Routes>
			{allRouters.map((item, index) => {
				const CommonLayout = item.layout || Layout;
				return (
					<Route
						key={index}
						path={item.path}
						element={
							<CommonLayout title={item.title} children={item.element} />
						}
					/>
				);
			})}
			<Route key='login' path='/login' element={<Login />} />
			<Route key='login' path='/' element={<Login />} />
		</Routes>
	);
}


export default App;
