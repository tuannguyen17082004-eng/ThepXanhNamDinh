import router from "@/router";
import api from "@/config/default";

export const isAdmin = async () => {
    try {
        const res = await api.get(`/users/profile`, { withCredentials: true });

        if (res.data.role == "admin")
            return true;
        else {
            console.log("Unauthorized");
            router.push('/404');
        }
    } catch (err: any) {
        console.log("Something wrong at FE: " + err.response.data);
        router.push('/404');
    }
}
