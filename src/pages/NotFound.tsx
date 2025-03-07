
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-200 animate-fade-in">404</h1>
          <div className="mt-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-medium text-gray-900 mb-4">Page not found</h2>
            <p className="text-lg text-gray-600 mb-8">
              We couldn't find the page you're looking for.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-sm"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
