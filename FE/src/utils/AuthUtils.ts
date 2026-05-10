import api from "@/config/default";
import router from "@/router";
import { toast } from 'vue3-toastify';

export const Login = async (email: any, password: any) => {
    try {
        const res = await api.post("/auth/login", { email, password }, { withCredentials: true });
        localStorage.setItem("bruh", res.data.id);
        if (res.data.role == "admin")
            router.push('/Admin');
        else
        router.push('/');
        return res;
    } 
    catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const Logout = async () => {
    try {
        const res = await api.post("/auth/logout", { withCredentials: true });
        localStorage.clear();
        router.push('/');
        return res;
    } 
    catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const ChangePassword = async (currentPassword: any, newPassword: any) => {
    try {
        const id = localStorage.getItem("bruh");
        const res = await api.put(`/auth/change-password`, { id, currentPassword, newPassword }, { withCredentials: true });
        router.push('/Profile');
        return res;
    }
    catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
} 

export const Register = async (name: any, username: any, email: any, phone: any, password: any, avatar: any) => {
    try {
        const res = await api.post("/users", { name, username, email, phone, password, avatar });
        router.push('/Login');
        return res;
    } 
    catch (err : any) {
        console.log("Something wrong at FE: " + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}
