import Cookies from 'js-cookie';

export const getCookie = (name: any) => {
    return Cookies.get(name);
};

export const setCookie = (name: any, value: any, options: any) => {
    return Cookies.set(name, value, options);
};