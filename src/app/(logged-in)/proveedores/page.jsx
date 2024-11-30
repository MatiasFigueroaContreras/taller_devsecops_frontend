"use client";

import { useState, useEffect } from "react";
import ProveedoresTable from "@/components/proveedores-table/ProveedoresTable";
import Title from "@/components/title/Title";
import proveedorService from "@/services/ProveedorService";
import FeedbackAlert from "@/components/feedback-alert/FeedbackAlert";
import { feedbackTypes } from "@/components/feedback-alert/FeedbackAlert";
import Loading from "./loading";
import ValidateDelete from "@/components/validate-delete/ValidateDelete";

export default function ProveedoresPage() {
    const [proveedores, setProveedores] = useState([]);

    const [feedback, setFeedback] = useState("");
    const [alertType, setAlertType] = useState("");
    const [loading, setLoading] = useState(true);

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [proveedorToDelete, setProveedorToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const response = await proveedorService.getAll();
                if (response.data && response.data.length > 0) {
                    setProveedores(response.data);
                    setFeedback("");
                    setAlertType("");
                } else {
                    setProveedores([]);
                    setFeedback("Aun no se han registrado proveedores");
                    setAlertType(feedbackTypes.Informative);
                }
            } catch (error) {
                setProveedores([]);
                setFeedback(
                    "Ocurrio un error al intentar buscar los proveedores"
                );
                setAlertType(feedbackTypes.Error);
            }
            setLoading(false);
        };

        fetchProveedores();
    }, [reload]);

    const onDeleteProveedorClick = (proveedor) => {
        setIsOpenDeleteModal(true);
        setProveedorToDelete(proveedor);
    };

    const onValidateDelete = async () => {
        setIsDeleting(true);
        try {
            await proveedorService.delete(proveedorToDelete.id);
            setIsOpenDeleteModal(false);
            setReload(!reload);
        }
        catch (error) {
            setFeedback("Ocurrio un error al intentar eliminar el proveedor");
            setAlertType(feedbackTypes.Error);
            setIsOpenDeleteModal(false);
        }
        setIsDeleting(false);
    }

    return (
        <>
            <Title title="Proveedores Registrados" />
            {loading ? (
                <Loading />
            ) : (
                <>
                    {feedback ? (
                        <FeedbackAlert feedback={feedback} type={alertType} />
                    ) : (
                        <>
                            <ProveedoresTable
                                proveedores={proveedores}
                                onDelete={onDeleteProveedorClick}
                            />
                            <ValidateDelete
                                isOpen={isOpenDeleteModal}
                                name={`el proveedor ${proveedorToDelete?.codigo}`}
                                onClose={() => setIsOpenDeleteModal(false)}
                                onDelete={onValidateDelete}
                                isDeleting={isDeleting}
                            />
                        </>
                    )}
                </>
            )}
        </>
    );
}
