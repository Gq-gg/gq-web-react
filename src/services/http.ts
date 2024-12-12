import axios from 'axios';

import {
  handleAuthError,
  handleChangeRequestHeader,
  // handleConfigureAuth,
  handleGeneralError,
  handleNetworkError,
} from './tools';

type Fn = (data: FcResponse<any>) => unknown;

interface IAnyObj {
  [index: string]: unknown;
}

interface FcResponse<T> {
  code: number;
  message: string;
  data: T;
}

axios.interceptors.request.use(config => {
  config = handleChangeRequestHeader(config);
  // config = handleConfigureAuth(config);
  return config;
});

axios.interceptors.response.use(
  response => {
    console.log('response.data================>>>>>>>>>>>', response);
    if (response.data.code !== 200) return Promise.reject(response.data);
    handleAuthError(response.data.code);
    handleGeneralError(response.data.code, response.data.message);
    return response;
  },
  err => {
    console.log('err================>>>>>>>>', err);
    handleNetworkError(err?.code);
    Promise.reject(err);
  },
);

export const Get = <T>(
  url: string,
  params: IAnyObj = {},
  clearFn?: Fn,
): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise(resolve => {
    axios
      .get(url, { params })
      .then(result => {
        // console.log('result================', result);
        let res: FcResponse<T>;
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>;
        } else {
          res = result.data as FcResponse<T>;
        }
        resolve([null, res as FcResponse<T>]);
      })
      .catch(err => {
        console.log('err======================================', err);
        if (err) {
        }
        resolve([err, undefined]);
      });
  });

export const Post = <T>(
  url: string,
  data: IAnyObj,
  params: IAnyObj = {},
): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise(resolve => {
    axios
      .post(url, data, { params })
      .then(result => {
        resolve([null, result.data as FcResponse<T>]);
      })
      .catch(err => {
        resolve([err, undefined]);
      });
  });
};
