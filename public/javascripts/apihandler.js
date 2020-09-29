class APIHandler {
<<<<<<< HEAD
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    getSelectedGame(data) {
        return axios.get("/search/game", { params: { title: data } });
    }
    getFilter(query) {
        return axios.get(`/filter`, { params: { query: query } });
    }

    addToCollection(id) {
        return axios.get(`/my-collection/add-to-collection`, {params: {data: id}})
    }
=======
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
>>>>>>> 5d325b77b87168e9644425c476abee325519aa50
}
export default APIHandler;
