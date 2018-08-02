import axios from "axios";

export default {
  // Gets all books
  getMurals: function() {
    return axios.get("/api/murals");
  },
  // Gets the book with the given id
  getMural: function(id) {
    return axios.get("/api/murals/" + id);
  },
  // Deletes the book with the given id
  deleteMural: function(id) {
    return axios.delete("/api/murals/" + id);
  },
  // Saves a book to the database
  saveMural: function(muralData) {
    return axios.post("/api/murals", muralData);
  },
  logMural:function(muralData){
    console.log(muralData);

  }
};
