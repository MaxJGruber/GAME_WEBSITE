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
}
export default APIHandler;