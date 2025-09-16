import React from "react";
import { ShieldAlert, FileText, ArrowLeft } from "lucide-react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { MOCK_CLIENTS } from "@/lib/data";
import { classNames, formatDate, riskBadgeTone } from "@/lib/utils";

interface ClientProfileProps {
  id: string;
  onBack: () => void
}

export function ClientProfile({ id, onBack }: ClientProfileProps) {
  const client = MOCK_CLIENTS.find((c) => c.id === id)!;
  return (
    <div className="p-6 spae-y-4">
      <Button variant="outline" onClick={onBack} className="mb-4 flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to clients
      </Button>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">{client.name}</h2>
          <div className="text-sm text-zinc-600">
            {client.id} · DoB {client.dob} · {client.email} · {client.phone}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{client.programme}</Badge>
          <span className={classNames("inline-flex items-center gap-1 border px-2 py-0.5 rounded-full text-xs", riskBadgeTone(client.riskLevel))}>
            <ShieldAlert className="h-3 w-3" />{client.riskLevel} risk
          </span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-3">
          <Card className="rounded-2xl">
            <CardHeader><CardTitle>Key details</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div><div className="text-zinc-500">Status</div><div>{client.status}</div></div>
              <div><div className="text-zinc-500">Next appointment</div><div>{formatDate(client.nextAppt)}</div></div>
              <div><div className="text-zinc-500">Postcode</div><div>{client.postcode}</div></div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader><CardTitle>Safeguarding</CardTitle></CardHeader>
            <CardContent className="text-sm">
              <p>No open safeguarding incidents recorded. Use <em>Notes → Safeguarding</em> to add concerns. Access is audited.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cases">
          <Card className="rounded-2xl">
            <CardHeader><CardTitle>Open case</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex items-center gap-2"><FileText className="w-4 h-4" /> Case #FA-2025-0142 · Presenting issue: Anxiety · Entitlement: Self-funded</div>
              <Button variant="outline" size="sm">View full case file</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sessions">
          <Card className="rounded-2xl">
            <CardHeader><CardTitle>Recent sessions</CardTitle></CardHeader>
            <CardContent className="text-sm">
              <ul className="list-disc pl-5 space-y-1">
                <li>2025-09-04 10:30 · Dr. Evans · Attended</li>
                <li>2025-08-28 10:30 · Dr. Evans · Attended</li>
                <li>2025-08-21 10:30 · Dr. Evans · DNA</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes">
          <Card className="rounded-2xl">
            <CardHeader><CardTitle>Clinical notes</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Label htmlFor="note">Add a note</Label>
              <Textarea id="note" placeholder="Write a structured note… (SOAP format)" />
              <div className="flex items-center justify-between">
                <div className="text-xs text-zinc-500">Notes are time-stamped and read-only once saved.</div>
                <Button size="sm">Save note</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card className="rounded-2xl">
            <CardHeader><CardTitle>Documents</CardTitle></CardHeader>
            <CardContent className="text-sm">
              <p>Upload consent forms, assessments, and letters. Files are encrypted at rest.</p>
              <div className="flex items-center gap-2 mt-2">
                <Input type="file" className="max-w-xs" />
                <Button variant="outline">Upload</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
