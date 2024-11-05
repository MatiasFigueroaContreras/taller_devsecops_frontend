import { axiosAuth } from "@/lib/axios";

const PROVEEDORES_API_ENDPOINT = "/proveedores";

class ProveedorService {
    async create(codigo, nombre, categoria, retencion) {
        return axiosAuth.post(
            PROVEEDORES_API_ENDPOINT,
            {
                codigo: codigo,
                nombre: nombre,
                categoria: categoria,
                retencion: retencion,
            },
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
    }

    async update(id, codigo, nombre, categoria, retencion) {
        return axiosAuth.put(
            PROVEEDORES_API_ENDPOINT + "/" + id,
            {
                codigo: codigo,
                nombre: nombre,
                categoria: categoria,
                retencion: retencion,
            },
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
    }

    async getAll() {
        return axiosAuth.get(PROVEEDORES_API_ENDPOINT);
    }
}

export default new ProveedorService();