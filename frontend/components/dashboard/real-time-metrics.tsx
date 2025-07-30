'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Users, 
  Eye, 
  MousePointer, 
  ShoppingCart,
  Zap
} from 'lucide-react';

interface RealTimeMetric {
  label: string;
  value: number;
  unit: string;
  icon: any;
  change: number;
  color: string;
}

export function RealTimeMetrics() {
  const [metrics, setMetrics] = useState<RealTimeMetric[]>([
    { label: 'Active Users', value: 1247, unit: '', icon: Users, change: 0, color: 'text-blue-600' },
    { label: 'Page Views', value: 8924, unit: '/min', icon: Eye, change: 0, color: 'text-green-600' },
    { label: 'Click Rate', value: 4.2, unit: '%', icon: MousePointer, change: 0, color: 'text-purple-600' },
    { label: 'Conversions', value: 23, unit: '/hr', icon: ShoppingCart, change: 0, color: 'text-orange-600' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const changePercent = (Math.random() - 0.5) * 10; // -5% to +5%
        const newValue = Math.max(0, metric.value * (1 + changePercent / 100));
        
        return {
          ...metric,
          value: Math.round(newValue * 10) / 10,
          change: changePercent
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="flex items-center gap-2">
              Real-Time Metrics
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">LIVE</span>
              </div>
            </CardTitle>
            <CardDescription>
              Live performance data updated every 3 seconds
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="text-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex justify-center mb-2">
                  <IconComponent className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className="text-2xl font-bold mb-1">
                  {metric.value.toLocaleString()}{metric.unit}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {metric.label}
                </div>
                <Badge 
                  variant={metric.change >= 0 ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                </Badge>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-yellow-600" />
            <span className="font-medium text-sm">Performance Alert</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Traffic is 23% higher than usual for this time of day. Consider scaling up server resources.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}