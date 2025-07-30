'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { aiInsights, type AIInsight } from '@/lib/mockData';

const iconMap = {
  opportunity: TrendingUp,
  warning: AlertTriangle,
  recommendation: Lightbulb,
  prediction: Target
};

const colorMap = {
  opportunity: 'text-green-600 bg-green-100',
  warning: 'text-orange-600 bg-orange-100',
  recommendation: 'text-blue-600 bg-blue-100',
  prediction: 'text-purple-600 bg-purple-100'
};

export function AIInsights() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="flex items-center gap-2">
              AI-Powered Insights
              <Sparkles className="h-4 w-4 text-yellow-500" />
            </CardTitle>
            <CardDescription>
              Machine learning recommendations to optimize your campaigns
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiInsights.map((insight) => {
            const IconComponent = iconMap[insight.type];
            return (
              <Card key={insight.id} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-muted/20 rounded-bl-full" />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg ${colorMap[insight.type]}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={getImpactColor(insight.impact)} className="text-xs">
                        {insight.impact.toUpperCase()}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {insight.confidence}% confidence
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm leading-tight mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-medium">{insight.confidence}%</span>
                    </div>
                    <Progress value={insight.confidence} className="h-1" />
                    
                    {insight.potential_value && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Impact</span>
                        <span className="font-medium text-green-600">
                          {insight.potential_value}
                        </span>
                      </div>
                    )}
                    
                    {insight.action && (
                      <Button 
                        size="sm" 
                        className="w-full text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        variant="outline"
                      >
                        {insight.action}
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}