"use client"
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

interface DataPoint {
  label: string
  value: number
}

interface Props {
  data: DataPoint[]
  colors?: string[]
}

const defaultColors = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"]

export default function PieChart({ data, colors = defaultColors }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RePieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label
        >
          {data.map((_, i) => (
            <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </ResponsiveContainer>
  )
}
