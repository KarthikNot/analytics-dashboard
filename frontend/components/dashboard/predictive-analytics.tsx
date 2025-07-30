'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar,
  Brain,
  Zap
} from 'lucide-react';

// Predictive data
const forecastData = [
  { month: 'Oct', actual: 267000, predicted: null, lower: null, upper: null },
  { month: 'Nov', actual: 283000, predicted: null, lower: null, upper: null },
  { month: 'Dec', actual: 298000, predicted: null, lower: null, upper: null },
  { month: 'Jan', actual: null, predicted: 315000, lower: 295000, upper: 335000 },
  { month: 'Feb', actual: null, predicted: 332000, lower: 308000, upper: 356000 },
  { month: 'Mar', actual: null, predicted: 348000, lower: 320000, upper: 376000 },
  { month: 'Apr', actual: null, predicted: 365000, lower: 335000, upper: 395000 },
  { month: 'May', actual: null, predicted: 382000, lower: 348000, upper: 416000 },
  { month: 'Jun', actual: null, predicted: 398000, lower: 360000, upper: 436000 }
];

const seasonalityData = [
  { month: 'Jan', multiplier: 0.85, confidence: 92 },
  { month: 'Feb', multiplier: 0.78, confidence: 89 },
  { month: 'Mar', multiplier: 0.92, confidence: 94 },
  { month: 'Apr', multiplier: 1.05, confidence: 91 },
  { month: 'May', multiplier: 1.12, confidence: 88 },
  { month: 'Jun', multiplier: 1.18, confidence: 85 },
  { month: 'Jul', multiplier: 1.25, confidence: 87 },
  { month: 'Aug', multiplier: 1.15, confidence: 90 },
  { month: 'Sep', multiplier: 1.08, confidence: 93 },
  { month: 'Oct', multiplier: 1.22, confidence: 95 },
  { month: 'Nov', multiplier: 1.35, confidence: 97 },
  { month: 'Dec', multiplier: 1.42, confidence: 96 }
];

const predictions = [
  {
    metric: 'Revenue Growth',
    current: '$298K',
    predicted: '$398K',
    change: 33.6,
    confidence: 87,
    timeframe: '6 months',
    factors: ['Seasonal trends', 'Campaign optimization', 'Market expansion']
  },
  {
    metric: 'Customer Acquisition',
    current: '2,840',
    predicted: '4,120',
    change: 45.1,
    confidence: 82,
    timeframe: '3 months',
    factors: ['Improved targeting', 'New channels', 'Referral program']
  },
  {
    metric: 'Churn Reduction',
    current: '2.3%',
    predicted: '1.8%',
    change: -21.7,
    confidence: 79,
    timeframe: '4 months',
    factors: ['Better onboarding', 'Product improvements', 'Support optimization']
  },
  {
    metric: 'ROAS Improvement',
    current: '4.8x',
    predicted: '6.2x',
    change: 29.2,
    confidence: 84,
    timeframe: '5 months',
    factors: ['AI optimization', 'Audience refinement', 'Creative testing']
  }
];

export function PredictiveAnalytics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Revenue Forecast</CardTitle>
              <CardDescription>
                AI-powered 6-month revenue prediction with confidence intervals
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (!value) return ['N/A', name];
                  return [`$${(value as number).toLocaleString()}`, name];
                }}
              />
              <Area
                dataKey="upper"
                stroke="none"
                fill="#8884d8"
                fillOpacity={0.1}
              />
              <Area
                dataKey="lower"
                stroke="none"
                fill="#ffffff"
                fillOpacity={1}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#8b5cf6"
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span>Actual Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <span>Predicted Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-200 rounded-full"></div>
              <span>Confidence Interval</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Seasonality Analysis
            </CardTitle>
            <CardDescription>
              Monthly performance multipliers based on historical data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={seasonalityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${(value as number).toFixed(2)}x`, 'Multiplier']}
                />
                <Area
                  type="monotone"
                  dataKey="multiplier"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Key Predictions
            </CardTitle>
            <CardDescription>
              AI-generated forecasts for critical business metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.slice(0, 3).map((prediction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{prediction.metric}</div>
                    <div className="text-xs text-muted-foreground">
                      {prediction.current} → {prediction.predicted}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {prediction.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      prediction.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {Math.abs(prediction.change).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {predictions.map((prediction, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Target className="h-5 w-5 text-muted-foreground" />
                <Badge variant="outline" className="text-xs">
                  {prediction.timeframe}
                </Badge>
              </div>
              <CardTitle className="text-lg">{prediction.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current</span>
                  <span className="font-medium">{prediction.current}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Predicted</span>
                  <span className="font-medium text-primary">{prediction.predicted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Confidence</span>
                  <span className="font-medium">{prediction.confidence}%</span>
                </div>
                <Progress value={prediction.confidence} className="h-2" />
                <div className="pt-2">
                  <div className="text-xs text-muted-foreground mb-1">Key Factors:</div>
                  <div className="flex flex-wrap gap-1">
                    {prediction.factors.slice(0, 2).map((factor, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}