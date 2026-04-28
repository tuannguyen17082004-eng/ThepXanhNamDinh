import api from "@/config/default";
import router from "@/router";

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
        alert(err.response.data);
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
        alert(err.response.data);
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
        alert(err.response.data);
    }
} 
