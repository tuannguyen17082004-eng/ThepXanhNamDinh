import api from "@/config/default";

export const GetAllVideos = async(page : any, limit : any, title : any, time : any) => {
    try {
        const res = await api.get("/videos",{ params: {page, limit, time, title}, withCredentials: true });

        res.data.forEach((video : any) => {
            video.time = new Date(video.time).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
        });

        return res;
    }
    catch (err : any) {
        console.error("Something's wrong:" + err.response.data);
    }
}

export const GetVideoById = async(id : any) => {
    try {
        const res = await api.get(`/videos/${id}`, { withCredentials: true });
        res.data.time = new Date(res.data.time).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
        return res;
    }
    catch (err : any) {
        console.error("Something's wrong:" + err.response.data);
    }
}