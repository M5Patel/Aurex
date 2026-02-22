import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import ProductListingPage from '../pages/ProductListingPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import AccessoriesPage from '../pages/AccessoriesPage';
import AccountPage from '../pages/AccountPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'collections', element: <ProductListingPage /> },
      { path: 'collections/:categoryId', element: <ProductListingPage /> },
      { path: 'product/:slug', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'accessories', element: <AccessoriesPage /> },
      { path: 'account', element: <AccountPage /> },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
