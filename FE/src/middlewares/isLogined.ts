import api from "@/config/default";

let isLogined = false;

export const isLogin = async () => {
    const id = localStorage.getItem("bruh");

    if (!id) {
        isLogined = false;
        console.log("No id");
    }
    else {
        try {
            const res = await api.get(`/users/${id}`, { withCredentials: true });

            if (res.data.id == id)
                isLogined = true;
            else {
                console.log("Unauthorized");
                isLogined = false;
            }
        } 
        catch (err) {
            isLogined = false;
        }
    }

    return isLogined;
}