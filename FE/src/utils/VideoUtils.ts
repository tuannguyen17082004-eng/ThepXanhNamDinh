import api from "@/config/default";
import { toast } from 'vue3-toastify';

export const GetAllVideos = async(page : any, limit : any, title : any, time : any) => {
    try {
        const res = await api.get("/videos", { params: {page, limit, time, title}, withCredentials: true });

        res.data.forEach((video : any) => {
            video.time = new Date(video.time).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
        });

        return res;

    } catch (err : any) {
        console.error("Something's wrong:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const GetVideoById = async(id : any) => {
    try {
        const res = await api.get(`/videos/${id}`, { withCredentials: true });
        res.data.time = new Date(res.data.time).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
        return res;

    } catch (err : any) {
        console.error("Something's wrong:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const CreateVideo = async(linkFile : any, posterFile : any, video_url : any, poster_url : any, title : any) => {
    try {
        const formData = new FormData();

        if (video_url)
            formData.append("link_url", video_url);

        if (poster_url)
            formData.append("poster_url", poster_url);

        formData.append("link", linkFile);
        formData.append("poster", posterFile);
        formData.append("title", title);

        const res = await api.post("/videos", formData, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.error("Something's wrong:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const UpdateVideo = async(id : any, linkFile : any, posterFile : any, video_url : any, poster_url : any, title : any) => {
    try {
        const formData = new FormData();

        if (video_url)
            formData.append("link_url", video_url);

        if (poster_url)
            formData.append("poster_url", poster_url);

        formData.append("link", linkFile);
        formData.append("poster", posterFile);
        formData.append("title", title);

        const res = await api.put(`/videos/${id}`, formData, { withCredentials: true });
        return res;
        
    } catch (err : any) {
        console.error("Something's wrong:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const DeleteVideo = async (id : any) => {
    try {
        const res = await api.delete(`/videos/${id}`, { withCredentials: true })
        return res;
    } 
    catch (err : any) {
        console.error("Something's wrong:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}
