'use client'

import MetricCard from "@/components/MetricCard"
import LineChart from "@/components/charts/LineChart"
import BarChart from "@/components/charts/BarChart"
import PieChart from "@/components/charts/PieChart"
import ThemeToggle from "@/components/ThemeToggle"
import { mockLineData, mockBarData, mockPieData } from "@/lib/mockData"
import DataTable from "@/components/DataTable"
import { motion } from "framer-motion"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">

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
        <div className="bg-card rounded-2xl p-4 shadow-md h-72 dark:bg-muted/40">
          <h2 className="text-lg font-semibold mb-2">Revenue Over Time</h2>
          <LineChart data={mockLineData} />
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-md h-72 dark:bg-muted/40">
          <h2 className="text-lg font-semibold mb-2">User Signups</h2>
          <BarChart data={mockBarData} />
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-md h-72 dark:bg-muted/40">
          <h2 className="text-lg font-semibold mb-2">Traffic Source</h2>
          <PieChart data={mockPieData} />
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

