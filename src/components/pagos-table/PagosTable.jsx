import styles from "./pagos-table.module.css";

export default function PagosTable({ pagos = [] }) {
    return (
        <table className={styles["pagos-table"]}>
            <thead>
                <tr className={styles["first-header"]}>
                    <th colSpan="1"></th>
                    <th colSpan="2">Proveedor</th>
                    <th colSpan="4">Acopio Leche</th>
                    <th colSpan="4">Laboratorio (%)</th>
                    <th colSpan="4">Pagos específicos (CLP)</th>
                    <th colSpan="3">Descuento por Variación (CLP)</th>
                    <th colSpan="3">Pagos (CLP)</th>
                </tr>
                <tr className={styles["second-header"]}>
                    <th>Quincena</th>
                    <th className={styles["border-left"]}>Código</th>
                    <th>Nombre</th>
                    <th className={styles["border-left"]}>KLS Totales</th>
                    <th className={styles["max-1"]}>Nro. días envió</th>
                    <th className={styles["max-1"]}>Prom. diario</th>
                    <th className={styles["max-1"]}>Var. Leche</th>
                    <th
                        className={`${styles["max-1"]} ${styles["border-left"]}`}
                    >
                        Grasa
                    </th>
                    <th className={styles["max-1"]}>Var. Grasa</th>
                    <th className={styles["max-1"]}>Solido Total</th>
                    <th className={styles["max-1"]}>Var. ST</th>
                    <th className={styles["border-left"]}>Leche</th>
                    <th>Grasa</th>
                    <th className={styles["max-1"]}>Solido Total</th>
                    <th className={styles["max-2"]}>Bono Frecuencia</th>
                    <th className={styles["border-left"]}>Var. Leche</th>
                    <th>Var. Grasa</th>
                    <th>Var. ST</th>
                    <th className={styles["border-left"]}>Total</th>
                    <th>Retención</th>
                    <th>Final</th>
                </tr>
            </thead>
            <tbody>
                {pagos.map((pago, index) => (
                    <tr key={index}>
                        <td>{`${pago.quincena.year}/${pago.quincena.mes}/${pago.quincena.numero}`}</td>
                        <td>{pago.proveedor.codigo}</td>
                        <td>{pago.proveedor.nombre}</td>
                        <td>{pago.datosCentroAcopio.totalKlsLeche}</td>
                        <td>{pago.datosCentroAcopio.totalDias}</td>
                        <td>{pago.datosCentroAcopio.promedioKlsPorDia}</td>
                        <td>{pago.datosCentroAcopio.variacionLeche}</td>
                        <td>
                            {
                                pago.datosCentroAcopio.laboratorioLeche
                                    .porcentajeGrasa
                            }
                        </td>
                        <td>{pago.datosCentroAcopio.variacionGrasa}</td>
                        <td>
                            {
                                pago.datosCentroAcopio.laboratorioLeche
                                    .porcentajeSolidoTotal
                            }
                        </td>
                        <td>{pago.datosCentroAcopio.variacionSolidoTotal}</td>
                        <td>{pago.pagoLeche}</td>
                        <td>{pago.pagoGrasa}</td>
                        <td>{pago.pagoSolidoTotal}</td>
                        <td>{pago.bonificacionFrecuencia}</td>
                        <td>{pago.dctoVariacionLeche}</td>
                        <td>{pago.dctoVariacionGrasa}</td>
                        <td>{pago.dctoVariacionSolidoTotal}</td>
                        <td>{pago.pagoTotal}</td>
                        <td>{pago.montoRetencion}</td>
                        <td>{pago.montoFinal}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
