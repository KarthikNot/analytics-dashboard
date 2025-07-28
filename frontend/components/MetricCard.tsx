'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface MetricCardProps {
  title: string
  value: string
  color?: string
  icon: string
}

export default function MetricCard({ title, value, color = "text-primary" }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
    <Card className="shadow-md hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="text-base text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </CardContent>
    </Card>
    </motion.div>
  )
}