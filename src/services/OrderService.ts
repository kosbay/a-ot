import http from "../request";

const getAll = (page?: number, limit?: number) => {
  return http.get(`/orders?page=${page || ""}&limit=${limit || ""}`);
};

const get = (id: string) => {
  return http.get(`/orders/${id}`);
};

const create = (data: any) => {
  return http.post("/orders", data);
};

const update = (id: string, data: any) => {
  return http.put(`/orders/${id}`, data);
};

const remove = (id: string) => {
  return http.delete(`/orders/${id}`);
};

const removeAll = () => {
  return http.delete(`/orders`);
};

const findByTitle = (title: string) => {
  return http.get(`/orders?title=${title}`);
};

const OrderService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default OrderService;
