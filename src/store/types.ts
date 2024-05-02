export interface InitialState {
  news: News[];
}

export interface News {
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

export interface Comment {
  by: string;
  id: number;
  kids?: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
  deleted?: boolean;
  descendants?: number;
}