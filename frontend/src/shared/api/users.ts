import { $host } from '.';

export const registerUser = async (data: { login: string, email: string, password: string }) => {
    const { data: response } = await $host.post('/user/register', data);
    return response;
}

export const confirmEmailUser = async (token: string) => {
    const { data: response } = await $host.post(`/user/confirm-email`, { token });
    return response;
}
