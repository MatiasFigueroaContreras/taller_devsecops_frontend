import { axiosAuth } from "@/lib/axios";

const PAGO_API_ENDPOINT = "/pagos";

class PagoService {
    async calcular(year, mes, quincena) {
        return axiosAuth.post(
            PAGO_API_ENDPOINT + "/calcular",
            {
                year: year,
                mes: mes,
                quincena: quincena,
            },
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
    }

    async getAll() {
        return axiosAuth.get(PAGO_API_ENDPOINT);
    }

    async getAllByQuincena(year, mes, quincena) {
        return axiosAuth.get(PAGO_API_ENDPOINT + "/byquincena", {
            headers: { "Content-Type": "multipart/form-data" },
            params: {
                year: year,
                mes: mes,
                quincena: quincena,
            },
        });
    }
}

const pagoService= new PagoService();

export default pagoService;
