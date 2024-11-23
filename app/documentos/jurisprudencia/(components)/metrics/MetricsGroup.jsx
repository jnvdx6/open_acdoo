import { AlertTriangle, Scale, BarChart3 } from 'lucide-react';
import { MetricBadge } from "./MetricBadge";

export const MetricsGroup = ({ metrics, layout = "row", variant = "default" }) => {
    const { probabilidad_delito, kpi_evidencia, kpi_complejidad } = metrics;
    
    // Contamos cuántas métricas hay para ajustar el grid
    const metricCount = [probabilidad_delito, kpi_evidencia, kpi_complejidad].filter(Boolean).length;
    
    // Definimos las clases base para el contenedor
    const containerClasses = [
        "grid",
        "gap-2",
        // Si es layout column, usamos una columna
        layout === "column" ? "grid-cols-1" : [
            // Para layout row, ajustamos las columnas según el número de métricas
            "grid-cols-1",
            metricCount === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
            // En móvil, si hay 2 métricas, mostramos en 2 columnas
            metricCount === 2 ? "grid-cols-2" : "",
            // Si es variante compacta, reducimos el gap
            variant === "compact" ? "gap-1" : ""
        ].filter(Boolean).join(" ")
    ].join(" ");

    return (
        <div className={containerClasses}>
            {probabilidad_delito !== undefined && (
                <MetricBadge 
                    icon={AlertTriangle}
                    label={variant === "compact" ? null : "Prob. Delito"}
                    value={probabilidad_delito}
                    type="delito"
                    variant={variant}
                />
            )}
            {kpi_evidencia !== undefined && (
                <MetricBadge 
                    icon={Scale}
                    label={variant === "compact" ? null : "Evidencia"}
                    value={kpi_evidencia}
                    type="evidencia"
                    variant={variant}
                />
            )}
            {kpi_complejidad !== undefined && (
                <MetricBadge 
                    icon={BarChart3}
                    label={variant === "compact" ? null : "Complejidad"}
                    value={kpi_complejidad}
                    type="complejidad"
                    variant={variant}
                />
            )}
        </div>
    );
};