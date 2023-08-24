
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
import OutputStorage from './views/OutputStorage/OutputStorage';
import AddInputStorage from './views/InputStorage/AddInputStorage';
import EditInputStorage from './views/InputStorage/EditInputStorage';
import AddOutputStorage from './views/OutputStorage/AddOutputStorage';
import EditOutputStorage from './views/OutputStorage/EditOutputProduct';
import DashBoard from './views/DashBoard/DashBoard';
import AdminGuard from './Guard/AdminGuard';
import NotFound from './views/NotFound/NotFound';
import Unthorized from './views/NotFound/Unthorized';



const allRouters = [
	{
		path: '/storage',
		element: (
				<AdminGuard>

					<Storage />
				</AdminGuard>

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
		path: '/inputStorage/add',
		element: (

					<AddInputStorage />

		),
		title: 'Add Input Storage',

		
	},
	{
		path: '/inputStorage/edit/:InputId',
		element: (

					<EditInputStorage />

		),
		title: 'Edit Input Storage',

		
	},
	{
		path: '/outputStorage',
		element: (

					<OutputStorage />

		),
		title: 'Output Storage',

		
	},
	{
		path: '/outputStorage/add',
		element: (

					<AddOutputStorage />

		),
		title: 'Add Output Storage',

		
	},
	{
		path: '/outputStorage/edit/:OutputId',
		element: (

					<EditOutputStorage />

		),
		title: 'Edit Output Storage',

		
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
	{
		path: '/dashboard',
		element: (

					<DashBoard />

		),
		title: 'Dashboard',

		
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
			<Route key='*' path='*' element={<NotFound />} />
			<Route key='unthorized' path='/unthorized' element={<Unthorized />} />
		</Routes>
	);
}


export default App;
