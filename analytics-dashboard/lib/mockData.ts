// Enhanced Mock data for ADmyBRAND Insights Analytics Dashboard
export interface MetricData {
  label: string;
  value: string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  trend: number[];
  target?: string;
  description?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  revenue?: number;
  users?: number;
  conversions?: number;
  impressions?: number;
  clicks?: number;
  ctr?: number;
  cpc?: number;
  roas?: number;
  date?: string;
}

export interface CampaignData {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  clicks: number;
  impressions: number;
  ctr: number;
  conversions: number;
  cost_per_conversion: number;
  roi: number;
  platform: string;
  audience_size: number;
  engagement_rate: number;
}

export interface AIInsight {
  id: string;
  type: 'opportunity' | 'warning' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  action?: string;
  metric_affected?: string;
  potential_value?: string;
}

export interface GeographicData {
  country: string;
  users: number;
  revenue: number;
  conversion_rate: number;
  coordinates: [number, number];
}

export interface DeviceData {
  device: string;
  users: number;
  sessions: number;
  bounce_rate: number;
  avg_session_duration: number;
}

export interface FunnelData {
  stage: string;
  users: number;
  conversion_rate: number;
  drop_off: number;
}

export interface HeatmapData {
  hour: number;
  day: string;
  value: number;
}

// Enhanced key metrics data
export const metricsData: MetricData[] = [
  {
    label: 'Total Revenue',
    value: '$2,847,291',
    change: 12.5,
    changeType: 'positive',
    icon: 'DollarSign',
    trend: [65000, 72000, 68000, 79000, 85000, 91000, 88000],
    target: '$3,000,000',
    description: 'Monthly recurring revenue from all channels'
  },
  {
    label: 'Active Users',
    value: '584,953',
    change: 8.2,
    changeType: 'positive',
    icon: 'Users',
    trend: [45000, 52000, 48000, 61000, 67000, 72000, 69000],
    target: '600,000',
    description: 'Monthly active users across all platforms'
  },
  {
    label: 'Conversions',
    value: '28,429',
    change: -2.1,
    changeType: 'negative',
    icon: 'Target',
    trend: [2100, 2300, 2000, 2500, 2700, 2400, 2200],
    target: '30,000',
    description: 'Total conversions from all marketing channels'
  },
  {
    label: 'ROAS',
    value: '4.8x',
    change: 15.3,
    changeType: 'positive',
    icon: 'TrendingUp',
    trend: [3.2, 3.8, 3.5, 4.1, 4.3, 4.6, 4.8],
    target: '5.0x',
    description: 'Return on advertising spend across campaigns'
  },
  {
    label: 'Customer LTV',
    value: '$1,247',
    change: 6.7,
    changeType: 'positive',
    icon: 'Heart',
    trend: [1100, 1150, 1120, 1180, 1200, 1230, 1247],
    target: '$1,400',
    description: 'Average customer lifetime value'
  },
  {
    label: 'Churn Rate',
    value: '2.3%',
    change: -0.8,
    changeType: 'positive',
    icon: 'UserMinus',
    trend: [3.1, 2.9, 3.2, 2.7, 2.5, 2.4, 2.3],
    target: '2.0%',
    description: 'Monthly customer churn rate'
  },
  {
    label: 'Avg. Order Value',
    value: '$127',
    change: 4.2,
    changeType: 'positive',
    icon: 'ShoppingCart',
    trend: [115, 118, 122, 119, 124, 125, 127],
    target: '$135',
    description: 'Average order value per transaction'
  },
  {
    label: 'Lead Quality Score',
    value: '8.4/10',
    change: 2.1,
    changeType: 'positive',
    icon: 'Star',
    trend: [7.8, 8.0, 7.9, 8.1, 8.2, 8.3, 8.4],
    target: '9.0/10',
    description: 'AI-calculated lead quality score'
  }
];

