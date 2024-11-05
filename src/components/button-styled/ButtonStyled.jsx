import styles from "./button-styled.module.css";

export default function ButtonStyled({ text, disabled, extraClass, onClick }) {
    return (
        <button
            className={`${styles["button-style"]} ${extraClass}`}
            type="submit"
            disabled={disabled}
            onClick={onClick}
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