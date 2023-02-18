import { API_LOGIN } from "../common/Constant";
import { LoginModel } from "../models/AuthModel";
import { Response } from "../models/CommonModel";
import instance from "../services/axios/AxiosInstance";

export async function loginAPI({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return await instance.post<Response<LoginModel>>(API_LOGIN, {
    username: username,
    password: password,
  });
}
