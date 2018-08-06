import axios from "axios";

export default {
  // Gets all murals
  getMurals: function() {
    return axios.get("/api/murals/");
  },
  // Gets the mural with the given id
  getMural: function(id) {
    return axios.get("/api/v1/game/" + id);
  },
  // Deletes the mural with the given id
  deleteMural: function(id) {
    return axios.delete("/api/murals/" + id);
  },
  // Saves a mural to the database
  createMural: function(muralData) {
    return axios.post("/api/v1/", muralData);
  },
  editMural: function(id) {
    console.log(id);
    return axios.post("/api/v1/game/" + id);
  },
  logMural:function(muralData){
    console.log(muralData);
  },

  findOpenMurals:function(){
    console.log("I'm in api.js");
    return axios.get("/api/v1/openmurals");
  }
};

