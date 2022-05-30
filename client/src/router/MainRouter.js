import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import SignInPage from "../pages/SignInPage";
import AdminPage from "../pages/AdminPage";
import AdminRoute from "../components/common/AdminRoute";
import ProtectedRoute from "../components/common/ProtectedRoute";
import TypePage from "../pages/TypePage";
import CategoryPage from "../pages/CategoryPage";
import ProductPage from "../pages/ProductPage";
import OrderPage from "../pages/OrderPage";
import UserPage from "../pages/UserPage";
import ReportsPage from "../pages/ReportsPage";
import CatalogPage from "../pages/CatalogPage";
import NavBar from "../pages/NavBar";
import BasketPage from "../pages/BasketPage";
import ProductInfoPage from "../pages/ProductInfoPage";
import MainPage from "../pages/MainPage";
import Footer from "../components/common/Footer";
import SignUpPage from "../pages/SignUpPage";

const MainRouter = () => (
  <Router>
    <Box
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Box>
        <Routes>
          <Route path="/" exact element={<MainPage />} />
          <Route path="/catalog" exact element={<CatalogPage />} />
          <Route path="/signin" exact element={<SignInPage />} />
          <Route path="/signup" exact element={<SignUpPage />} />
          <Route
            path="/basket"
            element={
              <ProtectedRoute>
                <BasketPage />
              </ProtectedRoute>
            }
          />
          <Route path="/product/:id" element={<ProductInfoPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/types"
            element={
              <AdminRoute>
                <TypePage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <CategoryPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <OrderPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <AdminRoute>
                <ReportsPage />
              </AdminRoute>
            }
          />
        </Routes>
      </Box>
      <Footer />
    </Box>
  </Router>
);

export default MainRouter;
