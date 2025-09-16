import React, { useMemo, useState } from "react";
import { Search, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_CLIENTS } from "@/lib/data";
import { classNames, formatDate, riskBadgeTone } from "@/lib/utils";

interface ClientsViewProps {
  onOpenClient: (id: string) => void;
  onBook: (name: string) => void;
}

export function ClientsView({ onOpenClient, onBook }: ClientsViewProps) {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      MOCK_CLIENTS.filter(
        (c) =>
          c.name.toLowerCase().includes(q.toLowerCase()) ||
          c.id.toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-zinc-600" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search clients…" className="w-72" />
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-44"><SelectValue placeholder="Programme" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="adult">Adult Counselling</SelectItem>
              <SelectItem value="relationship">Relationship Therapy</SelectItem>
              <SelectItem value="yp">Young People</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="waiting">Waiting List</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-600">
              <tr>
                <th className="text-left font-medium p-3">Client</th>
                <th className="text-left font-medium p-3">Programme</th>
                <th className="text-left font-medium p-3">Status</th>
                <th className="text-left font-medium p-3">Risk</th>
                <th className="text-left font-medium p-3">Next appt</th>
                <th className="text-right font-medium p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t hover:bg-zinc-50">
                  <td className="p-3">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-zinc-500">{c.id} · {c.postcode}</div>
                  </td>
                  <td className="p-3">{c.programme}</td>
                  <td className="p-3">{c.status}</td>
                  <td className="p-3">
                    <span className={classNames("inline-flex items-center gap-1 border px-2 py-0.5 rounded-full text-xs", riskBadgeTone(c.riskLevel))}>
                      <ShieldAlert className="h-3 w-3" />{c.riskLevel}
                    </span>
                  </td>
                  <td className="p-3">{formatDate(c.nextAppt)}</td>
                  <td className="p-3 text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => onOpenClient(c.id)}>Open</Button>
                    <Button size="sm" onClick={() => onBook(c.name)}>Book</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
