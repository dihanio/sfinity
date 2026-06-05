import axios
from "axios";

const api =
  axios.create({

    baseURL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",

  });

/*
━━━━━━━━━━━━━━━━━━━
REQUEST INTERCEPTOR
━━━━━━━━━━━━━━━━━━━
*/
api.interceptors.request.use(

  (config) => {

    /*
    AUTH STORAGE
    */
    const storage =
      localStorage.getItem(
        "auth-storage"
      );

    if (storage) {

      const parsed =
        JSON.parse(storage);

      const token =
        parsed?.state?.token;

      /*
      TOKEN
      */
      if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;

      }

    }

    return config;

  },

  (error) => {

    return Promise.reject(
      error
    );

  }

);

/*
━━━━━━━━━━━━━━━━━━━
RESPONSE INTERCEPTOR
━━━━━━━━━━━━━━━━━━━
*/
api.interceptors.response.use(

  (response) =>
    response,

  (error) => {

    /*
    AUTO LOGOUT
    */
    if (

      error.response
        ?.status === 401

    ) {

      localStorage.removeItem(
        "auth-storage"
      );

    }

    return Promise.reject(
      error
    );

  }

);

export default api;