export interface ITmdbListItem {
    id: number;
    title: string;
    poster_path: string;
}

export interface ITmdbList {
    items: ITmdbListItem[];
}
