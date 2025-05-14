export interface Poster {
    id: number;
    poster_name: string;
    address: string;
    pic_name: string;
    date: Date;
}

export interface PosterObject {
    data: Poster;
}