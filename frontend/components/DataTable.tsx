"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mockTableData } from "@/lib/mockData"

const ITEMS_PER_PAGE = 2

export default function DataTable() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filteredData = mockTableData.filter((row) =>
    row?.campaign?.toLowerCase().includes(search.toLowerCase()) ||
    row?.platform?.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Impressions</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Conversions</TableHead>
            <TableHead>Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.campaign}</TableCell>
              <TableCell>{row.platform}</TableCell>
              <TableCell>{row.impressions}</TableCell>
              <TableCell>{row.clicks}</TableCell>
              <TableCell>{row.conversions}</TableCell>
              <TableCell>{row.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end items-center space-x-2">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  )
}
