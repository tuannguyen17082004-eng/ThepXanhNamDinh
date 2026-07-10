import api from '@/config/default';
import { toast } from 'vue3-toastify';

export const GetAllMatch = async() => {
    try {
        const res = await api.get("/match");
        
        res.data.forEach((match : any) => {
            match.time = new Date(match.time).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
        });

        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const GetMatchDetail = async (id : any) => {
    try {
        const res = await api.get("/match/" + id);
        res.data.time = new Date(res.data.time).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const CreateMatch = async (leagueFile: any, hometeamFile: any, awayteamFile: any, stadium : any, league : any, leaguelg : any, hometeam : any, hometeamlg : any, awayteam : any, awayteamlg : any, result : any, highlights : any, time : any) => {
    try {
        const formData = new FormData();

        if (leaguelg) {
            formData.append("leaguelg", leaguelg);
        }

        if (hometeamlg) {
            formData.append("hometeamlg", hometeamlg);
        }

        if (awayteamlg) {
            formData.append("awayteamlg", awayteamlg);
        }

        if (result)
            formData.append("result", result);

        if (highlights)
            formData.append("highlights", highlights);

        formData.append("awayteamLogo", awayteamFile);
        formData.append("hometeamLogo", hometeamFile);
        formData.append("leagueLogo", leagueFile);
        formData.append("stadium", stadium);
        formData.append("league", league);
        formData.append("hometeam", hometeam);
        formData.append("awayteam", awayteam);
        formData.append("time", time);
        const res = await api.post("/match", formData, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const UpdateMatch = async (id: any, leagueFile: any, hometeamFile: any, awayteamFile: any, stadium : any, league : any, leaguelg : any, hometeam : any, hometeamlg : any, awayteam : any, awayteamlg : any, result : any, highlights : any, time : any) => {
    try {
        const formData = new FormData();

        if (leaguelg) {
            formData.append("leaguelg", leaguelg);
        }

        if (hometeamlg) {
            formData.append("hometeamlg", hometeamlg);
        }

        if (awayteamlg) {
            formData.append("awayteamlg", awayteamlg);
        }

        if (result)
            formData.append("result", result);

        if (highlights)
            formData.append("highlights", highlights);

        formData.append("awayteamLogo", awayteamFile);
        formData.append("hometeamLogo", hometeamFile);
        formData.append("leagueLogo", leagueFile);
        formData.append("stadium", stadium);
        formData.append("league", league);
        formData.append("hometeam", hometeam);
        formData.append("awayteam", awayteam);
        formData.append("time", time);

        const res = await api.put(`/match/${id}`, formData, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const DeleteMatch = async (id: any) => {
    try {
        const res = await api.delete(`/match/${id}`, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}