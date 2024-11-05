"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import FeedbackAlert from "@/components/feedback-alert/FeedbackAlert";
import { feedbackTypes } from "@/components/feedback-alert/FeedbackAlert";
import styles from "./login-page.module.css";
import ButtonStyled from "@/components/button-styled/ButtonStyled";
import InputField from "@/components/input-field/InputField";

export default function RegisterPage() {
    const router = useRouter();
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState("");
    const [alertType, setAlertType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback("");
        const response = await signIn("credentials", {
            correo: correo,
            password: password,
            redirect: false,
        });

        if (response.error) {
            setFeedback(response.error);
            setAlertType(feedbackTypes.Error);
            setIsSubmitting(false);
            return
        } else {
            setFeedback("Inicio de sesión existoso!");
            setAlertType(feedbackTypes.Success);
            setIsSubmitting(false);
        }

        router.push("/pagos");
    };

    return (
        <>
            <form className={styles.section} onSubmit={handleSubmit}>
                <div className={styles.sectionLogo}>
                    <div >
                        <div className={styles.logo}></div>
                        <h1 className={styles.logoTitulo}>MilkStgo</h1>
                    </div>
                    <div className={styles.inputs}>
                            <InputField
                                name="correo"
                                type="email"
                                placeholder="Correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                            <InputField
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                    </div>
                </div>
                <ButtonStyled
                    text="INICIAR SESIÓN"
                    type="submit"
                    extraClass={styles.Boton}
                    disabled={isSubmitting}
                />
            </form>
            {feedback ? (
                <FeedbackAlert feedback={feedback} type={alertType} />
            ) : null}
        </>
    );
}
