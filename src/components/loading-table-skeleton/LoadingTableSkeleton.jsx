import styles from "./loading-table-skeleton.module.css";

export default function LoadingTableSkeleton({
    nrows = 6,
    cellsWidth = [100, 100, 100, 100],
    cellsWidthMeasure = "px",
}) {
    const renderTableContent = () => {
        const tableContent = [];
        for (let row = 0; row < nrows; row++) {
            tableContent.push(
                <div key={row} className={styles["table-row-skeleton"]}>
                    {cellsWidth.map((cellWidth, index) => (
                        <div
                            key={index}
                            className={styles["table-cell-skeleton"]}
                            style={{ width: cellWidth + cellsWidthMeasure }}
                        ></div>
                    ))}
                </div>
            );
        }
        return tableContent;
    };

    return (
        <div className={styles["table-skeleton"]}>
            <div className={styles["table-row-skeleton"]}>
                <div
                    className={styles["table-cell-skeleton"]}
                    style={{
                        width: "100%",
                    }}
                ></div>
            </div>
            {renderTableContent()}
        </div>
    );
}
