import axios from "axios";

const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const AxiosInstance = axios.create({
  baseURL: isLocal ? "http://localhost:3026" : "https://demo.physicianhealthnet.com/api"
});

const AxiosInstanceSecondryServer = axios.create({
  baseURL: isLocal ? "http://localhost:3028" : "https://dependencyforphn.physicianhealthnet.com/api/"
});

const AxiosInstanceDependency = AxiosInstanceSecondryServer;

export { AxiosInstance, AxiosInstanceSecondryServer, AxiosInstanceDependency };
