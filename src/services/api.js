import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(async (config) => {
  try {
    //O token do utilizador já fica guardado caso exista
    //assim ao fazer pedidos com o axios não temos que voltar
    //a escrever o token na Authorization
    const token = await localStorage.getItem("userToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  } catch (err) {
    alert(err);
  }
});

export default api;
