import axios from "axios";

export default {
  // Gets all murals
  getMurals: function() {
    return axios.get("/api/murals/");
  },
  // Gets the mural with the given id
  getMural: function(id) {
<<<<<<< HEAD
    return axios.get("/api/murals/" + id);
=======
    console.log(id);
    return axios.get("/api/murals/" + id);
    
>>>>>>> d37695e48eb258f8bc69f1dd36fa73c038e5f0bf
  },
  // Deletes the mural with the given id
  deleteMural: function(id) {
    return axios.delete("/api/murals/" + id);
  },
  // Saves a mural to the database
<<<<<<< HEAD
  saveMural: function(muralData) {
    return axios.post("/api/murals/", muralData);
=======
  createMural: function(muralData) {
    return axios.post("/api/murals/", muralData);
  },
  editMural: function(muralData,id) {
    return axios.post("/api/murals/" + id,muralData);
>>>>>>> d37695e48eb258f8bc69f1dd36fa73c038e5f0bf
  },
  logMural:function(muralData){
    console.log(muralData);
  }
};
