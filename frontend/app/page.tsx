'use client';

import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { MetricCard } from '@/components/dashboard/metric-card';
import { AdvancedCharts } from '@/components/dashboard/advanced-charts';
import { AIInsights } from '@/components/dashboard/ai-insights';
import { PredictiveAnalytics } from '@/components/dashboard/predictive-analytics';
import { HeatmapChart } from '@/components/dashboard/heatmap-chart';
import { RealTimeMetrics } from '@/components/dashboard/real-time-metrics';
import { DataTable } from '@/components/dashboard/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { metricsData, generateRandomMetrics, type MetricData } from '@/lib/mockData';

export default function Home() {
  const [metrics, setMetrics] = useState<MetricData[]>(metricsData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Real-time updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateRandomMetrics());
    }, 15000); // Reduced to 15 seconds for more dynamic feel
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMetrics(generateRandomMetrics());
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />
        
        {/* Enhanced Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} data={metric} isLoading={isLoading} />
          ))}
        </div>

        {/* Real-time Metrics */}
        <div className="mb-6">
          <RealTimeMetrics />
        </div>

        {/* AI Insights */}
        <div className="mb-8">
          <AIInsights />
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="predictive">Predictive</TabsTrigger>
            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <AdvancedCharts />
          </TabsContent>

          <TabsContent value="predictive" className="space-y-6">
            <PredictiveAnalytics />
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HeatmapChart />
              <div className="space-y-6">
                {/* Additional heatmap insights could go here */}
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Additional heatmap visualizations coming soon...
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <DataTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}