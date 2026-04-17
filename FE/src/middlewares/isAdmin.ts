import router from "@/router";
import api from "@/config/default";

export const isAdmin = async () => {
    const id = sessionStorage.getItem("bruh");

    if (!id) {
        router.push('/404');
    }
    else {
        const res = await api.get(`/users/${id}`, { withCredentials: true });

        if (res.data.id == id && res.data.role == "admin") 
            return true;
        else {
            console.log("Unauthorized");
            router.push('/404');
        }
    }
}