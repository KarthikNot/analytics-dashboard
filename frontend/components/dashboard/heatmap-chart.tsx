'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { heatmapData } from '@/lib/mockData';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => i);

export function HeatmapChart() {
  const getIntensity = (value: number) => {
    const max = Math.max(...heatmapData.map(d => d.value));
    return value / max;
  };

  const getColor = (intensity: number) => {
    const opacity = Math.max(0.1, intensity);
    return `rgba(59, 130, 246, ${opacity})`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Activity Heatmap</CardTitle>
        <CardDescription>
          Hourly user activity patterns throughout the week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Hour labels */}
          <div className="flex">
            <div className="w-12"></div>
            <div className="flex-1 grid grid-cols-24 gap-1">
              {hours.map(hour => (
                <div key={hour} className="text-xs text-center text-muted-foreground">
                  {hour % 6 === 0 ? hour : ''}
                </div>
              ))}
            </div>
          </div>
          
          {/* Heatmap grid */}
          {days.map(day => (
            <div key={day} className="flex items-center">
              <div className="w-12 text-sm text-muted-foreground">{day}</div>
              <div className="flex-1 grid grid-cols-24 gap-1">
                {hours.map(hour => {
                  const dataPoint = heatmapData.find(d => d.day === day && d.hour === hour);
                  const value = dataPoint?.value || 0;
                  const intensity = getIntensity(value);
                  
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className="aspect-square rounded-sm border border-border/50 hover:border-primary transition-colors cursor-pointer group relative"
                      style={{ backgroundColor: getColor(intensity) }}
                      title={`${day} ${hour}:00 - ${value} users`}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-sm transition-colors" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {/* Legend */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <span className="text-sm text-muted-foreground">Less</span>
            <div className="flex gap-1">
              {[0.1, 0.3, 0.5, 0.7, 0.9].map(intensity => (
                <div
                  key={intensity}
                  className="w-3 h-3 rounded-sm border border-border/50"
                  style={{ backgroundColor: getColor(intensity) }}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}