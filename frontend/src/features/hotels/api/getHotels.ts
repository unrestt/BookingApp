import { api } from "../../../api/axiosInstance";
import type { Hotel } from "../types/hotelTypes";

export const getHotels = async() : Promise<Hotel[]> => {
    const {data} = await api.get<Hotel[]>('/hotels');
    return data;
}