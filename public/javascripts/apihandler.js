class APIHandler {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  getSelectedGame(data) {
    return axios.get("/search/game", { params: { title: data } });
  }
  getSelectedTagsGender(gender, data) {
    return axios.get(`/tags/${gender}`, { params: { id_tags: data } });
  }
}
export default APIHandler;
