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

    authenticate(body) {
        return http.post(`/login/authenticate`, body);
    }

    updatePassword(id, body){
        return http.put(`/login/password/${id}`, body)
    }

    sendmail(body){
        return http.post(`/login/sendmail`, body)
    }

    verify(body){
        return http.post(`login/verify`, body)
    }

    sentCheck(body){
        return http.post(`login/sentcheck`, body)
    }

}

export default new UserDataService();