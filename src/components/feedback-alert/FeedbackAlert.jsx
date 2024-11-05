import styles from "./feedback-alert.module.css";

export const feedbackTypes = {
    Informative: "informative",
    Error: "error",
    Success: "success",
};

export default function FeedbackAlert({ feedback, type }) {
    return <div className={styles[`${type}-alert`]}>{feedback}</div>;
}
