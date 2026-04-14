import api from "@/config/default";
import router from "@/router";
import { a } from "vue-router/dist/index-Cu9B0wDz.mjs";

export const Login = async (email: any, password: any) => {
    try {
        const res = await api.post("/auth/login", { email, password }, { withCredentials: true });
        sessionStorage.setItem("bruh", res.data.id);
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
        sessionStorage.clear();
        router.push('/');
        return res;
    } 
    catch (err : any) {
        console.log("Something wrong at FE:" + err.response.data);
        alert(err.response.data);
    }
}
