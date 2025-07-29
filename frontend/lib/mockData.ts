// Generate 712 days (356*2) of mock line data with small random walk
function generateMockLineData() {
  const days = 356 * 2
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days + 1)
  let value = 2000 + Math.floor(Math.random() * 2000) // start value
  const data = []
  for (let i = 0; i < days; i++) {
    // Format date as yyyy-mm-dd
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    const label = date.toISOString().slice(0, 10)
    // Random walk: change by -200 to +200
    const change = Math.floor(Math.random() * 401) - 200
    value = Math.max(0, value + change)
    data.push({ label, value })
  }
  return data
}

export const mockLineData = generateMockLineData()

export const mockBarData = [
  { label: "Mon", value: 300 },
  { label: "Tue", value: 450 },
  { label: "Wed", value: 700 },
  { label: "Thu", value: 600 },
  { label: "Fri", value: 900 },
  { label: "Sat", value: 750 },
  { label: "Sun", value: 500 },
]

export const mockPieData = [
  { label: "Organic", value: 45 },
  { label: "Paid", value: 25 },
  { label: "Referral", value: 20 },
  { label: "Social", value: 10 },
  { label: "Email", value: 8 },
  { label: "Direct", value: 12 },
]

export const mockTableData = [
  {
    id: "1",
    campaign: "Launch A",
    platform: "Google",
    impressions: 12000,
    clicks: 800,
    conversions: 150,
    cost: "$400"
  },
  {
    id: "2",
    campaign: "Promo B",
    platform: "Facebook",
    impressions: 9000,
    clicks: 600,
    conversions: 120,
    cost: "$300"
  },
  {
    id: "3",
    campaign: "Spring Sale",
    platform: "Instagram",
    impressions: 15000,
    clicks: 950,
    conversions: 200,
    cost: "$500"
  },
  {
    id: "4",
    campaign: "Holiday Blast",
    platform: "Twitter",
    impressions: 8000,
    clicks: 500,
    conversions: 90,
    cost: "$250"
  },
  {
    id: "5",
    campaign: "Summer Push",
    platform: "LinkedIn",
    impressions: 11000,
    clicks: 700,
    conversions: 130,
    cost: "$350"
  },
  {
    id: "6",
    campaign: "Black Friday",
    platform: "Google",
    impressions: 20000,
    clicks: 1500,
    conversions: 350,
    cost: "$900"
  },
  {
    id: "7",
    campaign: "Winter Deals",
    platform: "Snapchat",
    impressions: 9500,
    clicks: 650,
    conversions: 110,
    cost: "$320"
  },
  {
    id: "8",
    campaign: "Back to School",
    platform: "TikTok",
    impressions: 13000,
    clicks: 900,
    conversions: 180,
    cost: "$480"
  },
  {
    id: "9",
    campaign: "Cyber Monday",
    platform: "Google",
    impressions: 17000,
    clicks: 1200,
    conversions: 260,
    cost: "$800"
  },
  {
    id: "10",
    campaign: "Year End",
    platform: "Facebook",
    impressions: 10500,
    clicks: 720,
    conversions: 140,
    cost: "$370"
  },
  {
    id: "11",
    campaign: "Brand Awareness",
    platform: "Instagram",
    impressions: 14000,
    clicks: 850,
    conversions: 170,
    cost: "$420"
  },
  {
    id: "12",
    campaign: "Lead Gen",
    platform: "LinkedIn",
    impressions: 12500,
    clicks: 780,
    conversions: 160,
    cost: "$390"
  },
  {
    id: "13",
    campaign: "Retargeting",
    platform: "Twitter",
    impressions: 9000,
    clicks: 610,
    conversions: 100,
    cost: "$310"
  },
  {
    id: "14",
    campaign: "Product Launch",
    platform: "Google",
    impressions: 18500,
    clicks: 1350,
    conversions: 300,
    cost: "$950"
  },
  {
    id: "15",
    campaign: "Spring Promo",
    platform: "Facebook",
    impressions: 11200,
    clicks: 730,
    conversions: 145,
    cost: "$360"
  },
  {
    id: "16",
    campaign: "Summer Sale",
    platform: "Instagram",
    impressions: 16000,
    clicks: 1000,
    conversions: 210,
    cost: "$540"
  },
  {
    id: "17",
    campaign: "Holiday Cheer",
    platform: "Snapchat",
    impressions: 8700,
    clicks: 570,
    conversions: 95,
    cost: "$270"
  },
  {
    id: "18",
    campaign: "Q1 Push",
    platform: "TikTok",
    impressions: 14500,
    clicks: 920,
    conversions: 175,
    cost: "$410"
  },
  {
    id: "19",
    campaign: "Awareness Drive",
    platform: "LinkedIn",
    impressions: 11800,
    clicks: 760,
    conversions: 155,
    cost: "$380"
  },
  {
    id: "20",
    campaign: "Retargeting 2",
    platform: "Twitter",
    impressions: 9500,
    clicks: 640,
    conversions: 120,
    cost: "$330"
  },
  {
    id: "21",
    campaign: "Promo C",
    platform: "Google",
    impressions: 21000,
    clicks: 1600,
    conversions: 370,
    cost: "$1000"
  },
  {
    id: "22",
    campaign: "Brand Boost",
    platform: "Facebook",
    impressions: 10800,
    clicks: 710,
    conversions: 135,
    cost: "$340"
  },
  {
    id: "23",
    campaign: "Spring Fling",
    platform: "Instagram",
    impressions: 15500,
    clicks: 980,
    conversions: 205,
    cost: "$520"
  },
  {
    id: "24",
    campaign: "Holiday Magic",
    platform: "Snapchat",
    impressions: 9200,
    clicks: 600,
    conversions: 105,
    cost: "$290"
  },
  {
    id: "25",
    campaign: "Back to Work",
    platform: "LinkedIn",
    impressions: 12300,
    clicks: 790,
    conversions: 165,
    cost: "$400"
  }
]