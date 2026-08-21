import api from "@/config/default";
import { toast } from 'vue3-toastify';

export const GetAllSeason = async () => {
    try {
        const res = await api.get('/season');
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const GetSeasonByID = async (id : any) => {
    try {
        const res = await api.get(`/season/${id}`);
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const CreateSeason = async (season : any) => {
    try {
        const res = await api.post('/season', { season }, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const UpdateSeason = async (season : any) => {
    try {
        const res = await api.put('/season', { season }, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const DeleteSeason = async (id : any) => {
    try {
        const res = await api.delete(`/season/${id}`);
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}