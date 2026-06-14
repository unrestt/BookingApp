import { useQuery } from "@tanstack/react-query"
import type { Hotel } from "../types/hotelTypes"
import { getHotels } from "../api/getHotels"

export const useHotels = ()=>{
    return useQuery<Hotel[]>({
        queryKey: ['hotels'],
        queryFn: getHotels,
    })
}