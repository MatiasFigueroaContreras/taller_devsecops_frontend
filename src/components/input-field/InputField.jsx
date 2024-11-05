import styles from "./input-field.module.css";

export default function InputField({
    name,
    type,
    placeholder,
    onChange,
    ...extra
}) {
    return (
        <input
            name={name}
            className={styles.input}
            type={type}
            placeholder={placeholder}
            required
            onChange={onChange}
            {...extra}
        />
    );
}
