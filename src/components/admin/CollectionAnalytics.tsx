import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock data for the charts
const zoneData = [
  { name: "North District", value: 45, fill: "#8884d8" },
  { name: "South District", value: 32, fill: "#82ca9d" },
  { name: "East District", value: 18, fill: "#ffc658" },
  { name: "West District", value: 27, fill: "#ff8042" },
  { name: "Central District", value: 15, fill: "#0088fe" },
];

const monthlyData = [
  { name: "Jan", collections: 65, weight: 280 },
  { name: "Feb", collections: 59, weight: 255 },
  { name: "Mar", collections: 80, weight: 340 },
  { name: "Apr", collections: 81, weight: 320 },
  { name: "May", collections: 56, weight: 245 },
  { name: "Jun", collections: 55, weight: 210 },
  { name: "Jul", collections: 40, weight: 180 },
];

const collectorPerformanceData = [
  { name: "John", collections: 45, efficiency: 85 },
  { name: "Jane", collections: 32, efficiency: 92 },
  { name: "Michael", collections: 18, efficiency: 78 },
  { name: "Emily", collections: 27, efficiency: 88 },
  { name: "Robert", collections: 15, efficiency: 75 },
];

const wasteTypeData = [
  { name: "Plastic", value: 35 },
  { name: "Paper", value: 25 },
  { name: "Glass", value: 15 },
  { name: "Metal", value: 10 },
  { name: "Organic", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

interface CollectionAnalyticsProps {
  type: "zone" | "overview";
}

const CollectionAnalytics = ({ type }: CollectionAnalyticsProps) => {
  if (type === "zone") {
    return (
      <ChartContainer className="h-[300px]" config={{}}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={zoneData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {zoneData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Zone
                          </span>
                          <span className="font-bold text-foreground">
                            {payload[0].name}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Collections
                          </span>
                          <span className="font-bold text-foreground">
                            {payload[0].value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Monthly Collections</h3>
        <ChartContainer className="h-[300px]" config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="collections"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Collector Performance</h3>
        <ChartContainer className="h-[300px]" config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={collectorPerformanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="collections" fill="#8884d8" />
              <Bar dataKey="efficiency" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Waste Type Distribution</h3>
        <ChartContainer className="h-[300px]" config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={wasteTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {wasteTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Zone Collections</h3>
        <ChartContainer className="h-[300px]" config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={zoneData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default CollectionAnalytics;
