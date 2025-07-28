"use client"
import MetricCard from "@/components/MetricCard"
import ChartCard from "@/components/ChartCard"
import LineChart from "@/components/charts/LineChart"
import BarChart from "@/components/charts/BarChart"
import PieChart from "@/components/charts/PieChart"
import DataTable from "@/components/DataTable"

import { ColumnDef } from "@tanstack/react-table"

type TableData = {
  campaign: string
  impressions: number
  clicks: number
  conversions: number
}

const tableData: TableData[] = [
  { campaign: "Brand Awareness", impressions: 12500, clicks: 340, conversions: 45 },
  { campaign: "Lead Gen", impressions: 9500, clicks: 210, conversions: 28 },
  { campaign: "Retargeting", impressions: 7200, clicks: 190, conversions: 32 },
  { campaign: "Product Launch", impressions: 8400, clicks: 230, conversions: 50 },
]

const tableColumns: ColumnDef<TableData>[] = [
  { accessorKey: "campaign", header: "Campaign" },
  { accessorKey: "impressions", header: "Impressions" },
  { accessorKey: "clicks", header: "Clicks" },
  { accessorKey: "conversions", header: "Conversions" },
]

const chartData = [
  { label: "Mon", value: 150 },
  { label: "Tue", value: 180 },
  { label: "Wed", value: 120 },
  { label: "Thu", value: 220 },
  { label: "Fri", value: 170 },
]

const pieData = [
  { label: "Google Ads", value: 45 },
  { label: "Facebook", value: 30 },
  { label: "LinkedIn", value: 15 },
  { label: "Twitter", value: 10 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-4">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Revenue" value="$12.4K" />
        <MetricCard title="Users" value="3.1K" />
        <MetricCard title="Conversions" value="318" />
        <MetricCard title="Growth" value="8.6%" color="text-green-600" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <ChartCard title="Weekly Conversions">
          <LineChart data={chartData} />
        </ChartCard>
        <ChartCard title="Clicks by Day">
          <BarChart data={chartData} />
        </ChartCard>
        <ChartCard title="Spend Distribution">
          <PieChart data={pieData} />
        </ChartCard>
      </div>

      {/* Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Campaign Performance</h2>
        <DataTable columns={tableColumns} data={tableData} />
      </div>
    </div>
  )
}
