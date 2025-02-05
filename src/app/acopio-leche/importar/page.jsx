"use client";

import Title from "@/components/title/Title";
import UploadCard from "@/components/upload-zone/UploadZone";
import AcopioLecheService from "@/services/AcopioLecheService";
import FeedbackAlert from "@/components/feedback-alert/FeedbackAlert";
import { feedbackTypes } from "@/components/feedback-alert/FeedbackAlert";
import { useState } from "react";

export default function ImportarAcopioPage() {
    const [feedback, setFeedback] = useState("");
    const [alertType, setAlertType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data) => {
        setIsSubmitting(true);
        setFeedback("");
        try {
            await AcopioLecheService.import(
                data.file,
                data.year,
                data.month,
                data.fortnight
            );
            setFeedback("Se importaron correctamente los datos!");
            setIsSubmitting(false);
            setAlertType(feedbackTypes.Success);
        } catch (error) {
            setAlertType(feedbackTypes.Error);
            if (error.response === undefined || error.response.status >= 500) {
                setFeedback("Ocurrió un error al intentar subir los datos");
                setIsSubmitting(false);
            } else {
                setFeedback(error.response.data);
                setIsSubmitting(false);
            }
        }
    };

    return (
        <>
            <Title title="Subir datos Acopios de Leche" />
            {feedback ? (
                <FeedbackAlert feedback={feedback} type={alertType} />
            ) : null}
            <UploadCard
                title="Subir archivo con los kilos de leche"
                startYear={2020}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </>
    );
}
