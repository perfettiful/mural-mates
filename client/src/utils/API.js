import axios from "axios";

export default {
  // Gets all murals
  getMurals: function() {
    return axios.get("/api/");
  },
  // Gets the mural with the given id
  getMural: function(id) {
    return axios.get("/api/" + id);
  },
  // Deletes the mural with the given id
  deleteMural: function(id) {
    return axios.delete("/api/" + id);
  },
  // Saves a mural to the database
  saveMural: function(muralData) {
    return axios.post("/api/", muralData);
  },
  logMural:function(muralData){
    console.log(muralData);
  }
};
