"use client"
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceDot,
} from "recharts"
import { useMemo, useState, useRef, useEffect } from "react"

interface DataPoint {
  label: string // yyyy-mm-dd
  value: number
}

interface Props {
  data: DataPoint[]
  color?: string
}

type RangeKey = "all" | "1y" | "6m" | "1m" | "1w"

const RANGE_OPTIONS: { key: RangeKey; label: string }[] = [
  { key: "all", label: "All Time" },
  { key: "1y", label: "1 Year" },
  { key: "6m", label: "6 Months" },
  { key: "1m", label: "1 Month" },
  { key: "1w", label: "1 Week" },
]

function formatDateLabel(dateStr: string) {
  // e.g. "2012-08-16" => "16th August 2012"
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "long" })
  const year = date.getFullYear()
  // Ordinal suffix
  const j = day % 10,
    k = day % 100
  let suffix = "th"
  if (j === 1 && k !== 11) suffix = "st"
  else if (j === 2 && k !== 12) suffix = "nd"
  else if (j === 3 && k !== 13) suffix = "rd"
  return `${day}${suffix} ${month} ${year}`
}

function getRangeStartDate(latestDate: Date, range: RangeKey): Date | null {
  switch (range) {
    case "1y":
      return new Date(latestDate.getFullYear() - 1, latestDate.getMonth(), latestDate.getDate())
    case "6m":
      return new Date(latestDate.getFullYear(), latestDate.getMonth() - 6, latestDate.getDate())
    case "1m":
      return new Date(latestDate.getFullYear(), latestDate.getMonth() - 1, latestDate.getDate())
    case "1w":
      return new Date(latestDate.getTime() - 7 * 24 * 60 * 60 * 1000)
    default:
      return null
  }
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: any
  label?: string
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-white dark:bg-zinc-900/90 shadow-lg px-4 py-2 border border-zinc-200 dark:border-zinc-700">
        <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">
          {label ? formatDateLabel(label) : ""}
        </div>
        <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {payload[0].value.toLocaleString()}
        </div>
      </div>
    )
  }
  return null
}

// Helper to get Y axis domain based on range and data
function getYAxisDomain(range: RangeKey, filteredData: DataPoint[]) {
  if (range === "all" || range === "1y" || range === "6m") {
    // Fixed scale for all-time, 1y, 6m
    return [0, 10000]
  } else if (range === "1m" || range === "1w") {
    // Dynamic scale for 1m and 1w: min/max of data, but min 0, max 6000
    if (filteredData.length === 0) return [0, 6000]
    const minVal = Math.min(...filteredData.map(d => d.value))
    const maxVal = Math.max(...filteredData.map(d => d.value))
    // Clamp to [0, 6000]
    const minDomain = 0
    const maxDomain = 6000
    // If all values are above 6000, just show [minVal, maxVal]
    if (minVal > maxDomain) return [minVal, maxVal]
    // If all values are below 0, just show [minVal, maxVal]
    if (maxVal < minDomain) return [minVal, maxVal]
    // Otherwise, clamp
    return [
      Math.min(minDomain, minVal),
      Math.max(maxDomain, maxVal)
    ]
  }
  // fallback
  return [0, "auto"]
}