// Revenue and users over time (enhanced)
export const revenueData: ChartDataPoint[] = [
  { name: 'Jan', value: 165000, revenue: 165000, users: 145000, conversions: 2100, impressions: 1200000, clicks: 48000, ctr: 4.0, cpc: 2.5, roas: 4.2 },
  { name: 'Feb', value: 182000, revenue: 182000, users: 152000, conversions: 2300, impressions: 1350000, clicks: 54000, ctr: 4.2, cpc: 2.3, roas: 4.5 },
  { name: 'Mar', value: 168000, revenue: 168000, users: 148000, conversions: 2000, impressions: 1180000, clicks: 47000, ctr: 3.8, cpc: 2.7, roas: 3.9 },
  { name: 'Apr', value: 199000, revenue: 199000, users: 161000, conversions: 2500, impressions: 1420000, clicks: 56800, ctr: 4.3, cpc: 2.4, roas: 4.8 },
  { name: 'May', value: 215000, revenue: 215000, users: 167000, conversions: 2700, impressions: 1580000, clicks: 63200, ctr: 4.5, cpc: 2.2, roas: 5.1 },
  { name: 'Jun', value: 231000, revenue: 231000, users: 172000, conversions: 2900, impressions: 1650000, clicks: 66000, ctr: 4.6, cpc: 2.1, roas: 5.3 },
  { name: 'Jul', value: 218000, revenue: 218000, users: 169000, conversions: 2750, impressions: 1520000, clicks: 60800, ctr: 4.4, cpc: 2.3, roas: 4.9 },
  { name: 'Aug', value: 244000, revenue: 244000, users: 175000, conversions: 3100, impressions: 1720000, clicks: 68800, ctr: 4.7, cpc: 2.0, roas: 5.5 },
  { name: 'Sep', value: 229000, revenue: 229000, users: 171000, conversions: 2850, impressions: 1590000, clicks: 63600, ctr: 4.5, cpc: 2.2, roas: 5.0 },
  { name: 'Oct', value: 267000, revenue: 267000, users: 178000, conversions: 3200, impressions: 1850000, clicks: 74000, ctr: 4.8, cpc: 1.9, roas: 5.8 },
  { name: 'Nov', value: 283000, revenue: 283000, users: 182000, conversions: 3400, impressions: 1920000, clicks: 76800, ctr: 4.9, cpc: 1.8, roas: 6.1 },
  { name: 'Dec', value: 298000, revenue: 298000, users: 187000, conversions: 3600, impressions: 2050000, clicks: 82000, ctr: 5.0, cpc: 1.7, roas: 6.3 }
];

// Campaign performance (enhanced)
export const campaignPerformance: ChartDataPoint[] = [
  { name: 'Google Ads', value: 145000, conversions: 1200, ctr: 4.2, roas: 5.8 },
  { name: 'Facebook', value: 128000, conversions: 980, ctr: 3.8, roas: 4.9 },
  { name: 'Instagram', value: 89000, conversions: 720, ctr: 4.5, roas: 5.2 },
  { name: 'LinkedIn', value: 71000, conversions: 450, ctr: 2.9, roas: 4.1 },
  { name: 'Twitter', value: 48000, conversions: 320, ctr: 3.2, roas: 3.8 },
  { name: 'TikTok', value: 65000, conversions: 580, ctr: 5.1, roas: 6.2 },
  { name: 'YouTube', value: 52000, conversions: 380, ctr: 3.6, roas: 4.3 },
  { name: 'Pinterest', value: 34000, conversions: 240, ctr: 4.8, roas: 5.5 }
];

// Traffic sources (enhanced)
export const trafficSources: ChartDataPoint[] = [
  { name: 'Organic Search', value: 42, users: 241000 },
  { name: 'Paid Search', value: 28, users: 161000 },
  { name: 'Social Media', value: 18, users: 103000 },
  { name: 'Direct', value: 8, users: 46000 },
  { name: 'Email', value: 4, users: 23000 }
];

