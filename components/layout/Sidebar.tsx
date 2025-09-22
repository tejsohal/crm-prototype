import React from "react";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  ClipboardList,
  PieChart,
  Settings,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { classNames } from "@/lib/utils";

interface SidebarProps {
  view: string;
  setView: (v: string) => void;
}

export function Sidebar({ view, setView }: SidebarProps) {
  const items = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { key: "clients", label: "Clients", icon: <Users className="w-5 h-5" /> },
    { key: "referrals", label: "Referrals", icon: <ClipboardList className="w-5 h-5" /> },
    { key: "schedule", label: "Schedule", icon: <CalendarDays className="w-5 h-5" /> },
    { key: "reporting", label: "Reporting", icon: <PieChart className="w-5 h-5" /> },
    { key: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 shrink-0 border-r bg-white/90 backdrop-blur-sm">
      <div className="px-5 py-4 border-b">
        <div className="text-xl font-semibold">Family Action</div>
        <div className="text-xs text-muted-foreground">CRM Prototype</div>
      </div>
      <nav className="p-3 space-y-1">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => setView(it.key)}
            className={classNames(
              "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition",
              view === it.key ? "bg-[#8e51ff] text-white shadow" : "hover:bg-zinc-100"
            )}
          >
            {it.icon}
            <span>{it.label}</span>
          </button>
        ))}
      </nav>
      <div className="px-3 pt-4">
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-center" onClick={() => setView("referrals")}>
              <Plus className="mr-2 h-4 w-4" /> New referral
            </Button>
            <Button variant="outline" className="w-full justify-center" onClick={() => setView("schedule")}>
              Book session
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
