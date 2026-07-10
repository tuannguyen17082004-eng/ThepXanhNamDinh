export interface User {
    id: string,
    name: string,
    gender: string,
    email: string,
    phone: string,
    city: string,
    country: string,
    avatar: {
        id: string,
        link: string
    },
    role: string,
    isActived: boolean
}