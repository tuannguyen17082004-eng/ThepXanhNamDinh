import api from "@/config/default";

export const GetAllPlayers = async (position : any) => {
    try {
        const res = await api.get("/players", {params: { position }});
        
        res.data.forEach((player : any) => {
            player.birth = new Date(player.birth).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        });
        return res;
    }
    catch (err) {
        console.error("Something's wrong in FE:" + err);
    }
}

export const GetPlayerByID = async (id : any) => {
    try {
        const res = await api.get(`/players/${id}`);
        res.data.birth = new Date(res.data.birth).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return res;
    } 
    catch (err) {
        console.error("Something's wrong in FE:" + err);
    }
}

export const AddPlayer = async (imgFile : any, nationalityFile : any, backgroundFile : any, fullname : any, firstname : any, lastname : any, number : any, nationality : any, birth : any, img : any, position : any, background : any, placeBirth : any, height : any, information : any) => {
    try {
        const formData = new FormData();

        formData.append("img", imgFile);
        formData.append("nationality", nationalityFile);
        formData.append("background", backgroundFile);
        formData.append("fullname", fullname);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("number", number);
        formData.append("nationality_url", nationality);
        formData.append("birth", birth);
        formData.append("img_url", img);
        formData.append("position", position);
        formData.append("background_url", background);
        formData.append("placeBirth", placeBirth);
        formData.append("height", height);
        formData.append("information", information);

        const res = await api.post("/players", formData, { withCredentials: true });
        return res;
    } 
    catch (err : any) {
        console.error("Something's wrong in FE:" + err.response.data);
    }
}


export const UpdatePlayer = async (id : any, imgFile : any, nationalityFile : any, backgroundFile : any, fullname : any, firstname : any, lastname : any, number : any, nationality : any, birth : any, img : any, position : any, background : any, placeBirth : any, height : any, information : any) => {
    try {
        const formData = new FormData();

        formData.append("img", imgFile);
        formData.append("nationality", nationalityFile);
        formData.append("background", backgroundFile);
        formData.append("fullname", fullname);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("number", number);
        formData.append("nationality_url", nationality);
        formData.append("birth", birth);
        formData.append("img_url", img);
        formData.append("position", position);
        formData.append("background_url", background);
        formData.append("placeBirth", placeBirth);
        formData.append("height", height);
        formData.append("information", information);

        const res = await api.put(`/players/${id}`, formData, { withCredentials: true });
        return res;
    } 
    catch (err : any) {
        console.error("Something's wrong in FE:" + err.response.data);
    }
}

export const DeletePlayer = async (id : any) => {
    try {
        const res = await api.delete(`/players/${id}`, { withCredentials: true })
        return res;
    } 
    catch (err : any) {
        console.error("Something's wrong in FE:" + err.response.data);
    }
}
