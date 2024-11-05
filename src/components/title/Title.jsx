import styles from "./title.module.css";

export default function Title({ title }) {
    return (
        <div className={styles.title}>
            <h1>{title}</h1>
            <hr />
        </div>
    );
}
