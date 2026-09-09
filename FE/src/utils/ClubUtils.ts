import api from "@/config/default";
import { toast } from 'vue3-toastify';

export const GetAllClub = async() => {
    try {
        const res = await api.get("/club");
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const GetClubDetail = async (id : any ) => {
    try {
        const res = await api.get(`/club/` + id);
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const CreateClub = async (logoFile : any, name : any, shortname : any, logo_url : any) => {
    try {
        const formData = new FormData();
        
        if (logo_url) {
            formData.append("logo_url", logo_url);
        }
        formData.append("logo", logoFile);
        formData.append("name", name);
        formData.append("shortname", shortname);
        const res = await api.post("/club", formData, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
}

export const UpdateClub = async (id : any,logoFile : any, name : any, shortname : any, logo_url : any) => {
    try {
        const formData = new FormData();
        
        if (logo_url) {
            formData.append("logo_url", logo_url);
        }
        formData.append("logo", logoFile);
        formData.append("name", name);
        formData.append("shortname", shortname);
        const res = await api.put("/club/" + id, formData, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
}

export const DeleteClub = async (id : any) => {
    try {
        const res = await api.delete("/club/" + id, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
}