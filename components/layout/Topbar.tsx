import React from "react";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  onLogout: () => void;
}

export function Topbar({ onLogout }: TopbarProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b bg-white/70 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Search className="w-4 h-4 text-zinc-600" />
        <Input placeholder="Search clients, cases, notes…" className="w-80" />
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="rounded-full">Today</Button>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="Notifications">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="outline" size="sm" className="rounded-full" onClick={onLogout}>
          Logout
        </Button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-900" />
      </div>
    </div>
  );
}
