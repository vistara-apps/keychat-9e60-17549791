
'use client'

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { PricePoint } from '../types'

interface BondingCurveChartProps {
  data: PricePoint[]
  variant?: 'simple' | 'interactive'
}

export function BondingCurveChart({ data, variant = 'simple' }: BondingCurveChartProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatPrice = (value: number) => `${value.toFixed(4)} ETH`

  if (variant === 'simple') {
    return (
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(240 70% 50%)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="timestamp"
            tickFormatter={formatTime}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(240 5% 45%)', fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(value) => value.toFixed(4)}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(240 5% 45%)', fontSize: 12 }}
          />
          <Tooltip
            labelFormatter={(value) => formatTime(value as number)}
            formatter={(value: number) => [formatPrice(value), 'Price']}
            contentStyle={{
              backgroundColor: 'hsl(240 5% 100%)',
              border: '1px solid hsl(240 5% 90%)',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(240 70% 50%)"
            strokeWidth={3}
            dot={{ fill: 'hsl(240 70% 50%)', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(240 70% 50%)', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
