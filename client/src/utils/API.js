import axios from "axios";

export default {
  // Gets all murals
  getMurals: function() {
    return axios.get("/api/murals/");
  },
  // Gets the mural with the given id
  getMural: function(id) {
    return axios.get("/api/murals/" + id);
  },
  // Deletes the mural with the given id
  deleteMural: function(id) {
    return axios.delete("/api/murals/" + id);
  },
  // Saves a mural to the database
  saveMural: function(muralData) {
    return axios.post("/api/murals/", muralData);
  },
  logMural:function(muralData){
    console.log(muralData);
  }
};
