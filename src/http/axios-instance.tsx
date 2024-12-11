import { message } from 'antd';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';

// 扩展axios接口
declare module 'axios' {
  interface AxiosRequestConfig {
    successCode?: number;
  }
}

interface ApiResult<T> {
  [x: string]: any;
  code: number;
  data: T;
  message: string;
}
// const SUCCESS_CODE = 1000;
class Request {
  private instance: AxiosInstance;
  // 存放取消请求控制器Map
  private abortControllerMap: Map<string, AbortController>;

  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config);
    this.abortControllerMap = new Map();
    // 请求拦截器
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        //请求头时间戳 根据项目需求修改 getRandom 是一个加密方法
        // const id = JSON.parse(localStorage?.getItem('userinfo') as string)?.user
        //   ?.id;
        // const random = getRandom(id);
        const controller = new AbortController();
        const url = config.url || '';
        config.signal = controller.signal;
        this.abortControllerMap.set(url, controller);
        config.headers['Token'] = sessionStorage.getItem('token'); //根据自己的存储地址修改获取
        return config;
      },
      Promise.reject,
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const url = response.config.url || '';
        this.abortControllerMap.delete(url);
        const code = response.data.code;
        switch (code) {
          case 200:
            return response.data;
          case 401:
            message.error(response?.data?.message);
            this.goLogin();
            return response.data || {};
          case 4011:
            message.error(response?.data?.message);
            return response.data || {};
          case 4031:
            message.error(
              response?.data?.message || '账号已被禁用,请联系管理员',
            );
            return response.data || {};
          case 4032:
            message.error(response?.data?.message);
            return response.data || {};
          case 4012:
            message.error(response?.data?.message);
            return response.data || {};
          case 4001:
            message.error(response?.data?.message);
            return response.data || {};
          default:
            return response.data || {};
        }
      },
      err => {
        message.error(err.response.data.message || '服务出错了');
        if (err.response.data.code === 401) {
          this.goLogin();
        }
        return Promise.reject(err);
      },
    );
  }
  goLogin() {
    if (window.location.pathname !== '/login') {
      setTimeout(() => {
        // 跳转到登录逻辑
        window.location.href = '/login';
      }, 1000);
    }
  }
  onErrorReason(message: string): string {
    switch (message) {
      case 'Request failed with status code 401':
        return '登录下线，请重新登录!';
      case 'Network Error':
        return '网络异常，请检查网络情况!';
    }
    if (message.includes('timeout')) {
      return '请求超时，请重试!';
    }
    return '服务异常,请重试!';
  }
  // 取消全部请求
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort();
    }
    this.abortControllerMap.clear();
  }

  // 取消指定的请求
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url];
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort();
      this.abortControllerMap.delete(_url);
    }
  }

  request<T = unknown>(config: AxiosRequestConfig): Promise<ApiResult<T>> {
    return this.instance.request(config);
  }

  get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResult<T>> {
    return this.instance.get(url, config);
  }

  post<T = never>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResult<T>> {
    return this.instance.post(url, data, config);
  }
  delete<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResult<T>> {
    return this.instance.delete(url, { data, ...config });
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResult<T>> {
    return this.instance.put(url, data, config);
  }
  deleteFile<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResult<T>> {
    return this.instance.delete(url, config);
  }
}

export const httpClient = new Request({
  timeout: 20 * 1000,
  baseURL: import.meta.env.VITE_BASE_URL,
});
