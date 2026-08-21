import api from '@/config/default';
import { toast } from 'vue3-toastify'

export const GetScoreboard = async (season : any) => {
    try {
        const res = await api.get("/scoreboard", { params: { season } });
        return res;
    }
    catch (err : any) {
        console.error("Something's wrong in FE:" + err);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}