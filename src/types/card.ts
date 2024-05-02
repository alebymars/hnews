export interface Card {
    id: number;
    descendants?: number;
    title: string;
    score: number;
    by: string;
    time: number;
    type: string;
    url: string;
    kids?: number[];
}