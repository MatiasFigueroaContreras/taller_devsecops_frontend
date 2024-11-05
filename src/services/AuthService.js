import axios from "@/lib/axios";

const AUTH_API_ENDPOINT = "/auth";

class AuthService {
    async login(correo, password) {
        return axios.post(
            AUTH_API_ENDPOINT + "/login",
            {
                correo: correo,
                password: password,
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    async refreshToken(token, correo) {
        return axios.post(
            AUTH_API_ENDPOINT + "/refresh",
            {},
            {
                params: {
                    token: token,
                    correo: correo,
                },
            }
        );
    }
}

const authService = new AuthService();
export default authService;
