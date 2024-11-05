"use client";

import { useState, useEffect } from "react";
import PagosTable from "@/components/pagos-table/PagosTable";
import Title from "@/components/title/Title";
import pagoService from "@/services/PagoService";
import FeedbackAlert from "@/components/feedback-alert/FeedbackAlert";
import Loading from "./loading";
import { feedbackTypes } from "@/components/feedback-alert/FeedbackAlert";

export default function PagosPage() {
    const [pagos, setPagos] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [alertType, setAlertType] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setFeedback("");
        setAlertType("");
        const fetchPagos = async () => {
            try {
                const response = await pagoService.getAll();
                if (response.data && response.data.length > 0) {
                    setPagos(response.data);
                } else {
                    setPagos([]);
                    setFeedback("Aun no se han calculado pagos");
                    setAlertType(feedbackTypes.Informative);
                }
            } catch (error) {
                setPagos([]);
                setFeedback("Ocurrio un error al intentar buscar los pagos");
                setAlertType(feedbackTypes.Error);
            }
            setLoading(false);
        };

        fetchPagos();
    }, []);

    return (
        <>
            <Title title="Planilla de Pagos" />
            {loading ? (
                <Loading />
            ) : (
                <>
                    {feedback ? (
                        <FeedbackAlert feedback={feedback} type={alertType} />
                    ) : (
                        <PagosTable pagos={pagos} />
                    )}
                </>
            )}
        </>
    );
}
