import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import ProductListingPage from '../pages/ProductListingPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import WishlistPage from '../pages/WishlistPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';

const LazyAccessoriesPage = lazy(() => import('../pages/AccessoriesPage'));
const LazyAccountPage = lazy(() => import('../pages/AccountPage'));

const PageLoader = () => (
  <div className="min-h-[40vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" /></div>
);

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
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'accessories', element: <Suspense fallback={<PageLoader />}><LazyAccessoriesPage /></Suspense> },
      { path: 'account', element: <Suspense fallback={<PageLoader />}><LazyAccountPage /></Suspense> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'order-success', element: <OrderSuccessPage /> },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
