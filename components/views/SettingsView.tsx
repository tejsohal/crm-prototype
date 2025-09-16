import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SettingsView() {
  return (
    <div className="p-6 space-y-4">
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Access & Security</CardTitle></CardHeader>
        <CardContent className="text-sm space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Authentication</Label>
              <p className="text-zinc-600">OIDC with Azure AD (MFA, conditional access). Session timeout: 30m.</p>
            </div>
            <div>
              <Label>Data residency</Label>
              <p className="text-zinc-600">Primary: London (eu-west-2). Backups: EU cross-region.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Clinical settings</CardTitle></CardHeader>
        <CardContent className="text-sm space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label>Session length</Label>
              <Input placeholder="50" />
            </div>
            <div>
              <Label>DNA threshold (%)</Label>
              <Input placeholder="20" />
            </div>
            <div>
              <Label>Supervision ratio</Label>
              <Input placeholder="1:6" />
            </div>
          </div>
          <Button className="mt-2">Save changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
