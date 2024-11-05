import styles from "./proveedores-table.module.css";
import ModalEditar from "../modal-editar/ModalEditar";
import { useState } from "react";

export default function ProveedoresTable({ proveedores }) {
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
                            <td>
                                <button className={styles.editar} onClick={() => handleEdit(proveedor)}>
                                    <img
                                        src="/images/pencil-svgrepo-com.svg"
                                        alt="Editar proveedor"
                                        width="28"
                                        height="28"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalVisible && (
                <ModalEditar
                    proveedor={selectedProveedor}
                    onClose={() => {
                        setModalVisible(false)
                        setSelectedProveedor(null)
                    }}
                />
            )}
        </>
    );
}
