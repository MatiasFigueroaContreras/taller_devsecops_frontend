"use client";

import styles from "./navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    return (
        <header className={styles.navbar}>
            <Link
                href="/proveedores/registrar"
                className={
                    pathname == "/proveedores/registrar"
                        ? styles["link-active"]
                        : ""
                }
            >
                Ingresar Proveedor
            </Link>
            <Link
                href="/proveedores"
                className={
                    pathname == "/proveedores" ? styles["link-active"] : ""
                }
            >
                Listar Proveedores
            </Link>
            <h1 className={styles.logo}>MilkStgo</h1>
            <div className={styles.dropdown}>
                <div className={styles["dropdown-header"]}>
                    <a
                        className={
                            pathname == "/pagos" ||
                            pathname == "/pagos/calcular"
                                ? styles["link-active"]
                                : ""
                        }
                    >
                        Planilla de Pagos
                    </a>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="26px"
                        viewBox="0 0 24 24"
                        width="26px"
                        fill="#FFFFFF"
                        className={
                            pathname == "/pagos" ||
                            pathname == "/pagos/calcular"
                                ? styles["svg-active"]
                                : ""
                        }
                    >
                        <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
                    </svg>
                </div>
                <ul className={styles["dropdown-content"]}>
                    <li>
                        <Link
                            href="/pagos"
                            className={
                                pathname == "/pagos"
                                    ? styles["link-active"]
                                    : ""
                            }
                        >
                            Mostrar planilla de pagos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/pagos/calcular"
                            className={
                                pathname == "/pagos/calcular"
                                    ? styles["link-active"]
                                    : ""
                            }
                        >
                            Calcular planilla de pagos
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.dropdown}>
                <div className={styles["dropdown-header"]}>
                    <a
                        className={
                            pathname == "/acopio-leche/importar" ||
                            pathname == "/laboratorio-leche/importar"
                                ? styles["link-active"]
                                : ""
                        }
                    >
                        Importar Excel
                    </a>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="26px"
                        viewBox="0 0 24 24"
                        width="26px"
                        fill="#FFFFFF"
                        className={
                            pathname == "/acopio-leche/importar" ||
                            pathname == "/laboratorio-leche/importar"
                                ? styles["svg-active"]
                                : ""
                        }
                    >
                        <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
                    </svg>
                </div>
                <ul className={styles["dropdown-content"]}>
                    <li>
                        <Link
                            href="/acopio-leche/importar"
                            className={
                                pathname == "/acopio-leche/importar"
                                    ? styles["link-active"]
                                    : ""
                            }
                        >
                            Acopio de leche
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/laboratorio-leche/importar"
                            className={
                                pathname == "/laboratorio-leche/importar"
                                    ? styles["link-active"]
                                    : ""
                            }
                        >
                            Grasa y sólidos totales
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
