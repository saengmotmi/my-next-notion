import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export async function fetcher(url: string) {
  const { data } = await axios.get(BASE_URL + url);

  return data;
}
