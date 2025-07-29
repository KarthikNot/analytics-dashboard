'use client'

import MetricCard from "@/components/MetricCard"
import LineChart from "@/components/charts/LineChart"
import BarChart from "@/components/charts/BarChart"
import PieChart from "@/components/charts/PieChart"
import ThemeToggle from "@/components/ThemeToggle"
import { mockLineData, mockBarData, mockPieData } from "@/lib/mockData"
import DataTable from "@/components/DataTable"
import { motion } from "framer-motion"
import { useRef } from "react"

import { getPercentChange, downloadCSV, downloadJSON, downloadXLSX } from '@/app/dashboard/helpers'

export default function DashboardPage() {
  // Calculate percent changes
  const revenueChange = getPercentChange(mockLineData)
  const signupChange = getPercentChange(mockBarData)

  // Format percent with sign and 1 decimal
  function formatChange(change: number | null) {
    if (change === null || isNaN(change)) return null
    const rounded = Math.abs(change).toFixed(1)
    // SVG chevron up/down for professional look
    const upArrow = (
      <svg className="w-3 h-3 mr-0.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 4l4 6H4l4-6z" />
      </svg>
    )
    const downArrow = (
      <svg className="w-3 h-3 mr-0.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 12l4-6H4l4 6z" />
      </svg>
    )
    if (change > 0) {
      return (
        <sub className="ml-2 text-green-600 font-medium flex items-center inline-flex">
          {upArrow}
          {rounded}%
        </sub>
      )
    } else if (change < 0) {
      return (
        <sub className="ml-2 text-red-600 font-medium flex items-center inline-flex">
          {downArrow}
          {rounded}%
        </sub>
      )
    }
    return (
      <sub className="ml-2 text-zinc-400 font-medium">0.0%</sub>
    )
  }

  // Download dropdown refs (one for each chart)
  const downloadMenuRefSignups = useRef<HTMLDivElement>(null)
  const downloadMenuRefRevenue = useRef<HTMLDivElement>(null)
  const downloadMenuRefPie = useRef<HTMLDivElement>(null)

  return (
    <div className="p-6 space-y-10">

      {/* Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MetricCard title="Revenue" value="$42,000" icon="💰" />
        <MetricCard title="Users" value="12,500" icon="👥" />
        <MetricCard title="Conversions" value="870" icon="📈" />
        <MetricCard title="Growth" value="18%" icon="🚀" />
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <div className="bg-card rounded-2xl p-4 shadow-md h-100 dark:bg-muted/40 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              Revenue Over Time
              {formatChange(revenueChange)}
            </h2>
            {/* Download dropdown for revenue */}
            <div className="relative" ref={downloadMenuRefRevenue}>
              <button
                className="px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs border border-zinc-200 dark:border-zinc-700 flex items-center gap-1"
                title="Download revenue over time data"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded="false"
                onClick={e => {
                  const menu = downloadMenuRefRevenue.current?.querySelector('.download-menu')
                  if (menu) {
                    menu.classList.toggle('hidden')
                  }
                }}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
              </button>
              <div className="download-menu absolute right-0 mt-1 z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded shadow-lg min-w-[120px] hidden">
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => {
                    downloadCSV(mockLineData, "revenue_over_time.csv")
                    downloadMenuRefRevenue.current?.querySelector('.download-menu')?.classList.add('hidden')
                  }}
                >
                  CSV
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => {
                    downloadJSON(mockLineData, "revenue_over_time.json")
                    downloadMenuRefRevenue.current?.querySelector('.download-menu')?.classList.add('hidden')
                  }}
                >
                  JSON
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => {
                    downloadXLSX(mockLineData, "revenue_over_time.xlsx")
                    downloadMenuRefRevenue.current?.querySelector('.download-menu')?.classList.add('hidden')
                  }}
                >
                  XLSX
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <LineChart data={mockLineData} />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-md h-100 dark:bg-muted/40 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              User Signups
              {formatChange(signupChange)}
            </h2>
            {/* Download dropdown for signups */}
            <div className="relative" ref={downloadMenuRefSignups}>
              <button
                className="px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs border border-zinc-200 dark:border-zinc-700 flex items-center gap-1"
                title="Download user signups data"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded="false"
                onClick={e => {
                  const menu = downloadMenuRefSignups.current?.querySelector('.download-menu')
                  if (menu) {
                    menu.classList.toggle('hidden')
                  }
                }}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
              </button>
              <div className="download-menu absolute right-0 mt-1 z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded shadow-lg min-w-[120px] hidden">
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => {
                    downloadCSV(mockBarData)
                    downloadMenuRefSignups.current?.querySelector('.download-menu')?.classList.add('hidden')
                  }}
                >
                  CSV
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => {
                    downloadJSON(mockBarData)
                    downloadMenuRefSignups.current?.querySelector('.download-menu')?.classList.add('hidden')
                  }}
                >
                  JSON
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => {
                    downloadXLSX(mockBarData)
                    downloadMenuRefSignups.current?.querySelector('.download-menu')?.classList.add('hidden')
                  }}
                >
                  XLSX
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <BarChart data={mockBarData} />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-md h-100 dark:bg-muted/40 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Traffic Source
            </h2>
            {/* Download dropdown for pie chart */}
            <div className="relative" ref={downloadMenuRefPie}>
              <button
                className="px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs border border-zinc-200 dark:border-zinc-700 flex items-center gap-1"
                title="Download traffic source data"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded="false"
                onClick={e => {
                  const menu = downloadMenuRefPie.current?.querySelector('.download-menu')
                  if (menu) {
                    menu.classList.toggle('hidden')
                  }
                }}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
              </button>
              <div className="download-menu absolute right-0 mt-1 z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded shadow-lg min-w-[120px] hidden">
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => {
                    downloadCSV(mockPieData, "traffic_source.csv")
                    downloadMenuRefPie.current?.querySelector('.download-menu')?.classList.add('hidden')
                  }}
                >
                  CSV
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => {
                    downloadJSON(mockPieData, "traffic_source.json")
                    downloadMenuRefPie.current?.querySelector('.download-menu')?.classList.add('hidden')
                  }}
                >
                  JSON
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => {
                    downloadXLSX(mockPieData, "traffic_source.xlsx")
                    downloadMenuRefPie.current?.querySelector('.download-menu')?.classList.add('hidden')
                  }}
                >
                  XLSX
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <PieChart data={mockPieData} />
          </div>
        </div>
      </motion.div>
        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <DataTable />
        </motion.div>
    </div>
  )
}