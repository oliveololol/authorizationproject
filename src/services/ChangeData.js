import Api from "@/services/Api";

export default{
    ChangeData(data){
        return Api().put('Users/ChangeData', data)
    },
}