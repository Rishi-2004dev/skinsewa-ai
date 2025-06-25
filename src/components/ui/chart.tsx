import * as React from "react"
import * as RechartsPrimitive from "recharts"

// Export Chart components
export const Chart = RechartsPrimitive.ResponsiveContainer

// Line Chart Components
export const LineChart = RechartsPrimitive.LineChart
export const Line = RechartsPrimitive.Line

// Area Chart Components
export const AreaChart = RechartsPrimitive.AreaChart
export const Area = RechartsPrimitive.Area

// Bar Chart Components
export const BarChart = RechartsPrimitive.BarChart
export const Bar = RechartsPrimitive.Bar

// Other chart components
export const PieChart = RechartsPrimitive.PieChart
export const Pie = RechartsPrimitive.Pie
export const ScatterChart = RechartsPrimitive.ScatterChart
export const Scatter = RechartsPrimitive.Scatter
export const RadarChart = RechartsPrimitive.RadarChart
export const Radar = RechartsPrimitive.Radar

// Common components
export const XAxis = RechartsPrimitive.XAxis
export const YAxis = RechartsPrimitive.YAxis
export const CartesianGrid = RechartsPrimitive.CartesianGrid
export const Tooltip = RechartsPrimitive.Tooltip
export const Legend = RechartsPrimitive.Legend
export const Label = RechartsPrimitive.Label

// Configure the chart tooltip
export function ChartTooltip(props: React.ComponentProps<typeof RechartsPrimitive.Tooltip>) {
  return (
    <RechartsPrimitive.Tooltip 
      wrapperStyle={{ outline: "none" }}
      contentStyle={{
        backgroundColor: "var(--background)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
      }}
      itemStyle={{
        color: "var(--foreground)",
      }}
      labelStyle={{
        color: "var(--foreground)",
        fontWeight: 500,
      }}
      cursor={{ stroke: "var(--muted)" }}
      {...props}
    />
  )
}

// Fixed Legend component to resolve TS error
export function ChartLegend(props: React.ComponentPropsWithoutRef<typeof RechartsPrimitive.Legend>) {
  return (
    <RechartsPrimitive.Legend {...props} />
  )
}
