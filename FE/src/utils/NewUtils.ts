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

export const AddNews = async (imgFile : any, img_url : any, title : any, type : any, author : any, content : any) => {
    try {
        const formData = new FormData();

        formData.append("img", imgFile);
        formData.append("img_url", img_url);
        formData.append("title", title);
        formData.append("type", type);
        formData.append("author", author);
        formData.append("content", content);

        const res = await api.post("/news", formData, { withCredentials: true });
        return res;
    } 
    catch (err : any) {
        console.error("Something's wrong in FE:" + err.response.data);
    }
}

export const UpdateNews = async (id : any, imgFile : any, img : any, title : any, type : any, author : any, content : any) => {
    try {
        const formData = new FormData();

        formData.append("img", imgFile);
        formData.append("img_url", img);
        formData.append("title", title);
        formData.append("type", type);
        formData.append("author", author);
        formData.append("content", content);

        const res = await api.put(`/news/${id}`, formData, { withCredentials: true });
        return res;
    } 
    catch (err : any) {
        console.error("Something's wrong in FE:" + err.response.data);
    }
}

export const DeleteNews = async (id : any) => {
    try {
        const res = await api.delete(`/news/${id}`, { withCredentials: true })
        return res;
    } 
    catch (err : any) {
        console.error("Something's wrong in FE:" + err.response.data);
    }
}