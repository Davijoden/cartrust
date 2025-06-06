
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import CarsBuy from "./pages/CarsBuy";
import CarsSell from "./pages/CarsSell";
import CarDetails from "./pages/CarDetails";
import ServiceProviders from "./pages/ServiceProviders";
// import ServiceProviderDetails from "./pages/ServiceDetails";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import ServiceProviderDashboard from "./pages/ServiceProviderDashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OtpLogin from "./pages/OtpLogin";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/auth/PrivateRoute";
import FindYourCar from "./pages/FindYourCar";
import EmailVerification from "./components/auth/EmailVerification";
import CarDetailsAdmin from "./components/car/CarDetailsAdmin";
import ServiceProviderDetails from "./pages/ServiceProviderDetails";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HelmetProvider>
          <TooltipProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/cars/buy" element={<CarsBuy />} />
                <Route path="/cars/details/:id" element={<CarDetails />} />
                <Route path="/cars" element={<Navigate to="/cars/buy" replace />} />
                <Route path="/service-providers" element={<ServiceProviders />} />
                <Route path="/service-providers/:id" element={<ServiceProviderDetails />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetails />} />
                <Route path="/find-your-car" element={<FindYourCar />} />
                <Route path="/about" element={<About />} />
                <Route path="/email-verification/:token" element={<EmailVerification />} />
                
                {/* 404 Not Found */}
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/otp-login" element={<OtpLogin />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/cars/sell" element={<CarsSell />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/notifications" element={<Notifications />} />
                </Route>
                
                {/* Role-Specific Routes */}
                <Route element={<PrivateRoute requiredRole="admin" />}>
                  <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
                  <Route path="/admin-dashboard/cars/details/:id" element={<CarDetailsAdmin />} />

                </Route>
                
                <Route element={<PrivateRoute requiredRole="service_provider" />}>
                  <Route path="/service-provider-dashboard/*" element={<ServiceProviderDashboard />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </TooltipProvider>
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