// Geographic data
export const geographicData: GeographicData[] = [
  { country: 'United States', users: 245000, revenue: 1200000, conversion_rate: 3.2, coordinates: [39.8283, -98.5795] },
  { country: 'United Kingdom', users: 89000, revenue: 420000, conversion_rate: 2.8, coordinates: [55.3781, -3.4360] },
  { country: 'Canada', users: 67000, revenue: 310000, conversion_rate: 3.1, coordinates: [56.1304, -106.3468] },
  { country: 'Australia', users: 54000, revenue: 280000, conversion_rate: 3.4, coordinates: [-25.2744, 133.7751] },
  { country: 'Germany', users: 78000, revenue: 350000, conversion_rate: 2.9, coordinates: [51.1657, 10.4515] },
  { country: 'France', users: 62000, revenue: 290000, conversion_rate: 2.7, coordinates: [46.2276, 2.2137] },
  { country: 'Japan', users: 45000, revenue: 240000, conversion_rate: 3.6, coordinates: [36.2048, 138.2529] }
];

// Device breakdown
export const deviceData: DeviceData[] = [
  { device: 'Desktop', users: 298000, sessions: 456000, bounce_rate: 32.1, avg_session_duration: 245 },
  { device: 'Mobile', users: 234000, sessions: 389000, bounce_rate: 45.2, avg_session_duration: 156 },
  { device: 'Tablet', users: 52000, sessions: 78000, bounce_rate: 38.7, avg_session_duration: 198 }
];

// Conversion funnel
export const funnelData: FunnelData[] = [
  { stage: 'Visitors', users: 584953, conversion_rate: 100, drop_off: 0 },
  { stage: 'Product Views', users: 234567, conversion_rate: 40.1, drop_off: 59.9 },
  { stage: 'Add to Cart', users: 89234, conversion_rate: 15.3, drop_off: 24.8 },
  { stage: 'Checkout', users: 45678, conversion_rate: 7.8, drop_off: 7.5 },
  { stage: 'Purchase', users: 28429, conversion_rate: 4.9, drop_off: 2.9 }
];

