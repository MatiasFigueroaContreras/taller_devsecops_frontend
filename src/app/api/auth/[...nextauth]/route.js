import { axiosAuth, unsetAccessToken } from "@/lib/axios";
import authService from "@/services/AuthService";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                correo: {
                    label: "Correo",
                    type: "email",
                    placeholder: "correo@gmail.com",
                },
                password: { label: "Contraseña", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await authService.login(
                        credentials.correo,
                        credentials.password
                    );
                    return response.data;
                } catch (error) {
                    if (
                        error.response === undefined ||
                        error.response.status >= 500
                    ) {
                        throw new Error(
                            "Ocurrió un error al intentar iniciar sesión, inténtalo más tarde"
                        );
                    } else {
                        throw new Error(
                            "Las credenciales ingresadas no son correctas"
                        );
                    }
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                try {
                    unsetAccessToken();
                    const response = await authService.refreshToken(
                        token.refreshToken,
                        session.user.user.correo
                    );

                    return response.data;
                } catch (e) {
                    return Promise.reject(new Error("Debe iniciar sesión"));
                }
            }

            if (user) {
                // Logeo inicial
                return { ...token, ...user };
            }

            if (Date.now() < token.accessExpiration) {
                // Token vigente
                return token;
            }

            if (Date.now() < token.refreshExpiration) {
                // Token de acceso vencido, pero token de refresco vigente
                unsetAccessToken();
                try {
                    const response = await authService.refreshToken(
                        token.refreshToken,
                        null
                    );
                    return response.data;
                } catch (e) {
                    return Promise.reject(new Error("Debe iniciar sesión"));
                }
            }

            // Token de refresco vencido
            return Promise.reject(new Error("Debe iniciar sesión"));
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };