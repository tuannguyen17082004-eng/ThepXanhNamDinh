import api from '@/config/default';

export const GetScoreboard = async () => {
    try {
        const res = await api.get("/scoreboard", {withCredentials: true});
        return res;
    }
    catch (err) {
        console.error("Something's wrong in FE:" + err);
    }
}