// Heatmap data (hour vs day)
export const heatmapData: HeatmapData[] = [
  // Monday
  { hour: 0, day: 'Mon', value: 6 }, { hour: 1, day: 'Mon', value: 4 }, { hour: 2, day: 'Mon', value: 3 },
  { hour: 3, day: 'Mon', value: 2 }, { hour: 4, day: 'Mon', value: 2 }, { hour: 5, day: 'Mon', value: 3 },
  { hour: 6, day: 'Mon', value: 10 }, { hour: 7, day: 'Mon', value: 22 }, { hour: 8, day: 'Mon', value: 38 },
  { hour: 9, day: 'Mon', value: 55 }, { hour: 10, day: 'Mon', value: 68 }, { hour: 11, day: 'Mon', value: 74 },
  { hour: 12, day: 'Mon', value: 80 }, { hour: 13, day: 'Mon', value: 77 }, { hour: 14, day: 'Mon', value: 85 },
  { hour: 15, day: 'Mon', value: 82 }, { hour: 16, day: 'Mon', value: 70 }, { hour: 17, day: 'Mon', value: 60 },
  { hour: 18, day: 'Mon', value: 48 }, { hour: 19, day: 'Mon', value: 36 }, { hour: 20, day: 'Mon', value: 28 },
  { hour: 21, day: 'Mon', value: 20 }, { hour: 22, day: 'Mon', value: 14 }, { hour: 23, day: 'Mon', value: 9 },
  // Tuesday
  { hour: 0, day: 'Tue', value: 7 }, { hour: 1, day: 'Tue', value: 5 }, { hour: 2, day: 'Tue', value: 3 },
  { hour: 3, day: 'Tue', value: 2 }, { hour: 4, day: 'Tue', value: 2 }, { hour: 5, day: 'Tue', value: 3 },
  { hour: 6, day: 'Tue', value: 12 }, { hour: 7, day: 'Tue', value: 25 }, { hour: 8, day: 'Tue', value: 42 },
  { hour: 9, day: 'Tue', value: 60 }, { hour: 10, day: 'Tue', value: 72 }, { hour: 11, day: 'Tue', value: 78 },
  { hour: 12, day: 'Tue', value: 85 }, { hour: 13, day: 'Tue', value: 82 }, { hour: 14, day: 'Tue', value: 90 },
  { hour: 15, day: 'Tue', value: 87 }, { hour: 16, day: 'Tue', value: 75 }, { hour: 17, day: 'Tue', value: 62 },
  { hour: 18, day: 'Tue', value: 50 }, { hour: 19, day: 'Tue', value: 38 }, { hour: 20, day: 'Tue', value: 30 },
  { hour: 21, day: 'Tue', value: 22 }, { hour: 22, day: 'Tue', value: 16 }, { hour: 23, day: 'Tue', value: 10 },
  // Wednesday
  { hour: 0, day: 'Wed', value: 8 }, { hour: 1, day: 'Wed', value: 6 }, { hour: 2, day: 'Wed', value: 4 },
  { hour: 3, day: 'Wed', value: 3 }, { hour: 4, day: 'Wed', value: 2 }, { hour: 5, day: 'Wed', value: 3 },
  { hour: 6, day: 'Wed', value: 14 }, { hour: 7, day: 'Wed', value: 28 }, { hour: 8, day: 'Wed', value: 48 },
  { hour: 9, day: 'Wed', value: 65 }, { hour: 10, day: 'Wed', value: 78 }, { hour: 11, day: 'Wed', value: 84 },
  { hour: 12, day: 'Wed', value: 90 }, { hour: 13, day: 'Wed', value: 88 }, { hour: 14, day: 'Wed', value: 95 },
  { hour: 15, day: 'Wed', value: 92 }, { hour: 16, day: 'Wed', value: 80 }, { hour: 17, day: 'Wed', value: 68 },
  { hour: 18, day: 'Wed', value: 56 }, { hour: 19, day: 'Wed', value: 44 }, { hour: 20, day: 'Wed', value: 34 },
  { hour: 21, day: 'Wed', value: 26 }, { hour: 22, day: 'Wed', value: 18 }, { hour: 23, day: 'Wed', value: 12 },
  // Thursday
  { hour: 0, day: 'Thu', value: 50 }, { hour: 1, day: 'Thu', value: 46 }, { hour: 2, day: 'Thu', value: 43 },
  { hour: 3, day: 'Thu', value: 40 }, { hour: 4, day: 'Thu', value: 36 }, { hour: 5, day: 'Thu', value: 33 },
  { hour: 6, day: 'Thu', value: 30 }, { hour: 7, day: 'Thu', value: 27 }, { hour: 8, day: 'Thu', value: 25 },
  { hour: 9, day: 'Thu', value: 24 }, { hour: 10, day: 'Thu', value: 23 }, { hour: 11, day: 'Thu', value: 22 },
  { hour: 12, day: 'Thu', value: 22 }, { hour: 13, day: 'Thu', value: 23 }, { hour: 14, day: 'Thu', value: 24 },
  { hour: 15, day: 'Thu', value: 25 }, { hour: 16, day: 'Thu', value: 27 }, { hour: 17, day: 'Thu', value: 30 },
  { hour: 18, day: 'Thu', value: 33 }, { hour: 19, day: 'Thu', value: 36 }, { hour: 20, day: 'Thu', value: 40 },
  { hour: 21, day: 'Thu', value: 43 }, { hour: 22, day: 'Thu', value: 46 }, { hour: 23, day: 'Thu', value: 50 },
  // Friday
  { hour: 0, day: 'Fri', value: 55 }, { hour: 1, day: 'Fri', value: 51 }, { hour: 2, day: 'Fri', value: 48 },
  { hour: 3, day: 'Fri', value: 45 }, { hour: 4, day: 'Fri', value: 41 }, { hour: 5, day: 'Fri', value: 38 },
  { hour: 6, day: 'Fri', value: 35 }, { hour: 7, day: 'Fri', value: 32 }, { hour: 8, day: 'Fri', value: 30 },
  { hour: 9, day: 'Fri', value: 29 }, { hour: 10, day: 'Fri', value: 28 }, { hour: 11, day: 'Fri', value: 27 },
  { hour: 12, day: 'Fri', value: 27 }, { hour: 13, day: 'Fri', value: 28 }, { hour: 14, day: 'Fri', value: 29 },
  { hour: 15, day: 'Fri', value: 30 }, { hour: 16, day: 'Fri', value: 32 }, { hour: 17, day: 'Fri', value: 35 },
  { hour: 18, day: 'Fri', value: 38 }, { hour: 19, day: 'Fri', value: 41 }, { hour: 20, day: 'Fri', value: 45 },
  { hour: 21, day: 'Fri', value: 48 }, { hour: 22, day: 'Fri', value: 51 }, { hour: 23, day: 'Fri', value: 55 },
  // Saturday
  { hour: 0, day: 'Sat', value: 60 }, { hour: 1, day: 'Sat', value: 56 }, { hour: 2, day: 'Sat', value: 53 },
  { hour: 3, day: 'Sat', value: 50 }, { hour: 4, day: 'Sat', value: 46 }, { hour: 5, day: 'Sat', value: 43 },
  { hour: 6, day: 'Sat', value: 40 }, { hour: 7, day: 'Sat', value: 37 }, { hour: 8, day: 'Sat', value: 35 },
  { hour: 9, day: 'Sat', value: 34 }, { hour: 10, day: 'Sat', value: 33 }, { hour: 11, day: 'Sat', value: 32 },
  { hour: 12, day: 'Sat', value: 32 }, { hour: 13, day: 'Sat', value: 33 }, { hour: 14, day: 'Sat', value: 34 },
  { hour: 15, day: 'Sat', value: 35 }, { hour: 16, day: 'Sat', value: 37 }, { hour: 17, day: 'Sat', value: 40 },
  { hour: 18, day: 'Sat', value: 43 }, { hour: 19, day: 'Sat', value: 46 }, { hour: 20, day: 'Sat', value: 50 },
  { hour: 21, day: 'Sat', value: 53 }, { hour: 22, day: 'Sat', value: 56 }, { hour: 23, day: 'Sat', value: 60 },
  // Sunday
  { hour: 0, day: 'Sun', value: 65 }, { hour: 1, day: 'Sun', value: 61 }, { hour: 2, day: 'Sun', value: 58 },
  { hour: 3, day: 'Sun', value: 55 }, { hour: 4, day: 'Sun', value: 51 }, { hour: 5, day: 'Sun', value: 48 },
  { hour: 6, day: 'Sun', value: 45 }, { hour: 7, day: 'Sun', value: 42 }, { hour: 8, day: 'Sun', value: 40 },
  { hour: 9, day: 'Sun', value: 39 }, { hour: 10, day: 'Sun', value: 38 }, { hour: 11, day: 'Sun', value: 37 },
  { hour: 12, day: 'Sun', value: 37 }, { hour: 13, day: 'Sun', value: 38 }, { hour: 14, day: 'Sun', value: 39 },
  { hour: 15, day: 'Sun', value: 40 }, { hour: 16, day: 'Sun', value: 42 }, { hour: 17, day: 'Sun', value: 45 },
  { hour: 18, day: 'Sun', value: 48 }, { hour: 19, day: 'Sun', value: 51 }, { hour: 20, day: 'Sun', value: 55 },
  { hour: 21, day: 'Sun', value: 58 }, { hour: 22, day: 'Sun', value: 61 }, { hour: 23, day: 'Sun', value: 65 }
];

