'use client';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { RefreshCw, Calendar, Bell } from 'lucide-react';

interface DashboardHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function DashboardHeader({ onRefresh, isRefreshing }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ADmyBRAND Insights
        </h1>
        <p className="text-muted-foreground mt-1">
          AI-Powered Analytics Dashboard for Digital Marketing Agencies
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Calendar className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          disabled={isRefreshing}
          className={isRefreshing ? 'animate-spin' : ''}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}