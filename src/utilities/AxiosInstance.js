import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://demo.physicianhealthnet.com/api"
  // baseURL: "http://localhost:3026"
});

const AxiosInstanceSecondryServer = axios.create({
  baseURL: "https://dependencyforphn.physicianhealthnet.com/api/"
  // baseURL: "http://localhost:3028",
});

const AxiosInstanceDependency = AxiosInstanceSecondryServer;

export { AxiosInstance, AxiosInstanceSecondryServer, AxiosInstanceDependency };
