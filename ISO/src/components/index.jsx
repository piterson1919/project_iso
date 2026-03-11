import { useEffect, useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { index_stats } from "../api/observations.pi";
import "../style/index.css";

export default function ObservationsChart() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await index_stats();
        setStats(res.data);
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      }
    };

    loadStats();
  }, []);

  if (!stats) return <p className="chart-loading">Cargando estadísticas...</p>;

  const chartData = [
    { name: "Iniciada", value: stats["Iniciada"] ?? 0, color: "#f7de4f" },
    { name: "En curso", value: stats["En curso"] ?? 0, color: "#fda643" },
    { name: "Completada", value: stats["Completada"] ?? 0, color: "#aaf57f" },
    { name: "Cerrada", value: stats["Cerrada"] ?? 0, color: "#8e90fd" },
  ];

  return (
    <div className="chart-container">
      <h2 className="chart-title">Estadísticas de Observaciones</h2>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />

            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              animationDuration={900}
              label={{ position: "top", fill: "#333", fontWeight: "bold" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}