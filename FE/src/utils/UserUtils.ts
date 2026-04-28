import api from "@/config/default";
import router from "@/router";

export const GetUserInformation = async(id : any) => {
    try {
        const res = await api.get(`/users/${id}`, { withCredentials: true });
        return res;
    } 
    catch (err : any) {
        console.log("Something wrong at FE: " + err.response.data);
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
        return err.response.data;
    }
}

export const UpdateUser = async (id: any, name: any, username: any, email: any, phone: any, avatar: any) => {
    try {
        const res = await api.put(`/users/${id}`, { name, username, email, phone, avatar }, { withCredentials: true });
        return res;
    }
    catch (err : any ) {
        console.log("Something wrong at FE: " + err.response.data);
        return err.response.data;
    }
}