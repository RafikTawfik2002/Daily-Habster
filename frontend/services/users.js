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
    // should update email as well
    updateNameById(id, name){
        return http.put(`/login/${id}`, name); // data is the body of the post request
    }

    deleteUser(id) {
        return http.delete(`/login/${id}`);
    }

    authenticate(body) {
        return http.post(`/login/authenticate`, body);
    }

    updatePassword(id, body){
        return http.put(`/login/password/${id}`, body)
    }

    // email verification

    sendmail(body){
        return http.post(`/login/sendmail`, body)
    }

    verify(body){
        return http.post(`login/verify`, body)
    }

    sentCheck(body){
        return http.post(`login/sentcheck`, body)
    }

    // account recovery

    sendUsername(body){
        return http.post(`login/forgotusername`, body)
    }

    sendResetLink(body){
        return http.post(`login/resetrequest`, body)
    }

    checkToken(body){
        return http.post(`login/checktoken`, body)
    }

}

export default new UserDataService();