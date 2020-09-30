class APIHandler {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  getSelectedGame(data) {
    return axios.get("/search/game", { params: { title: data } });
  }
  getFilter(querystr) {
    return axios.get(`/filter`, { params: { query: querystr } });
  }
  add(query) {
    return axios.get(`/add-to-wishlist`, { params: { query: query } });
  }

  addToCollection(id) {
    return axios.get(`/my-collection/add-to-collection`, {
      params: { data: id },
    });
  }

  addToWishlist(id) {
    return axios.get(`/my-collection/add-to-wishlist`, {
      params: { data: id },
    });
  }

  addToFinish(id) {
    return axios.get(`/my-collection/add-to-finish`, {
      params: { data: id },
    });
  }
  deleteFromWishlist(id) {
    return axios.get(`/my-collection/delete-from-wishlist`, {
      params: { data: id },
    });
  }
  deleteFromFinished(id) {
    return axios.get(`/my-collection/delete-from-finished`, {
      params: { data: id },
    });
  }
  deleteFromOwned(id) {
    return axios.get(`/my-collection/delete-from-owned`, {
      params: { data: id },
    });
  }
}
export default APIHandler;
