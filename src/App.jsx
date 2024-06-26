import MainLayout from './layouts/MainLayout';
import MainView from './views/MainView/MainView';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import ProductsView from './views/ProductsView/ProductsView';
import BasketContextProvider from './providers/BasketContextProvider';
import BasketView from './views/BasketView/BasketView';
import UploadView from './views/UploadView/UploadView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <MainView /> },
      { path: '/products', element: <ProductsView /> },
      { path: '/basket', element: <BasketView /> },
      { path: '/upload', element: <UploadView /> },
    ]
  }
])

function App() {
  return (
    <BasketContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </BasketContextProvider>

  );
}

export default App;
