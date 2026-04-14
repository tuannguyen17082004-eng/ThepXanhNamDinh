import api from "@/config/default";

export const GetAllPlayers = async (position : any) => {
    try {
        const res = await api.get("/players", {params: { position }});
        res.data.birth = new Date(res.data.birth).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return res;
    }
    catch (err) {
        console.error("Something's wrong in FE:" + err);
    }
}

export const GetPlayerByID = async (id : any) => {
    try {
        const res = await api.get(`/players/${id}`);
        res.data.birth = new Date(res.data.birth).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return res;
    } 
    catch (err) {
        console.error("Something's wrong in FE:" + err);
    }
}
