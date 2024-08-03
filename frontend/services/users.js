import http from "../http-common";

class UserDataService {
    getByUsername(username){
        return http.get(`/login/username/${username}`) // what goes in the url as a query or body request
    }

    getById(id) {
        return http.get(`/login/${id}`)
    }

    createUser(user){
        return http.post(`/login`, user);
    }

    updateNameById(id, name){
        return http.put(`/login/${id}`, name); // data is the body of the post request
    }

    deleteUser() {
        return http.delete(`/login/${id}`);
    }

}

export default new UserDataService();