export interface News{
    _id: string;
    img: {
        link: string;
        id: string;
    };
    title: string;
    type: string;
    time: string;
    content: string;
    author: string;
}