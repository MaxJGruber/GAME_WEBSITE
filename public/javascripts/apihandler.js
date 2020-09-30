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

    addToCollection(id) {
        return axios.get(`/my-collection/add-to-collection`, {params: {data: id}})
    }

    addToCollection(id) {
        return axios.get(`/my-collection/add-to-finish`, {params: {data: id}})
    }

    addToWishlist(id) {
    return axios.get(`/my-collection/add-to-wishlist`, {
      params: { data: id },
    });
  }
}
export default APIHandler;
