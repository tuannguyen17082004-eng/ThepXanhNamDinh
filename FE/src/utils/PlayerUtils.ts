import api from "@/config/default";
import { toast } from 'vue3-toastify';

export const GetAllPlayers = async (position : any) => {
    try {
        const res = await api.get("/players", {params: { position }});
        
        res.data.forEach((player : any) => {
            player.birth = new Date(player.birth).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        });
        return res;

    } catch (err : any) {
        console.error("Something's wrong in FE:" + err);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const GetPlayerByID = async (id : any) => {
    try {
        const res = await api.get(`/players/${id}`);
        res.data.birth = new Date(res.data.birth).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return res;

    } catch (err : any) {
        console.error("Something's wrong in FE:" + err);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const AddPlayer = async (imgFile : any, nationalityFile : any, backgroundFile : any, fullname : any, firstname : any, lastname : any, number : any, nationality : any, birth : any, img : any, position : any, background : any, placeBirth : any, height : any, information : any) => {
    try {
        const formData = new FormData();
        if (img) 
            formData.append("img_url", img);

        if (background) 
            formData.append("background_url", background);
        
        if (nationality) 
            formData.append("nationality_url", nationality);
        
        formData.append("img", imgFile);
        formData.append("nationality", nationalityFile);
        formData.append("background", backgroundFile);
        formData.append("fullname", fullname);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("number", number);
        formData.append("birth", birth);
        formData.append("position", position);
        formData.append("placeBirth", placeBirth);
        formData.append("height", height);
        formData.append("information", information);

        const res = await api.post("/players", formData, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.error("Something's wrong in FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}


export const UpdatePlayer = async (id : any, imgFile : any, nationalityFile : any, backgroundFile : any, fullname : any, firstname : any, lastname : any, number : any, nationality : any, birth : any, img : any, position : any, background : any, placeBirth : any, height : any, information : any) => {
    try {
        const formData = new FormData();

        if (img) 
            formData.append("img_url", img);

        if (background) 
            formData.append("background_url", background);
        
        if (nationality) 
            formData.append("nationality_url", nationality);

        formData.append("img", imgFile);
        formData.append("nationality", nationalityFile);
        formData.append("background", backgroundFile);
        formData.append("fullname", fullname);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("number", number);
        formData.append("birth", birth);
        formData.append("position", position);
        formData.append("placeBirth", placeBirth);
        formData.append("height", height);
        formData.append("information", information);

        const res = await api.put(`/players/${id}`, formData, { withCredentials: true });
        return res;

    } catch (err : any) {
        console.error("Something's wrong in FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}

export const DeletePlayer = async (id : any) => {
    try {
        const res = await api.delete(`/players/${id}`, { withCredentials: true })
        return res;

    } catch (err : any) {
        console.error("Something's wrong in FE:" + err.response.data);
        toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}
