import styles from "./proveedores-table.module.css";
import ModalEditar from "../modal-editar/ModalEditar";
import { useState } from "react";

export default function ProveedoresTable({ proveedores, onDelete }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProveedor, setSelectedProveedor] = useState(null);

    const handleEdit = (proveedor) => {
        setSelectedProveedor(proveedor);
        setModalVisible(true);
    };

    return (
        <>
            <table className={styles["proveedores-table"]}>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Afecto a Retención</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map((proveedor, index) => (
                        <tr key={index}>
                            <td>{proveedor.codigo}</td>
                            <td>{proveedor.nombre}</td>
                            <td>{proveedor.categoria}</td>
                            <td>{proveedor.retencion}</td>
                            <td className={styles.actions}>
                                <button
                                    className={styles.editar}
                                    onClick={() => handleEdit(proveedor)}
                                >
                                    <img
                                        src="/images/pencil-svgrepo-com.svg"
                                        alt="Editar proveedor"
                                        width="28"
                                        height="28"
                                    />
                                </button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960"
                                    fill="red"
                                    className={styles.delete}
                                    onClick={() => onDelete(proveedor)}
                                >
                                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                </svg>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalVisible && (
                <ModalEditar
                    proveedor={selectedProveedor}
                    onClose={() => {
                        setModalVisible(false);
                        setSelectedProveedor(null);
                    }}
                />
            )}
        </>
    );
}
