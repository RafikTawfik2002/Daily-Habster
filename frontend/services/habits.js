import http from "../http-common";

class HabitDataService {
    get(id) {
        return http.get(`/habit/id/${id}`)
    }

    findByUserId(id){
        return http.get(`/habit/user/${id}`);
    }

    createHabit(data){
        return http.post("/habit", data); // data is the body of the post request
    }

    updateHabit(id, data) {
        return http.put(`/habit/${id}`, data);
    }

    deleteHabit(id) {
        return http.delete(`/habit/${id}`);
    }

    addReview(body) {
        return http.post(`habit/review`, body)
    }

}

export default new HabitDataService();