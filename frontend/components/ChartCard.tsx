'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ReactNode } from "react"
import { motion } from "framer-motion"
interface ChartCardProps {
  title: string
  children: ReactNode
}

export default function ChartCard({ title, children }: ChartCardProps) {
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
      <CardContent className="h-[300px]">{children}</CardContent>
    </Card>
    </motion.div>
  )
}