import api from "@/config/default";

export const GetAllNews = async (page : any, limit : any, type : any, title : any, author : any, time : any) => {
    try {
        const res = await api.get("/news", {params: {page, limit, type, title, author, time}});

        res.data.forEach((news : any) => {
            news.time = new Date(news.time).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
        });

        return res;
    }
    catch (err) {
        console.error("Something's wrong in FE:" + err);
    }
}

export const GetNewsById = async (id : any) => {
    try {
        const res = await api.get(`/news/${id}`);
        res.data.time = new Date(res.data.time).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
        return res;
    }
    catch (err) {
        console.error("Something's wrong in FE:" + err);
    }
}