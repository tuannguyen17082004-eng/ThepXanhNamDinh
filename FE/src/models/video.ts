export interface Video {
    _id: string;
    video: {
        link: string,
        id: string
    };
    poster: {
        link: string,
        id: string
    };
    title: string;
    time: string;
}