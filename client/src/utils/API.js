import axios from "axios";

export default {
  // Gets all murals
  getMurals: function () {
    return axios.get("/api/murals/");
  },
  // Gets the mural with the given id
  getMural: function (id) {
    return axios.get("/api/v1/game/" + id);
  },
  // Deletes the mural with the given id
  deleteMural: function (id) {
    return axios.delete("/api/murals/" + id);
  },
  // Saves a mural to the database
  createMural: function (muralData) {
    return axios.post("/api/v1/", muralData);
  },

  editMural: function(id,muralData) {
    console.log(id, muralData);
    return axios.put("/api/v1/gameupdate/" + id, muralData);

  },
  logMural: function (muralData) {
    console.log(muralData);
  },

  findOpenMurals: function () {
    console.log("I'm in api.js");
    return axios.get("/api/v1/openmurals");
  },
  // Gets all Users
  getUsers: function () {
    return axios.get("/api/v1/users");
  },
  // Gets the book with the given id
  getUsersByID: function (id) {
    return axios.get("/api/v1/users/" + id);
  },
  // Deletes the book with the given id
  deleteUser: function (id) {
    return axios.delete("/api/v1/users/" + id);
  },
  // Saves a book to the database
  saveUser: function (userData) {
    return axios.post("/api/v1/users", userData);
  }
};