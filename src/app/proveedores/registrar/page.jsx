"use client";

import styles from "./register-page.module.css";

import Title from "@/components/title/Title";
import InputField from "@/components/input-field/InputField";
import SelectField from "@/components/select-field/SelectField";
import ProveedorService from "@/services/ProveedorService";
import FeedbackAlert from "@/components/feedback-alert/FeedbackAlert";
import { feedbackTypes } from "@/components/feedback-alert/FeedbackAlert";
import { useState } from "react";
import ButtonStyled from "@/components/button-styled/ButtonStyled";

export default function RegisterPage() {
    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [retencion, setRetencion] = useState("");

    const [feedback, setFeedback] = useState("");
    const [alertType, setAlertType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categorias = ["A", "B", "C", "D"];
    const retenciones = ["Si", "No"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback("");
        try {
            await ProveedorService.create(codigo, nombre, categoria, retencion);
            setTimeout(() => {
                setFeedback("Proveedor registrado correctamente!");
                setIsSubmitting(false);
            }, 500);
            setAlertType(feedbackTypes.Success);
        } catch (error) {
            setAlertType(feedbackTypes.Error);
            if (error.response === undefined || error.response.status >= 500) {
                setTimeout(() => {
                    setFeedback(
                        "Ocurrió un error al intentar registrar el proveedor"
                    );
                    setIsSubmitting(false);
                }, 500);
            } else {
                setTimeout(() => {
                    setFeedback(error.response.data);
                    setIsSubmitting(false);
                }, 500);
            }
        }
    };

    return (
        <>
            <Title title="Registro de Proveedor" />
            {feedback ? (
                <FeedbackAlert feedback={feedback} type={alertType} />
            ) : null}
            <form onSubmit={handleSubmit} className={styles.form}>
                <InputField
                    name="nombre"
                    type="text"
                    placeholder="Nombre"
                    onChange={(e) => setNombre(e.target.value)}
                />
                <InputField
                    name="codigo"
                    type="number"
                    placeholder="Código"
                    minLength="5"
                    maxLength="5"
                    onChange={(e) => setCodigo(e.target.value)}
                />
                <div className={styles.selects}>
                    <SelectField
                        name="categoria"
                        placeholder="Categoría"
                        options={categorias}
                        onChange={(e) => setCategoria(e.target.value)}
                    />
                    <SelectField
                        name="retencion"
                        placeholder="Afecto a Retención"
                        options={retenciones}
                        onChange={(e) => setRetencion(e.target.value)}
                    />
                </div>
                <ButtonStyled text="Registrar" disabled={isSubmitting} />
            </form>
        </>
    );
}
