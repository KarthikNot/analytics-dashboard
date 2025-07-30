'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  FunnelChart,
  Funnel,
  LabelList,
  ScatterChart,
  Scatter,
  Cell
} from 'recharts';
import { 
  revenueData, 
  campaignPerformance, 
  funnelData, 
  deviceData,
  geographicData 
} from '@/lib/mockData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

// Radar chart data
const radarData = [
  { metric: 'Reach', value: 85, fullMark: 100 },
  { metric: 'Engagement', value: 78, fullMark: 100 },
  { metric: 'Conversion', value: 92, fullMark: 100 },
  { metric: 'Retention', value: 67, fullMark: 100 },
  { metric: 'Brand Awareness', value: 73, fullMark: 100 },
  { metric: 'ROI', value: 88, fullMark: 100 }
];

// Scatter plot data for correlation analysis
const correlationData = campaignPerformance.map(campaign => ({
  x: campaign.ctr || Math.random() * 5 + 1,
  y: campaign.roas || Math.random() * 4 + 2,
  z: campaign.value / 1000,
  name: campaign.name
}));

export function AdvancedCharts() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="funnel">Funnel</TabsTrigger>
          <TabsTrigger value="radar">Radar</TabsTrigger>
          <TabsTrigger value="correlation">Correlation</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Metric Performance Analysis</CardTitle>
              <CardDescription>
                Combined view of revenue, conversions, and ROAS trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'revenue') return [`$${value?.toLocaleString()}`, 'Revenue'];
                      if (name === 'conversions') return [value?.toLocaleString(), 'Conversions'];
                      if (name === 'roas') return [`${value}x`, 'ROAS'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="revenue" />
                  <Area yAxisId="left" dataKey="conversions" fill="#82ca9d" stroke="#82ca9d" fillOpacity={0.3} name="conversions" />
                  <Line yAxisId="right" type="monotone" dataKey="roas" stroke="#ff7300" strokeWidth={3} name="roas" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel Analysis</CardTitle>
              <CardDescription>
                User journey from initial visit to final conversion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <FunnelChart>
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value?.toLocaleString()} users (${((value as number) / funnelData[0].users * 100).toFixed(1)}%)`,
                      name
                    ]}
                  />
                  <Funnel
                    dataKey="users"
                    data={funnelData}
                    isAnimationActive
                  >
                    <LabelList position="center" fill="#fff" stroke="none" />
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                {funnelData.map((stage, index) => (
                  <div key={stage.stage} className="text-center">
                    <div className="text-2xl font-bold" style={{ color: COLORS[index] }}>
                      {stage.conversion_rate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">{stage.stage}</div>
                    <div className="text-xs text-muted-foreground">
                      {stage.users.toLocaleString()} users
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="radar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Performance Radar</CardTitle>
              <CardDescription>
                Multi-dimensional analysis of key marketing metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {radarData.map((metric) => (
                  <div key={metric.metric} className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">{metric.value}%</div>
                    <div className="text-sm text-muted-foreground">{metric.metric}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CTR vs ROAS Correlation</CardTitle>
              <CardDescription>
                Relationship between click-through rates and return on ad spend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={correlationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="CTR" 
                    unit="%" 
                    domain={[0, 6]}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="ROAS" 
                    unit="x" 
                    domain={[0, 7]}
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value, name) => {
                      if (name === 'CTR') return [`${value}%`, 'CTR'];
                      if (name === 'ROAS') return [`${value}x`, 'ROAS'];
                      return [value, name];
                    }}
                  />
                  <Scatter name="Campaigns" dataKey="y" fill="#8884d8">
                    {correlationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Performance</CardTitle>
              <CardDescription>
                Revenue and conversion rates by country
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {geographicData.map((country, index) => (
                  <div key={country.country} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{country.country}</h4>
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Users:</span>
                        <span className="font-medium">{country.users.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="font-medium">${country.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Conv. Rate:</span>
                        <span className="font-medium">{country.conversion_rate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}