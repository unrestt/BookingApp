export interface Hotel{
    id: number;
    name: string;
    location: string;
    imageUrl: string;
    bookingUrl: string;
    rating: number;
    ratingText: string;
    reviewsCount: number;
    roomType: string;
    bedType: string;
    originalPricePLN: number;
    currentPricePLN: number;
    features: string[];
}


      // "roomType": "Apartament dwupoziomowy typu Suite",
      // "bedType": "1 bardzo duże łóżko podwójne",
      // "stayDetails": "4 noce, 2 dorosłych",
      // "originalPricePLN": 7173,
      // "currentPricePLN": 5026,
      // "features": [
      //   "Zarządzany przez przedsiębiorcę",
      //   "Lokalizacja 9,9",
      //   "Już tylko 1 w tej cenie"
      // ]