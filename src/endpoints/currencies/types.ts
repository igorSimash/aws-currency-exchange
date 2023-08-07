interface currency {
    id: string;
    name: string;
    fullName: string;
}
export interface CurrenciesResponse {
    currencies: currency[];
}
