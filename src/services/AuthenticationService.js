import Api from "@/services/Api";

export default {
    login(Credentials){
        return Api().post('Users/Login', Credentials)
    },
    resetpass(User){
        return Api().put('Users/resetpassword',User)
    },
};