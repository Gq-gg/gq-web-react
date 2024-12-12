import { Get, Post } from '../http';

export interface FcResponse<T> {
  code: number;
  message: string;
  data: T;
}

export type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>;

export function getUserInfo<T>(): ApiResponse<T> {
  return Get<T>(`https://test.api.toyfuns.top/jingzhudata/loginOut`);
}
export const getTotalStatisticsByProvince = () => {
  return Get(
    `https://api.jingzhudata.com/jingzhudata/home/getTotalStatisticsByProvince`,
  );
};
export const getProjectListApi = (
  params: { pageNumber: number; pageSize: number },
  accountId: string,
) => {
  return Post(
    `https://api.jingzhudata.com/jingzhudata/jingzhudata/manage/account/operation/record${accountId}`,
    params,
  );
};
export const userApi = {
  getUserInfo,
  getTotalStatisticsByProvince,
  getProjectListApi,
};
