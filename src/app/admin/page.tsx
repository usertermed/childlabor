
"use client";

import { Navigation } from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Upload, Database, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminDashboard() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    setStatus("idle");
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setStatus("success");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <header className="mb-12">
          <h1 className="text-4xl font-bold font-headline text-primary">Data Integration Console</h1>
          <p className="text-muted-foreground">Manage datasets, integrate APIs, and update global mapping visualizations.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" /> CSV Data Upload
                </CardTitle>
                <CardDescription>Upload a CSV file containing country ISO codes and percentage values.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="csv">Select Dataset File</Label>
                  <Input id="csv" type="file" accept=".csv" />
                </div>
                
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Uploading & Processing...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {status === "success" && (
                  <Alert className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Dataset processed and live map updated with 100+ entries.</AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={simulateUpload} 
                  disabled={isUploading} 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isUploading ? "Processing..." : "Sync with Global Map"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" /> API Integration
                </CardTitle>
                <CardDescription>Configure external data sources for automated updates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>ILO Data API Endpoint</Label>
                  <Input placeholder="https://api.ilo.org/v1/data/..." defaultValue="https://api.ilo.org/v1/statistics/child-labor" />
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="flex-1">Test Connection</Button>
                  <Button variant="secondary" className="flex-1">Schedule Sync</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="font-headline">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-sm opacity-80">Database Nodes</span>
                  <span className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400" /> Operational
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-sm opacity-80">Last Sync</span>
                  <span className="text-sm font-bold">Just now</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm opacity-80">Map Cache</span>
                  <span className="text-sm font-bold flex items-center gap-2">
                    <RefreshCw className="h-3 w-3" /> Auto-purging
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "admin_sarah", action: "Integrated 100+ country dataset", time: "5m ago" },
                    { user: "system", action: "Automated sync with UNICEF", time: "2h ago" },
                    { user: "admin_john", action: "Updated trend analysis (2000-2024)", time: "3h ago" },
                  ].map((act, i) => (
                    <div key={i} className="flex justify-between items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{act.action}</p>
                        <p className="text-xs text-muted-foreground">by {act.user}</p>
                      </div>
                      <span className="text-[10px] bg-secondary px-2 py-0.5 rounded text-muted-foreground whitespace-nowrap">
                        {act.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
