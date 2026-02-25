import http from "@/shared/api/http";

export const marketAPI = {
  getProducts: (params) => http.get("/api/market/products", { params }),
  getProductById: (productId) => http.get(`/api/market/products/${productId}`),
  createOrder: (data) => http.post("/api/market/orders", data),
  getMyOrders: (params) => http.get("/api/market/orders/my", { params }),
  cancelMyOrder: (orderId) =>
    http.patch(`/api/market/orders/${orderId}/cancel`),
};