// Enhanced campaign table data
export const campaignTableData: CampaignData[] = [
  {
    id: '1',
    name: 'Holiday Sale Campaign',
    status: 'active',
    budget: 25000,
    spent: 18750,
    clicks: 8924,
    impressions: 245680,
    ctr: 3.63,
    conversions: 342,
    cost_per_conversion: 54.82,
    roi: 285,
    platform: 'Google Ads',
    audience_size: 2500000,
    engagement_rate: 4.2
  },
  {
    id: '2',
    name: 'Brand Awareness Q4',
    status: 'active',
    budget: 15000,
    spent: 12300,
    clicks: 5641,
    impressions: 189450,
    ctr: 2.98,
    conversions: 198,
    cost_per_conversion: 62.12,
    roi: 156,
    platform: 'Facebook',
    audience_size: 1800000,
    engagement_rate: 3.8
  },
  {
    id: '3',
    name: 'Product Launch - Mobile',
    status: 'paused',
    budget: 8000,
    spent: 6800,
    clicks: 3254,
    impressions: 125670,
    ctr: 2.59,
    conversions: 124,
    cost_per_conversion: 54.84,
    roi: 198,
    platform: 'Instagram',
    audience_size: 950000,
    engagement_rate: 5.1
  },
  {
    id: '4',
    name: 'Retargeting Campaign',
    status: 'active',
    budget: 12000,
    spent: 9240,
    clicks: 4892,
    impressions: 95430,
    ctr: 5.13,
    conversions: 267,
    cost_per_conversion: 34.61,
    roi: 324,
    platform: 'Google Ads',
    audience_size: 450000,
    engagement_rate: 6.8
  },
  {
    id: '5',
    name: 'Lead Generation B2B',
    status: 'completed',
    budget: 20000,
    spent: 19850,
    clicks: 7234,
    impressions: 234560,
    ctr: 3.08,
    conversions: 445,
    cost_per_conversion: 44.61,
    roi: 267,
    platform: 'LinkedIn',
    audience_size: 1200000,
    engagement_rate: 2.9
  },
  {
    id: '6',
    name: 'Video Marketing Campaign',
    status: 'active',
    budget: 18000,
    spent: 14200,
    clicks: 6789,
    impressions: 198750,
    ctr: 3.42,
    conversions: 289,
    cost_per_conversion: 49.13,
    roi: 203,
    platform: 'YouTube',
    audience_size: 3200000,
    engagement_rate: 4.5
  },
  {
    id: '7',
    name: 'TikTok Viral Campaign',
    status: 'active',
    budget: 10000,
    spent: 7500,
    clicks: 12450,
    impressions: 567890,
    ctr: 2.19,
    conversions: 156,
    cost_per_conversion: 48.08,
    roi: 189,
    platform: 'TikTok',
    audience_size: 5600000,
    engagement_rate: 8.2
  },
  {
    id: '8',
    name: 'Email Nurture Sequence',
    status: 'active',
    budget: 5000,
    spent: 3200,
    clicks: 2890,
    impressions: 45600,
    ctr: 6.34,
    conversions: 234,
    cost_per_conversion: 13.68,
    roi: 456,
    platform: 'Email',
    audience_size: 125000,
    engagement_rate: 12.4
  },
  {
    id: '9',
    name: 'Spring Promo Blitz',
    status: 'active',
    budget: 11000,
    spent: 9200,
    clicks: 5100,
    impressions: 145000,
    ctr: 3.52,
    conversions: 210,
    cost_per_conversion: 43.81,
    roi: 201,
    platform: 'Facebook',
    audience_size: 800000,
    engagement_rate: 4.0
  },
  {
    id: '10',
    name: 'Fitness Influencer Push',
    status: 'paused',
    budget: 9000,
    spent: 7800,
    clicks: 3112,
    impressions: 112000,
    ctr: 2.78,
    conversions: 134,
    cost_per_conversion: 58.21,
    roi: 112,
    platform: 'Instagram',
    audience_size: 600000,
    engagement_rate: 5.6
  },
  {
    id: '11',
    name: 'Summer Product Drops',
    status: 'completed',
    budget: 15500,
    spent: 15120,
    clicks: 6300,
    impressions: 210450,
    ctr: 2.99,
    conversions: 299,
    cost_per_conversion: 50.57,
    roi: 178,
    platform: 'Google Ads',
    audience_size: 1750000,
    engagement_rate: 4.3
  },
  {
    id: '12',
    name: 'Back to School Q3',
    status: 'active',
    budget: 13000,
    spent: 11450,
    clicks: 4590,
    impressions: 164800,
    ctr: 2.78,
    conversions: 177,
    cost_per_conversion: 64.69,
    roi: 151,
    platform: 'LinkedIn',
    audience_size: 900000,
    engagement_rate: 2.3
  },
  {
    id: '13',
    name: 'Wine Subscription Blast',
    status: 'active',
    budget: 14200,
    spent: 10995,
    clicks: 5233,
    impressions: 149560,
    ctr: 3.5,
    conversions: 235,
    cost_per_conversion: 46.80,
    roi: 276,
    platform: 'Email',
    audience_size: 400000,
    engagement_rate: 13.5
  },
  {
    id: '14',
    name: 'B2B Webinar Series',
    status: 'completed',
    budget: 8000,
    spent: 7920,
    clicks: 3245,
    impressions: 89345,
    ctr: 3.63,
    conversions: 150,
    cost_per_conversion: 52.80,
    roi: 193,
    platform: 'LinkedIn',
    audience_size: 350000,
    engagement_rate: 2.1
  },
  {
    id: '15',
    name: 'SEO Awareness Q1',
    status: 'active',
    budget: 10000,
    spent: 8300,
    clicks: 4100,
    impressions: 105890,
    ctr: 3.87,
    conversions: 196,
    cost_per_conversion: 42.35,
    roi: 208,
    platform: 'Google Ads',
    audience_size: 450000,
    engagement_rate: 3.7
  },
  {
    id: '16',
    name: 'Mobile App Launch',
    status: 'active',
    budget: 21000,
    spent: 18090,
    clicks: 9963,
    impressions: 312000,
    ctr: 3.19,
    conversions: 347,
    cost_per_conversion: 52.15,
    roi: 266,
    platform: 'Instagram',
    audience_size: 2100000,
    engagement_rate: 7.2
  },
  {
    id: '17',
    name: 'User Reactivation Drive',
    status: 'paused',
    budget: 9500,
    spent: 8100,
    clicks: 3633,
    impressions: 110040,
    ctr: 3.30,
    conversions: 115,
    cost_per_conversion: 70.43,
    roi: 98,
    platform: 'Facebook',
    audience_size: 700000,
    engagement_rate: 3.9
  },
  {
    id: '18',
    name: 'EcoBrand Social Blitz',
    status: 'active',
    budget: 16500,
    spent: 14820,
    clicks: 5770,
    impressions: 173250,
    ctr: 3.33,
    conversions: 290,
    cost_per_conversion: 51.11,
    roi: 233,
    platform: 'Twitter',
    audience_size: 1250000,
    engagement_rate: 3.4
  },
  {
    id: '19',
    name: 'Flash Sale Campaign',
    status: 'completed',
    budget: 7000,
    spent: 6990,
    clicks: 2680,
    impressions: 65900,
    ctr: 4.07,
    conversions: 123,
    cost_per_conversion: 56.83,
    roi: 150,
    platform: 'Google Ads',
    audience_size: 280000,
    engagement_rate: 4.9
  },
  {
    id: '20',
    name: 'Christmas Promotion',
    status: 'active',
    budget: 26000,
    spent: 21600,
    clicks: 10834,
    impressions: 376800,
    ctr: 2.88,
    conversions: 410,
    cost_per_conversion: 52.68,
    roi: 297,
    platform: 'Facebook',
    audience_size: 3200000,
    engagement_rate: 5.5
  },
  {
    id: '21',
    name: 'Summer Gear Launch',
    status: 'active',
    budget: 17000,
    spent: 15700,
    clicks: 6842,
    impressions: 187000,
    ctr: 3.66,
    conversions: 250,
    cost_per_conversion: 62.80,
    roi: 207,
    platform: 'Instagram',
    audience_size: 1320000,
    engagement_rate: 7.6
  },
  {
    id: '22',
    name: 'End of Season Sale',
    status: 'paused',
    budget: 11200,
    spent: 9984,
    clicks: 4940,
    impressions: 144850,
    ctr: 3.41,
    conversions: 183,
    cost_per_conversion: 54.52,
    roi: 188,
    platform: 'Google Ads',
    audience_size: 520000,
    engagement_rate: 4.1
  },
  {
    id: '23',
    name: 'Back To Work Promo',
    status: 'completed',
    budget: 8000,
    spent: 6960,
    clicks: 3056,
    impressions: 95500,
    ctr: 3.20,
    conversions: 101,
    cost_per_conversion: 68.91,
    roi: 144,
    platform: 'LinkedIn',
    audience_size: 460000,
    engagement_rate: 2.7
  },
  {
    id: '24',
    name: 'App Download Drive',
    status: 'active',
    budget: 13000,
    spent: 11700,
    clicks: 5421,
    impressions: 167320,
    ctr: 3.24,
    conversions: 221,
    cost_per_conversion: 52.94,
    roi: 199,
    platform: 'Instagram',
    audience_size: 800000,
    engagement_rate: 8.1
  },
  {
    id: '25',
    name: 'Father\'s Day Email Push',
    status: 'completed',
    budget: 6500,
    spent: 6300,
    clicks: 2480,
    impressions: 51000,
    ctr: 4.86,
    conversions: 162,
    cost_per_conversion: 38.89,
    roi: 196,
    platform: 'Email',
    audience_size: 175000,
    engagement_rate: 11.8
  }
];

