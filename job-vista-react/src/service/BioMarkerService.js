import axios from "axios";

class BioMarkerService {
    get apiUrl() {
        return window._env_?.API_URL || "http://localhost:8080";
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

}

export default new BioMarkerService();
