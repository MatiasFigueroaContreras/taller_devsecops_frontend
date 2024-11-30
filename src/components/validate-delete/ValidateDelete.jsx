import styles from "./validate-delete.module.css";
import ButtonStyled from "../button-styled/ButtonStyled";


export default function ValidateDelete({
    name,
    onDelete,
    onClose,
    isOpen,
    isDeleting,
}) {
    return (
        <>
            {isOpen && (
                <div className={styles.overlay}>
                    <div className={styles["dialog-box"]}>
                        <h1 className={styles.header}>Eliminar {name}</h1>
                        <section className={styles.body}>
                            ¿Estas seguro/a de que quieres eliminar {name}?
                        </section>
                        <section className={styles.actions}>
                            <button
                                className={`${styles.close}`}
                                onClick={onClose}
                                type="button"
                            >
                                CANCELAR
                            </button>
                            <ButtonStyled
                                text="ELIMINAR"
                                disabled={isDeleting}
                                onClick={onDelete}
                                extraClass={styles["delete-button"]}
                                type="submit"
                            />
                        </section>
                    </div>
                </div>
            )}
        </>
    );
}
