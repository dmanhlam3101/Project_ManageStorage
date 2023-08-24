
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
import Supplier from './views/Supplier/Supplier';
import EditSupplier from './views/Supplier/EditSupplier';
import AddSupplier from './views/Supplier/AddSupplier';
import User from './views/User/User';
import AddUser from './views/User/AddUser';
import EditUser from './views/User/EditUser';



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
			<AuthGuard>

				<EditProduct />
			</AuthGuard>

		),
		title: 'Edit Product',

		
	},
	{
		path: '/storage/addProduct',
		element: (
			<AuthGuard>

				<AddProduct />
			</AuthGuard>

		),
		title: 'Add Product',

		
	},
	
	{
		path: '/inputStorage',
		element: (
			<AuthGuard>

				<InputStorage />
			</AuthGuard>

		),
		title: 'Input Storage',

		
	},
	{
		path: '/inputStorage/add',
		element: (
			<AuthGuard>

				<AddInputStorage />
			</AuthGuard>

		),
		title: 'Add Input Storage',

		
	},
	{
		path: '/inputStorage/edit/:InputId',
		element: (
			<AuthGuard>

				<EditInputStorage />
			</AuthGuard>

		),
		title: 'Edit Input Storage',

		
	},
	{
		path: '/outputStorage',
		element: (
			<AuthGuard>

				<OutputStorage />
			</AuthGuard>

		),
		title: 'Output Storage',

		
	},
	{
		path: '/outputStorage/add',
		element: (
			<AuthGuard>

				<AddOutputStorage />
			</AuthGuard>

		),
		title: 'Add Output Storage',

		
	},
	{
		path: '/outputStorage/edit/:OutputId',
		element: (
			<AuthGuard>

				<EditOutputStorage />
			</AuthGuard>

		),
		title: 'Edit Output Storage',

		
	},
	{
		path: '/customer',
		element: (
			<AuthGuard>

				<CustomerIndex />
			</AuthGuard>

		),
		title: 'Customer',

		
	},
	{
		path: '/customer/editCustomer/:CustomerId',
		element: (
			<AuthGuard>

				<EditCustomer />
			</AuthGuard>

		),
		title: 'Edit Customer',

		
	},
	{
		path: '/customer/addCustomer',
		element: (
			<AuthGuard>

				<AddCustomer />
			</AuthGuard>

		),
		title: 'Add Customer',

		
	},
	{
		path: '/dashboard',
		element: (
			<AuthGuard>

				<DashBoard />
			</AuthGuard>

		),
		title: 'Dashboard',

		
	},
	{
		path: '/supplier',
		element: (
			<AdminGuard>

				<Supplier />
			</AdminGuard>

		),
		title: 'Supplier',

		
	},
	{
		path: '/supplier/add',
		element: (
			<AdminGuard>

				<AddSupplier />
			</AdminGuard>

		),
		title: 'Add Supplier',

		
	},
	{
		path: '/supplier/edit/:SupplierId',
		element: (
			<AdminGuard>

				<EditSupplier />
			</AdminGuard>

		),
		title: 'Edit Supplier',

		
	},
	{
		path: '/user',
		element: (
			<AdminGuard>

				<User />
			</AdminGuard>

		),
		title: 'User',
	},
	{
		path: '/user/add',
		element: (
			<AdminGuard>

				<AddUser />
			</AdminGuard>

		),
		title: 'Add User',
	},
	{
		path: '/user/edit/:userId',
		element: (
			<AdminGuard>

				<EditUser />
			</AdminGuard>

		),
		title: 'Edit User',
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
