"use client";

import styles from "./calcular-pagos.module.css";

import SelectQuincena from "@/components/select-quincena/SelectQuincena";
import Title from "@/components/title/Title";
import PagosTable from "@/components/pagos-table/PagosTable";
import pagoService from "@/services/PagoService";
import FeedbackAlert from "@/components/feedback-alert/FeedbackAlert";
import { feedbackTypes } from "@/components/feedback-alert/FeedbackAlert";
import { useState } from "react";
import Loading from "../loading";

export default function CalcularPagosPage() {
    const [pagos, setPagos] = useState([]);
    const [quincena, setQuincena] = useState({});

    const [feedback, setFeedback] = useState("");
    const [alertType, setAlertType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleQuincenaChange = (year, month, fortnight) => {
        setQuincena({ year, month, fortnight });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback("");
        setLoading(true);
        try {
            const resCalcular = await pagoService.calcular(
                quincena.year,
                quincena.month,
                quincena.fortnight
            );

            setFeedback(resCalcular.data);
            setAlertType(feedbackTypes.Informative);
            setIsSubmitting(false);
            setLoading(false);

            const resPagos = await pagoService.getAllByQuincena(
                quincena.year,
                quincena.month,
                quincena.fortnight
            );

            if (resPagos.data) {
                setPagos(resPagos.data);
            }
        } catch (error) {
            setPagos([]);
            setAlertType(feedbackTypes.Error);
            if (error.response === undefined || error.response.status >= 500) {
                setFeedback("Ocurrió un error al intentar calcular los pagos");
                setIsSubmitting(false);
                setLoading(false);
            } else {
                setFeedback(error.response.data.message);
                setIsSubmitting(false);
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Title title="Calcular Planilla de Pagos" />
            {feedback ? (
                <FeedbackAlert feedback={feedback} type={alertType} />
            ) : null}
            <div className={styles["top-content"]}>
                <form className={styles["select-quincena"]} onSubmit={handleSubmit}>
                    <SelectQuincena
                        startYear={2020}
                        onChange={handleQuincenaChange}
                    />
                    <button className={styles.button} type="submit">Calcular</button>
                </form>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <>{pagos.length > 0 ? <PagosTable pagos={pagos} /> : null}</>
            )}
        </>
    );
}
