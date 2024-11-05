export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/proveedores/:path*",
        "/laboratorio-leche/:path*",
        "/acopio-leche/:path*",
        "/pagos/:path*",
    ],
};
