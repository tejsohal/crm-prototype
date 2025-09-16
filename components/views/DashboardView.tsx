import React from "react";
import { ClipboardList, CalendarDays, Clock, ShieldAlert, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/shared/KpiCard";
import { KPI_DATA } from "@/lib/data";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface DashboardViewProps {
  openWizard: () => void;
}

export function DashboardView({ openWizard }: DashboardViewProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="New referrals (7d)" value="36" icon={<ClipboardList className="h-5 w-5 text-zinc-500" />} />
        <KpiCard title="Sessions today" value="23" icon={<CalendarDays className="h-5 w-5 text-zinc-500" />} />
        <KpiCard title="Capacity (next 7d)" value="82%" icon={<Clock className="h-5 w-5 text-zinc-500" />} />
        <KpiCard title="High-risk active" value="8" icon={<ShieldAlert className="h-5 w-5 text-rose-500" />} />
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Week at a glance</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={KPI_DATA} margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sessions" />
              <Line type="monotone" dataKey="referrals" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={openWizard}><Plus className="mr-2 h-4 w-4" />Create referral</Button>
        <Button variant="outline">Record supervision note</Button>
        <Button variant="outline">Export weekly KPIs</Button>
      </div>
    </div>
  );
}
