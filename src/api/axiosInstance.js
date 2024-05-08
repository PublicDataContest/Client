const axios = require("axios");
const axiosInstance = axios.create();

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response.status === 400 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      if (!localStorage.getItem("refreshToken")) {
        alert("로그인이 필요한 페이지입니다.");
        location.href = "/";
        return;
      }
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export async function refreshAccessToken() {
  try {
    const res = await axios.post(
      "/api/api/refresh-token",
      {
        refreshToken: localStorage.getItem("refreshToken"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log("refresh-token", res);
    const { accessToken, refreshToken, userId } = res.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", userId);
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("userId");
      alert("세션이 만료되어 로그인 페이지로 이동합니다.");
      location.href = "/";
      return;
    }
  }
}

export default axiosInstance;
