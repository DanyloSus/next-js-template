import Axios, { type InternalAxiosRequestConfig } from "axios";

import { env } from "@/config/env";
import { useNotifications } from "@/stores/notifications";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  config.withCredentials = true;

  return config;
}

/**
 * Shared Axios instance. Import this everywhere instead of constructing new
 * clients so interceptors (auth, error handling) apply consistently.
 *
 * Works on both server (RSC / route handlers) and client. Browser-only side
 * effects (toast notifications, redirects) are guarded with `typeof window`.
 */
export const api = Axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message || error.message;

    if (typeof window !== "undefined") {
      useNotifications.getState().addNotification({
        type: "error",
        title: "Error",
        message,
      });

      // Example: redirect to login on auth failure. Wire this to your app.
      // if (error.response?.status === 401) {
      //   const redirectTo = new URLSearchParams(window.location.search).get('redirectTo');
      //   window.location.href = `/auth/login?redirectTo=${redirectTo ?? window.location.pathname}`;
      // }
    }

    return Promise.reject(error);
  }
);
