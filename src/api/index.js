import axios from "axios";

const fullURL = (path) => {
  return `https://jsonplaceholder.typicode.com/${path}`;
};

const post = (api) => (data) => {
  return axios.post(fullURL(api), data, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};

const get =
  (api) =>
  (param = "") => {
    return axios(`${fullURL(api)}${param}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
  };

const put = (api) => (data) => {
  return axios.put(fullURL(api), data, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
  });
};

const deletePost =
  (api) =>
  (param = "") => {
    return axios.delete(`${fullURL(api)}${param}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  };

export const getUsers = get("users");

export const getPosts = get("posts");
export const editPost = put("posts");
export const deletePosts = deletePost("posts");
export const addPost = post("posts");

export const getAlbums = get("albums");

export const getComments = get("comments");

export const getPhotos = get("photos");

// post

// edit

// delete

const API = {};

export default API;
