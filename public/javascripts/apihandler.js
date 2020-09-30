class APIHandler {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    getSelectedGame(data) {
        return axios.get("/search/game", { params: { title: data } });
    }
    getFilter(genre, plateforme, titre) {
        return axios.get(`/filter`, { params: { genres: genre, platform: plateforme, title: titre } });
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

    getGamePage(page) {
        return axios.get("/games/load/" + page);
    }
}
export default APIHandler;