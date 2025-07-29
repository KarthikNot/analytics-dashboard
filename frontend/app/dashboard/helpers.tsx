
import * as XLSX from "xlsx"

// Helper to calculate percent change between yesterday and day before
export function getPercentChange(data: { label: string, value: number }[]) {
    if (!data || data.length < 2) return null
    // Sort by label (date string)
    const sorted = [...data].sort((a, b) => a.label.localeCompare(b.label))
    const yesterday = sorted[sorted.length - 1]
    const dayBefore = sorted[sorted.length - 2]
    if (!yesterday || !dayBefore || dayBefore.value === 0) return null
    const change = ((yesterday.value - dayBefore.value) / dayBefore.value) * 100
    return change
  }

  export function downloadCSV(data: { label: string, value: number }[], filename = "user_signups.csv") {
    const header = "Date,Signups\n"
    const rows = data.map(d => `${d.label},${d.value}`).join("\n")
    const csv = header + rows
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  export function downloadJSON(data: { label: string, value: number }[], filename = "user_signups.json") {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  
  // This implementation generates a real Microsoft Excel .xlsx file using the SheetJS (xlsx) library.
  export function downloadXLSX(data: { label: string, value: number }[], filename = "user_signups.xlsx") {
    // Prepare worksheet data: header + rows
    const wsData = [
      ["Date", "Signups"],
      ...data.map(d => [d.label, d.value])
    ]
    // Create worksheet and workbook
    const ws = XLSX.utils.aoa_to_sheet(wsData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "UserSignups")
    // Write workbook to binary array
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    // Create blob and trigger download
    const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }