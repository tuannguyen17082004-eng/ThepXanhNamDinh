import api from "@/config/default";
import { toast } from 'vue3-toastify';

export const GetAllUser = async(page: any, limit: any) => {
    try {
        const res = await api.get('/users', {params: {page, limit},  withCredentials: true });
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE: " + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const GetUserInformation = async(id : any) => {
    try {
        const res = await api.get(`/users/${id}`, { withCredentials: true });
        return res;
    } 
    catch (err : any) {
        console.log("Something wrong at FE: " + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const UpdateUser = async (id: any, name: any, gender: any, email: any, phone: any, city: any, country: any, avatar: any) => {
    try {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("gender", gender);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("city", city);
        formData.append("country", country);
        formData.append("avatar", avatar);

        const res = await api.put(`/users/${id}`, formData, { withCredentials: true });
        return res;
    }
    catch (err : any) {
        console.log("Something wrong at FE: " + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
}

export const DisableUser = async (id: any) => {
    try  {
        const res = await api.put(`/users/disable/${id}`, { withCredentials: true });
        return res;
        
    } catch (err : any) {
        console.log("Something wrong at FE: " + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
}

export const DeleteUser = async (id: any) => {
    try {
        const res = await api.delete(`/users/${id}`, { withCredentials: true });
        return res;
    }
    catch (err : any) {
        console.log("Something wrong at FE: " + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
}