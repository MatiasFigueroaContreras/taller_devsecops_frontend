import { axiosAuth } from "@/lib/axios";

const LABORTORIO_LECHE_API_ENDPOINT = "/laboratorio-leche";

class LaboratorioLecheService {
    async import(file, year, mes, quincena) {
        return axiosAuth.post(
            LABORTORIO_LECHE_API_ENDPOINT + "/importar",
            {
                file: file,
                year: year,
                mes: mes,
                quincena: quincena,
            },
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
    }
}

const laboratorioLecheService = new LaboratorioLecheService();

export default laboratorioLecheService;
