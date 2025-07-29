"use client"
import React, { useState } from "react"
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Sector,
} from "recharts"
import { useTheme } from "next-themes"

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
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  // Sort data in descending order by value
  const sortedData = [...data].sort((a, b) => b.value - a.value)
  const total = sortedData.reduce((sum, d) => sum + d.value, 0)

  // Assign colors to sortedData so that both pie and legend use the same color for the same label
  const coloredData = sortedData.map((d, i) => ({
    ...d,
    color: colors[i % colors.length],
  }))

  // Custom active shape for modern highlight effect
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? "start" : "end"
    // Set label color based on theme
    const labelColor = theme === "dark" ? "#fff" : "#222";
    const valueColor = theme === "dark" ? "#e5e5e5" : "#666";

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.12))" }}
        />
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={3} fill={fill} stroke="white" strokeWidth={1.5} />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 8}
          y={ey}
          textAnchor={textAnchor}
          dominantBaseline="central"
          style={{ fontWeight: 600, fontSize: 14, fill: labelColor }}
        >
          {payload.label}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 8}
          y={ey + 18}
          textAnchor={textAnchor}
          dominantBaseline="central"
          style={{ fontSize: 13, fill: valueColor }}
        >
          {`${value} (${(percent * 100).toFixed(1)}%)`}
        </text>
      </g>
    )
  }

  // Legend sorted by value (descending), color matches pie, label color matches theme
  const renderLegend = () => {
    // Theme-based label color
    const labelColor = theme === "dark" ? "#fff" : "#222";
    const percentColor = theme === "dark" ? "#bbb" : "#888";
    return (
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
      }}>
        <ul style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px 24px",
          listStyle: "none",
          margin: 0,
          padding: 0,
          justifyContent: "center",
          alignItems: "center",
        }}>
          {coloredData.map((entry, index) => {
            const percent = total > 0 ? (entry.value / total) * 100 : 0
            return (
              <li key={`item-${index}`} style={{
                display: "flex",
                alignItems: "center",
                fontSize: 14,
                fontWeight: 500,
                color: labelColor,
              }}>
                <span style={{
                  display: "inline-block",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: entry.color,
                  marginRight: 8,
                  border: "1px solid #e5e7eb",
                  boxSizing: "border-box",
                }} />
                {entry.label}
                <span style={{
                  marginLeft: 6,
                  fontWeight: 400,
                  color: percentColor,
                  fontSize: 13,
                }}>
                  {`(${percent.toFixed(1)}%)`}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RePieChart margin={{ top: 30, bottom : 1 }}>
        <Pie
          data={coloredData}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={130}
          labelLine={false}
          label={false}
          activeShape={renderActiveShape}
          onMouseEnter={(_, idx) => setActiveIndex(idx)}
          onMouseLeave={() => setActiveIndex(null)}
          isAnimationActive={true}
          animationDuration={500}
        >
          {coloredData.map((entry, i) => (
            <Cell
              key={`cell-${i}`}
              fill={entry.color}
              style={{
                cursor: "pointer",
                filter:
                  activeIndex === i
                    ? "drop-shadow(0 2px 8px rgba(99,102,241,0.18))"
                    : undefined,
                transition: "filter 0.2s",
              }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            />
          ))}
        </Pie>
        <Legend content={renderLegend} />
      </RePieChart>
    </ResponsiveContainer>
  )
}
