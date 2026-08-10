import api from "@/config/default";
import router from "@/router";
import { toast } from 'vue3-toastify';

export const Login = async (email: any, password: any) => {
    try {
        const res = await api.post("/auth/login", { email, password }, { withCredentials: true });

        localStorage.setItem("bruh", res.data.id);
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
        return res;
    }
    catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
} 

export const Register = async (name: any, gender: any, email: any, phone: any, password: any, otp: any) => {
    try {
        const res = await api.post("/users", { name, gender, email, phone, password, otp });
        return res;
    } 
    catch (err : any) {
        console.log("Something wrong at FE: " + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const CreateAdmin = async(name: any, gender: any, email: any, phone: any, password: any) => {
    try {
        const res = await api.post("/auth/admin", { name, gender, email, phone, password }, { withCredentials: true });
        router.push('/Admin');
        return res;

    } catch (err : any) {
        console.log("Something wrong at FE: " + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const VerifyUser = async (email: any) => {
    try {
        const res = await api.post('/users/verify', { email });
        return res;

    } catch (err: any) {
        console.log("Something wrong at FE: " + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const ForgetPassword = async (email: any) => {
    try {
        const res = await api.post("/auth/forget-password", { email });
        return res;
    } 
    catch (err : any) {
        console.log("Something wrong at FE: " + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const ResetPassword = async (email: any, password: any, otp: any) => {
    try {
        const res = await api.post("/auth/reset-password", { email, password, otp });
        return res;
    } 
    catch (err : any) {
        console.log("Something wrong at FE: " + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}
