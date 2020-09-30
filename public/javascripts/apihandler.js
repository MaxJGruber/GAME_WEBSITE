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
        return axios.get(`/my-collection/add-to-collection`, { params: { data: id } })
    }

    addToWishlist(id) {
        return axios.get(`/my-collection/add-to-wishlist`, {
            params: { data: id },
        });
    }

<<<<<<< HEAD
    getGamePage(page) {
        return axios.get("/games/load/" + page)
    }

=======
    addToFinish(id) {
        return axios.get(`/my-collection/add-to-finish`, {
            params: { data: id },
        });
    }
>>>>>>> 71251d63bf2959a8c2da32b09becac0fa595f671
}
export default APIHandler;