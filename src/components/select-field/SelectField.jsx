import styles from "./select-field.module.css";

export default function SelectField({
    name,
    placeholder,
    options = [],
    onChange,
    defaultValue,
}) {
    return (
        <select
            name={name}
            onChange={onChange}
            className={styles.select}
            defaultValue={defaultValue ? defaultValue : ""}
            required
        >
            <option value="" disabled>
                {placeholder}
            </option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}
