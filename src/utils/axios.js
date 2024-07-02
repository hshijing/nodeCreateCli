import axios from "axios";
import { ElLoading } from "element-plus";
import { TOKEN_KEY, ENV } from "@/constant";
import router from "@/router";

const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8";
const contentTypeJson = "application/json";
const responseTypeJson = "json";
let loading;
const instance = axios.create({
  withCredentials: true,
  baseURL: (import.meta.env.PROD ? ENV.VITE_HTTP_URL : "") + ENV.VITE_BASE,
  timeout: 10 * 1000,
});

//请求前拦截器
instance.interceptors.request.use(
  (config) => {
    if (config.showLoading) {
      loading = ElLoading.service({
        lock: true,
        text: "加载中......",
        background: "rgba(0, 0, 0, 0.7)",
      });
    }
    return config;
  },
  (error) => {
    if (error.config && error.config.showLoading && loading) {
      loading.close();
    }
    return Promise.reject(error);
  }
);
//请求后拦截器
instance.interceptors.response.use(
  (response) => {
    const {
      showLoading,
      errorCallback,
      showError = true,
      responseType,
    } = response.config 
    if (showLoading && loading) {
      loading.close();
    }
    const responseData = response.data;
    if (responseType == "arraybuffer" || responseType == "blob") {
      return responseData;
    }
    //正常请求
    if (responseData.code == 200) {
      return responseData;
    } else if (responseData.code == 901) {
      //登录超时
      setTimeout(() => {
        router.push({ path: "/login" });
      }, 1000);
      return Promise.reject({ showError: true, msg: "登录超时" });
    } else {
      //其他错误
      if (errorCallback) {
        errorCallback(responseData);
      }
      return Promise.reject({ showError: showError, msg: responseData.info,code:responseData.code });
    }
  },
  (error) => {
    if (error.config && error.config.showLoading && loading) {
      loading.close();
    }
    return Promise.reject({ showError: true, msg: "网络异常" });
  }
);

const request = (config) => {
  const { url, params, dataType, responseType = responseTypeJson } = config;
  let contentType = contentTypeForm;
  let formData = new FormData(); // 创建form对象
  for (let key in params) {
    formData.append(key, params[key] == undefined ? "" : params[key]);
  }
  if (dataType != null && dataType == "json") {
    contentType = contentTypeJson;
  }
  const token = getStorage(TOKEN_KEY);
  let headers = {
    "Content-Type": contentType,
    "X-Requested-With": "XMLHttpRequest",
    token: token,
  };
  return instance
    .post(url, formData, {
      headers: headers,
      responseType: responseType,
    })
    .then((response) => response) // 只返回数据部分
    .catch((error) => {
      return Promise.reject(error);
    });
};
export default request;
