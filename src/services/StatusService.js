import Api from "@/services/Api";

export  default {
    checkStatus (){
        return Api().get ('users/status');
    }
};