"use client";

import { useState, useEffect } from "react";
import ProveedoresTable from "@/components/proveedores-table/ProveedoresTable";
import Title from "@/components/title/Title";
import ProveedorService from "@/services/ProveedorService";
import FeedbackAlert from "@/components/feedback-alert/FeedbackAlert";
import { feedbackTypes } from "@/components/feedback-alert/FeedbackAlert";
import Loading from "./loading";

export default function ProveedoresPage() {
    const [proveedores, setProveedores] = useState([]);

    const [feedback, setFeedback] = useState("");
    const [alertType, setAlertType] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const response = await ProveedorService.getAll();
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
                console.log(error);
                setProveedores([]);
                setFeedback(
                    "Ocurrio un error al intentar buscar los proveedores"
                );
                setAlertType(feedbackTypes.Error);
            }
            setLoading(false);
        };

        fetchProveedores();
    }, []);

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
                        <ProveedoresTable proveedores={proveedores} />
                    )}
                </>
            )}
        </>
    );
}
