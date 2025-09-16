import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_SESSIONS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface ScheduleViewProps {
  onBooked: (slotId: string) => void;
}

export function ScheduleView({ onBooked }: ScheduleViewProps) {
  const [slots, setSlots] = useState(MOCK_SESSIONS);

  const book = (id: string) => {
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, client: "Booked" } : s)));
    onBooked(id);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Today · {new Date().toLocaleDateString()}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
      <Card className="rounded-2xl">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-600">
              <tr>
                <th className="text-left font-medium p-3">Time</th>
                <th className="text-left font-medium p-3">Counsellor</th>
                <th className="text-left font-medium p-3">Room</th>
                <th className="text-left font-medium p-3">Client</th>
                <th className="text-right font-medium p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((s) => (
                <tr key={s.id} className="border-t hover:bg-zinc-50">
                  <td className="p-3">
                    {formatDate(s.start)} – {new Date(s.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="p-3">{s.counsellor}</td>
                  <td className="p-3">{s.room}</td>
                  <td className="p-3">{s.client}</td>
                  <td className="p-3 text-right">
                    <Button size="sm" disabled={s.client !== "—"} onClick={() => book(s.id)}>Book</Button>
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
