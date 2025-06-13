import axios from "axios";

class BioMarkerService {
    get apiUrl() {
        var apiUrl = window._env_?.API_URL || "http://localhost:8080";
        if(!apiUrl.includes("localhost") && !apiUrl.startsWith("https://"))
         apiUrl = "https://" + apiUrl
        return apiUrl;
    }

    saveFile(file) {
        const formData = new FormData();
        formData.append("file", file);
        return axios.post(this.apiUrl + "/biomarker", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    getAll() {
        return axios.get(this.apiUrl + "/biomarker");
    }

    deleteAll(){
        return axios.delete(this.apiUrl + "/biomarker")
    }

}

export default new BioMarkerService();
