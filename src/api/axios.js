import axios from "axios";
import { getDispatch, setUnauthedActionCreator } from "@features/auth/useAuth";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const refreshURL = 'auth/refresh';
const ignoreUnauthorizedResponseFromURLs = [
  refreshURL,
  'auth/login'
];

let refreshPromise;

instance.interceptors.response.use(
  /**
   * Интерсептор для изъятия поля data у ответов
   */
  res => res.data,

  /**
   * Интерсептор для перехвата 401
   * Выполняется попытка обновления access токена
   * Если access токен обновил успешно - выполняется повторный запрос
   */
  async error => {
    if (
      error.response?.status === 401
      && !ignoreUnauthorizedResponseFromURLs.includes(error.config.url)
      && !error.config._isRetry
    ) {
      error.config._isRetry = true

      try {
        if (!refreshPromise) {
          refreshPromise = instance.post(refreshURL).catch((e) => {
            if(e.response?.status === 401) {
              const dispatch = getDispatch();
              dispatch(setUnauthedActionCreator());
            }
          })
        }

        await refreshPromise;

        refreshPromise = null;

        const result = await instance.request(error.config);
        return result;
      } catch (e) {
        refreshPromise = null;

        return Promise.reject(error);
      } finally {
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  }
)

export default instance;