"use client"
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { useMemo, useState } from "react"
import { useTheme } from "next-themes"

interface DataPoint {
  label: string // Should be a date string, e.g. "2024-06-01"
  value: number
}

interface Props {
  data: DataPoint[]
  color?: string
}

type GroupBy = "day" | "month" | "year"

function groupData(data: DataPoint[], groupBy: GroupBy) {
  const grouped: Record<string, number> = {}

  data.forEach(({ label, value }) => {
    const date = new Date(label)
    if (isNaN(date.getTime())) return
    let key = ""
    if (groupBy === "day") {
      // YYYY-MM-DD
      key = date.toISOString().slice(0, 10)
    } else if (groupBy === "month") {
      // YYYY-MM
      key = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0")
    } else if (groupBy === "year") {
      // YYYY
      key = String(date.getFullYear())
    }
    grouped[key] = (grouped[key] || 0) + value
  })

  // Sort keys chronologically
  const sortedKeys = Object.keys(grouped).sort()
  return sortedKeys.map(key => ({
    label: key,
    value: grouped[key],
  }))
}

function formatLabel(label: string, groupBy: GroupBy) {
  if (groupBy === "day") {
    // "2024-06-01" => "Jun 1, 2024"
    const d = new Date(label)
    if (isNaN(d.getTime())) return label
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  } else if (groupBy === "month") {
    // "2024-06" => "Jun 2024"
    const [year, month] = label.split("-")
    if (!year || !month) return label
    const d = new Date(Number(year), Number(month) - 1)
    return d.toLocaleString(undefined, { month: "short", year: "numeric" })
  } else if (groupBy === "year") {
    // "2024"
    return label
  }
  return label
}

// Custom Tooltip that adapts label color to theme
function CustomTooltip({ active, payload, label, groupBy }: any) {
  const { theme } = useTheme()
  if (!active || !payload || !payload.length) return null

  // Choose label color based on theme
  const labelColor =
    theme === "dark"
      ? "#e0e7ef" // light text for dark mode
      : "#1e293b" // dark text for light mode

  return (
    <div
      style={{
        background: theme === "dark" ? "#18181b" : "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: "10px 14px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        minWidth: 120,
      }}
    >
      <div
        style={{
          color: labelColor,
          fontWeight: 600,
          fontSize: 14,
          marginBottom: 4,
        }}
      >
        {formatLabel(label, groupBy)}
      </div>
      {payload.map((entry: any, idx: number) => (
        <div key={idx} style={{ color: entry.color, fontSize: 13 }}>
          {entry.name && (
            <span style={{ marginRight: 6 }}>{entry.name}:</span>
          )}
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

function getMinMaxDate(data: DataPoint[]): { min: string; max: string } {
  if (!data.length) return { min: "", max: "" }
  let minDate = data[0].label
  let maxDate = data[0].label
  for (const d of data) {
    if (d.label < minDate) minDate = d.label
    if (d.label > maxDate) maxDate = d.label
  }
  return { min: minDate, max: maxDate }
}

export default function BarChart({ data, color = "#10b981" }: Props) {
  const [groupBy, setGroupBy] = useState<GroupBy>("month")

  // Get min/max date for input bounds
  const { min: minDate, max: maxDate } = useMemo(() => getMinMaxDate(data), [data])

  // "from" and "to" state, default to min/max
  const [from, setFrom] = useState<string>(minDate)
  const [to, setTo] = useState<string>(maxDate)

  // Update from/to if data changes
  // (If minDate/maxDate change, update from/to if they are out of bounds)
  // This ensures the date pickers always have valid values
  // eslint-disable-next-line
  useMemo(() => {
    setFrom(prev => {
      if (!prev || prev < minDate) return minDate
      if (prev > maxDate) return maxDate
      return prev
    })
    setTo(prev => {
      if (!prev || prev > maxDate) return maxDate
      if (prev < minDate) return minDate
      return prev
    })
  }, [minDate, maxDate])

  // Filter data by from/to
  const filteredData = useMemo(() => {
    if (!from && !to) return data
    return data.filter(d => {
      // d.label is yyyy-mm-dd
      return (!from || d.label >= from) && (!to || d.label <= to)
    })
  }, [data, from, to])

  const groupedData = useMemo(() => groupData(filteredData, groupBy), [filteredData, groupBy])

  return (
    <div className="flex flex-col h-full">
      <div className="mb-2 flex flex-wrap gap-2 items-center">
        <button
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors
            ${groupBy === "day"
              ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700"
              : "bg-transparent text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
            }`}
          onClick={() => setGroupBy("day")}
          type="button"
        >
          Day
        </button>
        <button
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors
            ${groupBy === "month"
              ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700"
              : "bg-transparent text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
            }`}
          onClick={() => setGroupBy("month")}
          type="button"
        >
          Month
        </button>
        <button
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors
            ${groupBy === "year"
              ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700"
              : "bg-transparent text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
            }`}
          onClick={() => setGroupBy("year")}
          type="button"
        >
          Year
        </button>
        <div className="flex items-center gap-1 ml-4">
          <label htmlFor="from-date" className="text-xs text-zinc-500 dark:text-zinc-400">From</label>
          <input
            id="from-date"
            type="date"
            className="border rounded px-2 py-1 text-xs"
            value={from}
            min={minDate}
            max={to || maxDate}
            onChange={e => setFrom(e.target.value)}
            style={{ minWidth: 120 }}
          />
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor="to-date" className="text-xs text-zinc-500 dark:text-zinc-400">To</label>
          <input
            id="to-date"
            type="date"
            className="border rounded px-2 py-1 text-xs"
            value={to}
            min={from || minDate}
            max={maxDate}
            onChange={e => setTo(e.target.value)}
            style={{ minWidth: 120 }}
          />
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart data={groupedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickFormatter={label => formatLabel(label, groupBy)}
              tick={{ fontSize: 13, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              minTickGap={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 13, fill: "#64748b" }}
            />
            <Tooltip
              content={props => <CustomTooltip {...props} groupBy={groupBy} />}
            />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
