import MainLayout from './layouts/MainLayout';
import MainView from './views/MainView/MainView';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import ProductsView from './views/ProductsView/ProductsView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <MainView /> },
      { path: '/products', element: <ProductsView /> },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