export default function LineChart({ data, color = "#3b82f6" }: Props) {
  // --- Date filter state ---
  // Find min/max date in data for default values
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => new Date(a.label).getTime() - new Date(b.label).getTime())
  }, [data])

  const minDataDate = useMemo(() => {
    if (!sortedData.length) return ""
    return sortedData[0].label
  }, [sortedData])
  const maxDataDate = useMemo(() => {
    if (!sortedData.length) return ""
    return sortedData[sortedData.length - 1].label
  }, [sortedData])

  // Date filter state
  const [fromDate, setFromDate] = useState<string>(minDataDate)
  const [toDate, setToDate] = useState<string>(maxDataDate)

  // Range dropdown state
  const [range, setRange] = useState<RangeKey>("all")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const prevRange = useRef<RangeKey>("all")

  // When data changes, reset date filters to min/max
  useEffect(() => {
    setFromDate(minDataDate)
    setToDate(maxDataDate)
  }, [minDataDate, maxDataDate])

  // Find latest date in data
  const latestDate = useMemo(() => {
    if (!sortedData.length) return null
    return new Date(sortedData[sortedData.length - 1].label)
  }, [sortedData])

  // When a range is selected, update fromDate/toDate accordingly
  useEffect(() => {
    if (!latestDate) return
    if (range === "all") {
      setFromDate(minDataDate)
      setToDate(maxDataDate)
    } else {
      const startDate = getRangeStartDate(latestDate, range)
      if (startDate) {
        // Clamp to available data
        const startStr = sortedData.find(d => new Date(d.label) >= startDate)?.label || minDataDate
        setFromDate(startStr)
        setToDate(maxDataDate)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, latestDate, minDataDate, maxDataDate, sortedData])

  // Filter data by fromDate/toDate
  const filteredData = useMemo(() => {
    if (!fromDate || !toDate) return sortedData
    const from = new Date(fromDate)
    const to = new Date(toDate)
    return sortedData.filter(d => {
      const dDate = new Date(d.label)
      return dDate >= from && dDate <= to
    })
  }, [sortedData, fromDate, toDate])

  // Find the max and min value for accent dots
  const maxValue = Math.max(...filteredData.map(d => d.value))
  const minValue = Math.min(...filteredData.map(d => d.value))
  const maxPoint = filteredData.find(d => d.value === maxValue)
  const minPoint = filteredData.find(d => d.value === minValue)

  // Find today's point (latest date in filteredData)
  const todayPoint = filteredData.length > 0 ? filteredData[filteredData.length - 1] : undefined

  // XAxis label formatter: show only every Nth label to avoid cranking up
  // For large datasets, show at most 8 labels
  const xTickFormatter = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    // Show as "Aug 16" or "16 Aug" for compactness
    return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`
  }

  // Calculate which ticks to show
  const xTicks = useMemo(() => {
    const n = filteredData.length
    if (n <= 8) return filteredData.map(d => d.label)
    // Show at most 8 ticks, evenly spaced
    const step = Math.ceil(n / 8)
    return filteredData.filter((_, i) => i % step === 0).map(d => d.label)
  }, [filteredData])

  // Calculate Y axis domain based on range and filteredData
  const yAxisDomain = useMemo(() => getYAxisDomain(range, filteredData) as [number, number] | [number, 'auto'], [range, filteredData])

  // --- Animation fix for "all" range ---
  // When switching to "all", disable animation for one render to avoid stutter, then re-enable
  // This is because animating a large number of points causes stutter in recharts
  const [isAnimationActive, setIsAnimationActive] = useState(true)

  useEffect(() => {
    // If switching to "all", disable animation for one render, then re-enable
    if (range === "all" && prevRange.current !== "all") {
      setIsAnimationActive(false)
      // Force a re-render with a new key to reset the chart
      setAnimationKey(k => k + 1)
      // Re-enable animation after a tick
      const id = setTimeout(() => setIsAnimationActive(true), 50)
      return () => clearTimeout(id)
    }
    prevRange.current = range
  }, [range])

  // Handlers for date input
  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value)
    setRange("all") // Reset range dropdown to "all" when custom date is picked
  }
  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value)
    setRange("all")
  }

  // Dropdown menu for range selection
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [dropdownOpen])

  return (
    <div className="flex flex-col h-full">
      {/* Date filter and range dropdown */}
      <div className="mb-2 flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-1">
          <label htmlFor="from-date" className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">From</label>
          <input
            id="from-date"
            type="date"
            className="px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200"
            value={fromDate}
            min={minDataDate}
            max={toDate}
            onChange={handleFromDateChange}
            style={{ width: 120 }}
          />
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor="to-date" className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">To</label>
          <input
            id="to-date"
            type="date"
            className="px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200"
            value={toDate}
            min={fromDate}
            max={maxDataDate}
            onChange={handleToDateChange}
            style={{ width: 120 }}
          />
        </div>
        {/* Range dropdown */}
        <div className="flex-1 flex justify-end">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1
                ${dropdownOpen
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700"
                  : "bg-transparent text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
                }`}
              onClick={() => setDropdownOpen(v => !v)}
            >
              {RANGE_OPTIONS.find(opt => opt.key === range)?.label || "Range"}
              <svg className="w-3 h-3 ml-1" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-1 left-0 w-36 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg">
                {RANGE_OPTIONS.map(opt => (
                  <button
                    key={opt.key}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors
                      ${range === opt.key
                        ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800/40 text-zinc-500 dark:text-zinc-400"
                      }`}
                    onClick={() => {
                      setRange(opt.key)
                      setDropdownOpen(false)
                    }}
                    type="button"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ReLineChart
            key={animationKey}
            data={filteredData}
            margin={{ right: 20, top: 15 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e5e7eb"
              vertical={true}
            />
            <XAxis
              dataKey="label"
              interval={0}
              tick={{ fontSize: 13, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              ticks={xTicks}
              tickFormatter={xTickFormatter}
              minTickGap={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 13, fill: "#64748b" }}
              width={48}
              domain={yAxisDomain}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: color, strokeWidth: 1, opacity: 0.15 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              dot={{
                r: 0,
                stroke: color,
                strokeWidth: 2,
                fill: "#fff",
              }}
              activeDot={{
                r: 7,
                fill: color,
                stroke: "#fff",
                strokeWidth: 3,
                style: { filter: "drop-shadow(0 2px 8px rgba(59,130,246,0.25))" },
              }}
              isAnimationActive={isAnimationActive}
            />
            {/* Blue dot for today (latest point in filteredData) */}
            {todayPoint && (
              <ReferenceDot
                x={todayPoint.label}
                y={todayPoint.value}
                r={7}
                fill="#2563eb" // blue-600
                stroke="#fff"
                strokeWidth={3}
              />
            )}
            {/* Green dot for highest point */}
            {maxPoint && (
              <ReferenceDot
                x={maxPoint.label}
                y={maxPoint.value}
                r={7}
                fill="#22c55e" // green-500
                stroke="#fff"
                strokeWidth={3}
              />
            )}
            {/* Red dot for lowest point */}
            {minPoint && (
              <ReferenceDot
                x={minPoint.label}
                y={minPoint.value}
                r={7}
                fill="#ef4444" // red-500
                stroke="#fff"
                strokeWidth={3}
              />
            )}
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
