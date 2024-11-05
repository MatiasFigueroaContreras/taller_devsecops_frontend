import { axiosAuth } from "@/lib/axios";

const ACOPIO_LECHE_API_ENDPOINT = "/acopios-leche";

class AcopioLecheService {
    async import(file, year, mes, quincena) {
        return axiosAuth.post(
            ACOPIO_LECHE_API_ENDPOINT + "/importar",
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

const acopioLecheService = new AcopioLecheService();

export default acopioLecheService;
