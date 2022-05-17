import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import SignInPage from "../pages/SignInPage";
import AdminPage from "../pages/AdminPage";
import AdminRoute from "../components/common/AdminRoute";
import TypePage from "../pages/TypePage";
import CategoryPage from "../pages/CategoryPage";
import ProductPage from "../pages/ProductPage";
import OrderPage from "../pages/OrderPage";
import UserPage from "../pages/UserPage";
import ReportsPage from "../pages/ReportsPage";

const MainRouter = () => (
  <Router>
    <Box className="App">
      <Routes>
        <Route path="/signin" exact element={<SignInPage />} />
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
  </Router>
);

export default MainRouter;