// AI Insights
export const aiInsights: AIInsight[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'Optimize TikTok Campaign Timing',
    description: 'AI analysis shows 34% higher engagement rates between 6-9 PM. Shifting budget allocation could increase conversions by 28%.',
    impact: 'high',
    confidence: 87,
    action: 'Adjust ad scheduling',
    metric_affected: 'Conversions',
    potential_value: '+$45,000 monthly'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Facebook Campaign Fatigue Detected',
    description: 'CTR has declined 15% over the past 2 weeks. Creative refresh recommended to maintain performance.',
    impact: 'medium',
    confidence: 92,
    action: 'Update ad creatives',
    metric_affected: 'CTR',
    potential_value: 'Prevent -$12,000 loss'
  },
  {
    id: '3',
    type: 'recommendation',
    title: 'Expand to Pinterest Advertising',
    description: 'Similar audience segments show 23% higher conversion rates on Pinterest. Recommended budget: $8,000/month.',
    impact: 'medium',
    confidence: 78,
    action: 'Launch Pinterest campaigns',
    metric_affected: 'Revenue',
    potential_value: '+$32,000 monthly'
  },
  {
    id: '4',
    type: 'prediction',
    title: 'Q1 Revenue Forecast',
    description: 'Based on current trends and seasonality, Q1 revenue is projected to reach $3.2M (+18% vs Q4).',
    impact: 'high',
    confidence: 84,
    metric_affected: 'Revenue',
    potential_value: '$3.2M projected'
  },
  {
    id: '5',
    type: 'opportunity',
    title: 'Mobile Conversion Optimization',
    description: 'Mobile users show 45% lower conversion rates. Implementing AMP pages could improve mobile conversions by 31%.',
    impact: 'high',
    confidence: 89,
    action: 'Implement AMP pages',
    metric_affected: 'Mobile Conversions',
    potential_value: '+$28,000 monthly'
  },
  {
    id: '6',
    type: 'recommendation',
    title: 'Lookalike Audience Expansion',
    description: 'Top 1% customer lookalike audiences show 67% higher LTV. Expanding reach could increase quality leads.',
    impact: 'medium',
    confidence: 81,
    action: 'Create lookalike campaigns',
    metric_affected: 'Lead Quality',
    potential_value: '+$18,000 monthly'
  }
];

// Generate random data for real-time updates
export const generateRandomMetrics = (): MetricData[] => {
  return metricsData.map(metric => ({
    ...metric,
    value: metric.label === 'Total Revenue' 
      ? `$${(Math.random() * 200000 + 2700000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      : metric.label === 'Active Users'
      ? (Math.random() * 100000 + 550000).toLocaleString('en-US', { maximumFractionDigits: 0 })
      : metric.label === 'Conversions'
      ? (Math.random() * 10000 + 25000).toLocaleString('en-US', { maximumFractionDigits: 0 })
      : metric.label === 'ROAS'
      ? `${(Math.random() * 2 + 4).toFixed(1)}x`
      : metric.label === 'Customer LTV'
      ? `$${(Math.random() * 200 + 1200).toFixed(0)}`
      : metric.label === 'Churn Rate'
      ? `${(Math.random() * 1 + 2).toFixed(1)}%`
      : metric.label === 'Avg. Order Value'
      ? `$${(Math.random() * 20 + 120).toFixed(0)}`
      : `${(Math.random() * 2 + 8).toFixed(1)}/10`,
    change: (Math.random() - 0.5) * 20,
    trend: Array.from({ length: 7 }, () => Math.random() * 1000 + 1000)
  }));
};