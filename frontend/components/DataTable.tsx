"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mockTableData } from "@/lib/mockData"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuItem} from "@/components/ui/dropdown-menu"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

const ITEMS_PER_PAGE = 5

export default function DataTable() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filteredData = mockTableData.filter((row) =>
    row?.campaign?.toLowerCase().includes(search.toLowerCase()) ||
    row?.platform?.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const exportData = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "CampaignData")
    return workbook
  }

  const downloadExcel = () => {
    const wb = exportData()
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" })
    saveAs(blob, "campaign_data.xlsx")
  }

  const downloadCSV = () => {
    const wb = exportData()
    const csv = XLSX.write(wb, { bookType: "csv", type: "string" })
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, "campaign_data.csv")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Campaign Data</h2>
        <Input
          placeholder="Search campaigns/platforms..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="w-64"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Download">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Export as...</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={downloadCSV}>
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={downloadExcel}>
              Excel (.xlsx)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // PDF export logic placeholder
                alert("PDF export is not implemented yet.")
              }}
            >
              PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow ring-1 ring-black/5 dark:ring-white/10 bg-card">
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <TableHeader>
            <TableRow className="bg-muted/60 dark:bg-muted/40">
              <TableHead className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">Campaign</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">Platform</TableHead>
              <TableHead className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">Impressions</TableHead>
              <TableHead className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">Clicks</TableHead>
              <TableHead className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">Conversions</TableHead>
              <TableHead className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-400 dark:text-gray-500">
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, idx) => (
                <TableRow
                  key={row.id}
                  className={`
                    ${idx % 2 === 0 ? "bg-white dark:bg-muted/30" : "bg-gray-50 dark:bg-muted/10"}
                    transition-colors hover:bg-primary/10 dark:hover:bg-primary/20
                  `}
                >
                  <TableCell className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{row.campaign}</TableCell>
                  <TableCell className="px-6 py-4 text-gray-700 dark:text-gray-200">{row.platform}</TableCell>
                  <TableCell className="px-6 py-4 text-right tabular-nums">{row.impressions.toLocaleString()}</TableCell>
                  <TableCell className="px-6 py-4 text-right tabular-nums">{row.clicks.toLocaleString()}</TableCell>
                  <TableCell className="px-6 py-4 text-right tabular-nums">{row.conversions.toLocaleString()}</TableCell>
                  <TableCell className="px-6 py-4 text-right font-semibold text-primary">{row.cost}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end items-center space-x-2">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
        <span>Page {page} of {totalPages}</span>
        <Button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  )
}
