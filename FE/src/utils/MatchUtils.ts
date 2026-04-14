import api from '@/config/default';

export const GetAllMatch = async() => {
    try {
        const res = await api.get("/match");
        
        res.data.forEach((match : any) => {
            match.time = new Date(match.time).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
        });

        return res;
    }
    catch (err) {
        console.log("Something wrong at FE:" + err);
    }
}

export const GetMatchDetail = async (id : any) => {
    try {
        const res = await api.get("/match/" + id);
        res.data.time = new Date(res.data.time).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
        return res;
    } 
    catch (err) {
        console.log("Something wrong at FE:" + err);
    }
}