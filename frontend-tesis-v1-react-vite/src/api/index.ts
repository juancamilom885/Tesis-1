import axios from "axios";
import { Pyme, PymesArray } from "../schemas/pymes";

export const API_URL = "http://localhost:5003";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** GET /pymes */
export const fetchpymes = async (): Promise<PymesArray> => {
  await delay(1500); // optional: mimic latency
  const { data } = await axios.get<PymesArray>(`${API_URL}/pymes`);
  return data;
};

/** GET /pymes/:id */
export const fetchPymesById = async (id: string): Promise<Pyme> => {
  const { data } = await axios.get<Pyme>(`${API_URL}/pymes/${id}`);
  return data;
};
