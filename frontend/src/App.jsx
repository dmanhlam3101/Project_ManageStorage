
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Layout from './components/Layout/Layout';

const allRouters = [
	{
		path: '/',
		element: (

					<Home />

		),
		title: 'Home',
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
		
		</Routes>
	);
}


export default App;
