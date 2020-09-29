class APIHandler {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  getSelectedGame(data) {
    return axios.get("/search/game", { params: { title: data } });
  }
  getFilter(query) {
    return axios.get(`/filter`, { params: { query: query } });
  }
  addToWishlist(id) {
    return axios.get(`/my-collection/add-to-wishlist`, {
      params: { data: id },
    });
  }
}
export default APIHandler;
