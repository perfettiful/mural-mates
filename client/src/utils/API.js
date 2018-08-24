import axios from "axios";

export default {
  // Gets all murals
  getMurals: function () {
    return axios.get("/api/v1/murals/");
  },

  //Get COMPLETED murals by USER ID
  findCompletedMuralsByUser: function (id) {
    return axios.get("/api/v1/murals/" + id);
  },

  //Get ALL COMPLETED murals by Firebase stored ID's
  getAllCompletedGames: function (idData) {
    console.log("IN API",JSON.stringify(idData));
    return axios.post("/api/v1/complete/", idData);
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
  editMural: function (id, muralData) {
    console.log(id, muralData);
    return axios.put("/api/v1/gameupdate/" + id, muralData);
  },
  logMural: function (muralData) {
    console.log(muralData);
  },

  findOpenMurals: function () {
    return axios.get("/api/v1/openmurals");
  },
  // Gets all in-progress murals by user
  findOpenMuralsByUser: function (id) {
    return axios.get("/api/v1/openmurals/" + id);
  }

  
};

