import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EContract from "./pages/EContract";
import ChuKySo from "./pages/ChuKySo";
import HoKinhDoanh from "./pages/HoKinhDoanh";
import ProductDetail from "./pages/ProductDetail";
import Internet from "./pages/Internet";
import RegisterModal from "./components/RegisterModal";

import { RegisterProvider } from "./context/RegisterContext";

import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";

import Dashboard from "./admin/pages/Dashboard";
import ProductsAdmin from "./admin/pages/ProductsAdmin";
import ServicesAdmin from "./admin/pages/ServicesAdmin";
import NewsAdmin from "./admin/pages/NewsAdmin";
import EContractsAdmin from "./admin/pages/EContractsAdmin";
import HKDAdmin from "./admin/pages/HKDAdmin";

import AdminLogin from "./pages/AdminLogin";

import ProtectedRoute 
from "./components/ProtectedRoute";


import {
 AuthProvider
}
from "./context/AuthContext";

function App() {
  return (
    <RegisterProvider>
      <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/san-pham/:id" element={<ProductDetail />} />
          <Route path="/gioi-thieu" element={<About />} />
          <Route path="/internet" element={<Internet />} />
          <Route path="/e-contract" element={<EContract />} />
          <Route path="/chu-ky-so" element={<ChuKySo />} />
          <Route path="/ho-kinh-doanh" element={<HoKinhDoanh />} />
          <Route path="/tin-tuc" element={<News />} />
          <Route path="/tin-tuc/:id" element={<NewsDetail />} />
          <Route path="/lien-he" element={<Contact />} />

          {/* ADMIN ROUTES */}
          <Route 
            path="/admin/login"
            element={<AdminLogin />}
            />

            <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }
            />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <ProductsAdmin/>
              </ProtectedRoute>
            }
            />

            <Route
            path="/admin/services"
            element={
              <ProtectedRoute>
                <ServicesAdmin/>
              </ProtectedRoute>
            }
            />

            <Route
            path="/admin/news"
            element={
              <ProtectedRoute>
                <NewsAdmin/>
              </ProtectedRoute>
            }
            />

            <Route
            path="/admin/econtracts"
            element={
              <ProtectedRoute>
                <EContractsAdmin/>
              </ProtectedRoute>
            }
            />

            <Route
            path="/admin/hkds"
            element={
              <ProtectedRoute>
                <HKDAdmin/>
              </ProtectedRoute>
            }
            />

        </Routes>

        <RegisterModal />
      </BrowserRouter>
      </AuthProvider>
    </RegisterProvider>
  );
}

export default App;