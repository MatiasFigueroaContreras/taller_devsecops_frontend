import { useState } from "react";
import { feedbackTypes } from "@/components/feedback-alert/FeedbackAlert";

import styles from "./Modal.module.css";

import InputField from "@/components/input-field/InputField";
import SelectField from "@/components/select-field/SelectField";
import ButtonStyled from "@/components/button-styled/ButtonStyled";
import FeedbackAlert from "@/components/feedback-alert/FeedbackAlert";
import ProveedorService from "@/services/ProveedorService";

export default function ModalEditar({ proveedor, onClose }) {
    if (!proveedor) {
        return null;
    }

    const categorias = ["A", "B", "C", "D"];
    const retenciones = ["Si", "No"];

    const [nombre, setNombre] = useState(proveedor.nombre);
    const [codigo, setCodigo] = useState(proveedor.codigo);
    const [categoria, setCategoria] = useState(proveedor.categoria);
    const [retencion, setRetencion] = useState(proveedor.retencion);

    const [feedback, setFeedback] = useState("");
    const [alertType, setAlertType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback("");
        try {
            const response = await ProveedorService.update(
                proveedor.id,
                codigo,
                nombre,
                categoria,
                retencion
            );
            setFeedback("Proveedor actualizado correctamente!");
            setAlertType(feedbackTypes.Success);
            setIsSubmitting(false);
            onClose();
            location.reload();
        } catch (error) {
            setAlertType(feedbackTypes.Error);
            setIsSubmitting(false);
            if (error.response && error.response.status < 500) {
                setFeedback(error.response.data.message);
            } else {
                setFeedback(
                    "Ocurrió un error al intentar actualizar el proveedor"
                );
            }
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.ContainerModal}>
                <button className={styles.closeButton} onClick={onClose}>
                    X
                </button>
                <div className={styles.containerLogo}>
                    <div className={styles.logo}></div>
                    <h1 className={styles.TituloEditar}>
                        Editar proveedor <b>{proveedor.codigo}</b>
                    </h1>
                </div>
                {feedback ? (
                    <FeedbackAlert feedback={feedback} type={alertType} />
                ) : null}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputs}>
                        <InputField
                            name="nombre"
                            type="text"
                            defaultValue={proveedor.nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <InputField
                            name="codigo"
                            type="number"
                            placeholder="Código"
                            minLength="5"
                            maxLength="5"
                            defaultValue={proveedor.codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                    </div>
                    <div className={styles.selects}>
                        <SelectField
                            name="categoria"
                            placeholder="Categoría"
                            options={categorias}
                            defaultValue={proveedor.categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        />
                        <SelectField
                            name="retencion"
                            placeholder="Afecto a Retención"
                            options={retenciones}
                            defaultValue={proveedor.retencion}
                            onChange={(e) => setRetencion(e.target.value)}
                        />
                    </div>
                    <ButtonStyled
                        text="Editar proveedor"
                        extraClass={styles.Boton}
                        disabled={isSubmitting}
                    />
                </form>
            </div>
        </div>
    );
}
