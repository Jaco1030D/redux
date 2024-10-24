import { configTypes } from "./types";

export const api = "https://backendtms-0e856cbefd47.herokuapp.com/api";

export const requestConfig = (method: string, data: BodyInit | null | undefined | object, token: string | null = null, image: boolean = false): object => {

  console.log(image);
  
  let config: configTypes;

  if (image) {
    config = {
      method: method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method: method,
      body: null,
      headers: {},
    };
  } else {
    config = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
