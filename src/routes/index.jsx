import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ErrorBoundary from '../components/ErrorBoundary';
import HomePage from '../pages/HomePage';
import ProductListingPage from '../pages/ProductListingPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import WishlistPage from '../pages/WishlistPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import OrderFailurePage from '../pages/OrderFailurePage';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';

const LazyAccessoriesPage = lazy(() => import('../pages/AccessoriesPage'));
const LazyAccountPage = lazy(() => import('../pages/AccountPage'));

const PageLoader = () => (
  <div className="min-h-[40vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" /></div>
);

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="font-serif text-4xl font-bold text-luxury-black mb-2">404</h1>
      <p className="text-gray-500 mb-8">Page not found</p>
      <Link to="/" className="px-8 py-3 bg-luxury-black text-white font-medium hover:bg-luxury-gold transition-colors rounded">
        Return Home
      </Link>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/admin',
    element: (
      <ErrorBoundary>
        <AdminLayout />
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
    ],
  },
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <MainLayout />
      </ErrorBoundary>
    ),
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
      { path: 'order-failure', element: <OrderFailurePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
