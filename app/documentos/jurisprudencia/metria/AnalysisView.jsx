import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartLegend,
  ChartTooltipContent,
  ChartLegendContent 
} from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AnalysisView = ({ data }) => {
  // Chart configurations
  const resolutionChartConfig = {
    resolved: {
      label: "Casos Resueltos",
      color: "hsl(var(--chart-1))"
    },
    pending: {
      label: "Pendientes",
      color: "hsl(var(--chart-2))"
    }
  };

  const complexityChartConfig = {
    complexity: {
      label: "Complejidad",
      color: "hsl(var(--chart-3))"
    }
  };

  const impactChartConfig = {
    citations: {
      label: "Citaciones",
      color: "hsl(var(--chart-4))"
    },
    impact: {
      label: "Impacto",
      color: "hsl(var(--chart-5))"
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="container p-6 space-y-8">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-[#FF6B35]/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-white">
              Visión General
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-white">
              Rendimiento
            </TabsTrigger>
            <TabsTrigger value="impact" className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-white">
              Impacto
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Resolución temporal */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Tiempo medio de resolución</CardTitle>
                  <CardDescription>Evolución mensual en días</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={resolutionChartConfig} className="h-[300px]">
                    <AreaChart data={data.resolutionTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="time" 
                        fill="var(--color-resolved)" 
                        stroke="var(--color-resolved)"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Complejidad de casos */}
              <Card>
                <CardHeader>
                  <CardTitle>Complejidad de casos</CardTitle>
                  <CardDescription>Distribución por nivel</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={complexityChartConfig} className="h-[300px]">
                    <BarChart data={data.complexity} layout="vertical">
                      <CartesianGrid horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="level" type="category" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="value" 
                        fill="var(--color-complexity)"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Impacto jurisprudencial */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Impacto jurisprudencial</CardTitle>
                  <CardDescription>Citaciones y relevancia</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={impactChartConfig} className="h-[300px]">
                    <LineChart data={data.impact}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="citations" 
                        stroke="var(--color-citations)" 
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="impact" 
                        stroke="var(--color-impact)" 
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            {/* Aquí irían más gráficos específicos de rendimiento */}
          </TabsContent>

          <TabsContent value="impact">
            {/* Aquí irían más gráficos específicos de impacto */}
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default AnalysisView;