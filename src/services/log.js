import Api from "@/services/Api";

export default {
  GetLogsByUser(IdUser) {
    return Api().get(`Logs/log/${IdUser}`);
  },
};
