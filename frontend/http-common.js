import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:5555/",  //url of the backend server
    headers: {
        "Content-type": "application/json"
    }
});