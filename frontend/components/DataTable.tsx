"use client"

import { useState, useMemo } from "react"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import { mockTableData } from "@/lib/mockData"

const ITEMS_PER_PAGE = 5

type SortKey = "campaign" | "platform" | "impressions" | "clicks" | "conversions" | "cost"

// Define fixed widths for each column (in px)
const COLUMN_WIDTHS: Record<SortKey, string> = {
  campaign: "w-48",      // 12rem
  platform: "w-32",      // 8rem
  impressions: "w-32",   // 8rem
  clicks: "w-28",        // 7rem
  conversions: "w-32",   // 8rem
  cost: "w-24",          // 6rem
}

// Add border classes for column separation
const COLUMN_BORDERS: Record<SortKey, string> = {
  campaign: "border-r border-gray-200 dark:border-white/10",
  platform: "border-r border-gray-200 dark:border-white/10",
  impressions: "border-r border-gray-200 dark:border-white/10",
  clicks: "border-r border-gray-200 dark:border-white/10",
  conversions: "border-r border-gray-200 dark:border-white/10",
  cost: "", // last column, no right border
}

export default function DataTable() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<SortKey>("campaign")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [platformFilter, setPlatformFilter] = useState("")

  const filteredData = useMemo(() => {
    let data = mockTableData

    if (search) {
      data = data.filter((row) =>
        row.campaign.toLowerCase().includes(search.toLowerCase()) ||
        row.platform.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (platformFilter) {
      data = data.filter((row) => row.platform === platformFilter)
    }

    data.sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]
      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA
      } else {
        return sortOrder === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA))
      }
    })

    return data
  }, [search, sortKey, sortOrder, platformFilter])

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

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

  const uniquePlatforms = Array.from(new Set(mockTableData.map(row => row.platform)))

  // Table column keys in order
  const columnKeys: SortKey[] = [
    "campaign",
    "platform",
    "impressions",
    "clicks",
    "conversions",
    "cost"
  ]

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

      <div className="flex justify-between">
        <div className="flex items-center space-x-4">
          <label className="text-sm">Filter by Platform:</label>
          <select
            value={platformFilter}
            onChange={(e) => {
              setPlatformFilter(e.target.value)
              setPage(1)
            }}
            className="border p-1 rounded-md text-sm dark:bg-muted dark:text-white"
          >
            <option value="">All</option>
            {uniquePlatforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

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
            <DropdownMenuItem onClick={downloadCSV}>CSV</DropdownMenuItem>
            <DropdownMenuItem onClick={downloadExcel}>Excel (.xlsx)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert("PDF export is not implemented yet.")}>
              PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow ring-1 ring-black/5 dark:ring-white/10 bg-card">
        <Table className="min-w-full table-fixed">
          <TableHeader>
            <TableRow>
              {columnKeys.map((key, idx) => (
                <TableHead
                  key={key}
                  onClick={() => toggleSort(key as SortKey)}
                  className={`cursor-pointer px-4 py-3 uppercase text-xs font-bold tracking-wider ${COLUMN_WIDTHS[key]} whitespace-normal break-words ${COLUMN_BORDERS[key]}`}
                  style={{
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                  scope="col"
                >
                  <div className="flex items-center gap-1">
                    <span>{key}</span>
                    {sortKey === key && (
                      <span className="inline-block w-4 text-center">
                        {sortOrder === "asc" ? "▼" : "▲"}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
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
              paginatedData.map((row) => (
                <TableRow key={row.id} className="transition hover:bg-primary/10 dark:hover:bg-primary/20">
                  <TableCell
                    className={`px-4 py-4 font-medium align-top ${COLUMN_WIDTHS["campaign"]} whitespace-normal break-words ${COLUMN_BORDERS["campaign"]}`}
                    style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  >
                    {row.campaign}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-4 align-top ${COLUMN_WIDTHS["platform"]} whitespace-normal break-words ${COLUMN_BORDERS["platform"]}`}
                    style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  >
                    {row.platform}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-4 text-right align-top ${COLUMN_WIDTHS["impressions"]} whitespace-normal break-words ${COLUMN_BORDERS["impressions"]}`}
                    style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  >
                    {row.impressions.toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-4 text-right align-top ${COLUMN_WIDTHS["clicks"]} whitespace-normal break-words ${COLUMN_BORDERS["clicks"]}`}
                    style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  >
                    {row.clicks.toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-4 text-right align-top ${COLUMN_WIDTHS["conversions"]} whitespace-normal break-words ${COLUMN_BORDERS["conversions"]}`}
                    style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  >
                    {row.conversions.toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-4 text-right font-semibold text-primary align-top ${COLUMN_WIDTHS["cost"]} whitespace-normal break-words ${COLUMN_BORDERS["cost"]}`}
                    style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  >
                    {row.cost}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end items-center space-x-2">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
        <span className="text-sm">Page {page} of {totalPages}</span>
        <Button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  )
}
