import api from "@/config/default";

let isLogined = false;

export const isLogin = async () => {
    try {
        const res = await api.get(`/users/profile`, { withCredentials: true });

        if (res.data)
            isLogined = true;
        else {
            console.log("Unauthorized");
            isLogined = false;
        }
    }
    catch (err : any) {
        console.log("Something wrong at FE: " + err.response.data);
        isLogined = false;
    }

    return isLogined;
}