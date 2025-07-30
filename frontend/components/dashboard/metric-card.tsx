'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  Heart,
  UserMinus,
  ShoppingCart,
  Star
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { MetricData } from '@/lib/mockData';

interface MetricCardProps {
  data: MetricData;
  isLoading?: boolean;
}

const iconMap = {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Heart,
  UserMinus,
  ShoppingCart,
  Star
};

export function MetricCard({ data, isLoading = false }: MetricCardProps) {
  const IconComponent = iconMap[data.icon as keyof typeof iconMap] || TrendingUp;
  const ChangeIcon = data.change >= 0 ? TrendingUp : TrendingDown;

  if (isLoading) {
    return (
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <div className="h-4 bg-muted animate-pulse rounded w-24"></div>
          </CardTitle>
          <div className="h-4 w-4 bg-muted animate-pulse rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-muted animate-pulse rounded w-32 mb-2"></div>
          <div className="h-4 bg-muted animate-pulse rounded w-16"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {data.label}
        </CardTitle>
        <IconComponent className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-3 transition-all duration-300">
          {data.value}
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <Badge 
            variant={data.changeType === 'positive' ? 'default' : 'destructive'}
            className="text-xs flex items-center gap-1 w-fit"
          >
            <ChangeIcon className="h-3 w-3" />
            {Math.abs(data.change).toFixed(1)}%
          </Badge>
          {data.target && (
            <div className="text-xs text-muted-foreground">
              Target: {data.target}
            </div>
          )}
        </div>

        {data.trend && (
          <div className="h-8 mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trend.map((value, index) => ({ value, index }))}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={data.changeType === 'positive' ? '#10b981' : '#ef4444'} 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {data.description && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {data.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}