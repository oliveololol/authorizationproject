import Api from "./Api";

export default {
    login(Credentials){
        return Api().get('app/Users/Login', Credentials)
    },
    resetpass(User){
        return Api().put('app/Users/resetpassword',User)
    },
};