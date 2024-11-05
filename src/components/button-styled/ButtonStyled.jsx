import styles from "./button-styled.module.css";

export default function ButtonStyled({ text, disabled }) {
    return (
        <button
            className={styles["button-style"]}
            type="submit"
            disabled={disabled}
        >
            <span className={styles["button-text"]}>{text}</span>
            {disabled && (
                <div className={styles["loading-container"]}>
                    <div className={styles["loading-circle"]}></div>
                </div>
            )}
        </button>
    );
}
