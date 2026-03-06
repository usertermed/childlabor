"use client";

import { Navigation } from "@/components/Navigation";
import { MapChart } from "@/components/MapChart";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, Legend, Cell 
} from "recharts";
import { Download, FileText, Filter, AlertTriangle, Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Top 10 countries based on the user-provided dataset
const highestPrevalenceData = [
  { country: "Ethiopia", percentage: 45.0 },
  { country: "Burkina Faso", percentage: 41.5 },
  { country: "Chad", percentage: 39.0 },
  { country: "Cameroon", percentage: 38.9 },
  { country: "Togo", percentage: 38.5 },
  { country: "Madagascar", percentage: 36.7 },
  { country: "Haiti", percentage: 35.5 },
  { country: "Niger", percentage: 34.4 },
  { country: "Nigeria", percentage: 31.5 },
  { country: "Burundi", percentage: 30.9 },
];

// Historical global estimates from ILO/UNICEF (contextual data)
const trendData = [
  { year: 2000, value: 246 },
  { year: 2004, value: 222 },
  { year: 2008, value: 215 },
  { year: 2012, value: 168 },
  { year: 2016, value: 152 },
  { year: 2020, value: 160 },
  { year: 2024, value: 138 },
];

export default function StatsHub() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary text-balance">Statistics & Insights Hub</h1>
            <p className="text-muted-foreground text-sm md:text-base">Detailed global data mapping and comparative analysis based on 2024-2025 reports.</p>
          </div>
        </header>

        {/* Global Map Integration */}
        <section className="mb-12 md:mb-16">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold font-headline text-primary">Global Prevalence Map</h2>
            <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full border w-fit">
              <AlertTriangle className="h-3 w-3 text-destructive" /> 
              <span>Estimated 138M Children (Ages 5-17) Impacted</span>
            </div>
          </div>
          <div className="w-full">
            <MapChart />
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-12 md:mb-16">
          {/* Top Countries Chart */}
          <Card className="shadow-sm border-muted overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="font-headline text-lg md:text-xl">Highest Prevalence (%)</CardTitle>
              <CardDescription className="text-xs">Top 10 countries by percentage of children in labor (ages 5-17).</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] md:h-[400px] p-2 sm:p-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={highestPrevalenceData} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--muted))" />
                  <XAxis type="number" unit="%" domain={[0, 50]} fontSize={10} />
                  <YAxis dataKey="country" type="category" width={80} fontSize={10} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                  />
                  <Bar dataKey="percentage" fill="hsl(var(--destructive))" radius={[0, 4, 4, 0]}>
                    {highestPrevalenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.percentage > 35 ? "hsl(var(--destructive))" : "hsl(var(--accent))"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Global Trend Chart */}
          <Card className="shadow-sm border-muted overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="font-headline text-lg md:text-xl">Global Trend (2000-2024)</CardTitle>
              <CardDescription className="flex items-center gap-1.5 text-xs">
                <Info className="h-3 w-3" /> Historical global estimates in millions.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] md:h-[400px] p-2 sm:p-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis dataKey="year" fontSize={10} />
                  <YAxis fontSize={10} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2} 
                    name="Children in Labor (Millions)"
                    dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "hsl(var(--background))" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
            <div className="px-6 pb-4">
              <p className="text-[10px] text-muted-foreground text-center">
                *Historical data points (2000-2024) are based on official ILO and UNICEF global reports.
              </p>
            </div>
          </Card>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-headline text-primary">Data Sources & Official Reports</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "2023 Global Estimates Database", 
                org: "UNICEF", 
                date: "June 2025", 
                link: "https://data.unicef.org/wp-content/uploads/2025/06/XLS_Child-labour-database_Jun-2025.xlsx" 
              },
            ].map((report, i) => (
              <Card key={i} className="hover:border-primary transition-all group hover:shadow-md">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="p-3 bg-secondary rounded-lg group-hover:bg-primary/10 transition-colors shrink-0">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1.5 flex-grow">
                    <h3 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">{report.title}</h3>
                    <p className="text-[10px] text-muted-foreground">{report.org} • {report.date}</p>
                    <Button variant="link" className="p-0 h-auto text-[10px] text-accent font-bold hover:no-underline flex items-center gap-1" asChild>
                      <a href={report.link} target="_blank" rel="noopener noreferrer">
                        DOWNLOAD DATA <ExternalLink className="h-2 w-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
