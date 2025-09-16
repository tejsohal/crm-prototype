import React from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReferralsViewProps {
  openWizard: () => void;
}

export function ReferralsView({ openWizard }: ReferralsViewProps) {
  return (
    <div className="p-6">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Referrals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-zinc-600">
            Create and track referrals. New referrals open a case and can auto-book an initial assessment slot.
          </p>
          <Button onClick={openWizard}><Plus className="mr-2 h-4 w-4" />New referral</Button>
        </CardContent>
      </Card>
    </div>
  );
}
