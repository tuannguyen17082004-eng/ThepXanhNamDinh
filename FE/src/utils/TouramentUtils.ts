import api from "@/config/default";
import { toast } from 'vue3-toastify';

export const GetAllTourament = async() => {
    try {
        const res = await api.get("/tourament");
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const GetTouramentDetail = async (id : any ) => {
    try {
        const res = await api.get(`/tourament/` + id);
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const CreateTourament = async (logoFile : any, name : any, logo_url : any) => {
    try {
        const formData = new FormData();
        
        if (logo_url) {
            formData.append("logo_url", logo_url);
        }
        formData.append("tourament", logoFile);
        formData.append("name", name);
        const res = await api.post("/tourament", formData, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
}

export const UpdateTourament = async (id : any, logoFile : any, name : any, logo_url : any) => {
    try {
        const formData = new FormData();
        
        if (logo_url) {
            formData.append("logo_url", logo_url);
        }
        formData.append("tourament", logoFile);
        formData.append("name", name);
        const res = await api.put("/tourament/" + id, formData, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
}

export const DeleteTourament = async (id : any) => {
    try {
        const res = await api.delete("/tourament/" + id, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
}