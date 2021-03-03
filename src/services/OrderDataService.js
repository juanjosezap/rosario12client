import http from "../http-common";

class OrderDataService {
  getAll() {
    return http.get("/orders");
  }

  get(id) {
    return http.get(`/orders/${id}`);
  }

  create(data) {
    return http.post("/orders", data);
  }

  update(id, data) {
    return http.put(`/orders/${id}`, data);
  }

  delete(id) {
    return http.delete(`/orders/${id}`);
  }

  deleteAll() {
    return http.delete(`/orders`);
  }

  findByNombre(nombre) {
    return http.get(`/orders?nombre=${nombre}`);
  }

  getPauta(date) {
    return http.get(`/pauta?date=${date}`);
  }

  downloadOrder(id) {
    return http.get(`/pdf/getOrder/${id}`, {
      responseType: 'blob',
      timeout: 30000
    })
  }

  downloadPauta(date) {
    return http.get(`/pdf/getPauta?date=${date}`, {
      responseType: 'blob',
      timeout: 30000
    })
  }
  getorders(data) {
    console.log(` la data: ${data}`);
    return http.get(`/orders/getorders?nro=${data.nro}&desde=${data.desde}&hasta=${data.hasta}&nombre=${data.nombre}&medio=${data.medio}&client=${data.client}`)
  }
}

export default new OrderDataService();
