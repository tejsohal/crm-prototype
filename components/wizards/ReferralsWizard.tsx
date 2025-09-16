import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { classNames } from "@/lib/utils";
import { ReferralForm } from "@/lib/types";

interface ReferralsWizardProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated: (clientName: string) => void;
}

export function ReferralsWizard({
  open,
  onOpenChange,
  onCreated,
}: ReferralsWizardProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ReferralForm>({ consent: false, risk: "Low" });

  const steps = [
    {
      title: "Client details",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label>First name</Label>
            <Input
              value={form.firstName || ""}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </div>
          <div>
            <Label>Last name</Label>
            <Input
              value={form.lastName || ""}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>
          <div>
            <Label>Date of birth</Label>
            <Input
              type="date"
              value={form.dob || ""}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
          </div>
          <div>
            <Label>Postcode</Label>
            <Input
              value={form.postcode || ""}
              onChange={(e) => setForm({ ...form, postcode: e.target.value })}
            />
          </div>
          <div>
            <Label>Programme</Label>
            <Select onValueChange={(v) => setForm({ ...form, programme: v })}>
              <SelectTrigger><SelectValue placeholder="Select programme" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Adult Counselling">Adult Counselling</SelectItem>
                <SelectItem value="Relationship Therapy">Relationship Therapy</SelectItem>
                <SelectItem value="Young People">Young People</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      title: "Presenting issue",
      content: (
        <div className="space-y-3">
          <Label>Summary</Label>
          <Textarea
            placeholder="Brief description of the presenting issue"
            value={form.issue || ""}
            onChange={(e) => setForm({ ...form, issue: e.target.value })}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Entitlement</Label>
              <Select onValueChange={(v) => setForm({ ...form, entitlement: v })}>
                <SelectTrigger><SelectValue placeholder="Select entitlement" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Self-funded">Self-funded</SelectItem>
                  <SelectItem value="Commissioned">Commissioned</SelectItem>
                  <SelectItem value="Concession">Concession</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Preferred availability</Label>
              <Input
                placeholder="e.g. Wed 10:00–12:00"
                value={form.availability || ""}
                onChange={(e) => setForm({ ...form, availability: e.target.value })}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Consent & privacy",
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <input
              id="consent"
              type="checkbox"
              className="mt-1"
              checked={!!form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            />
            <Label htmlFor="consent">I confirm informed consent has been explained and granted.</Label>
          </div>
          <div className="flex items-start gap-2">
            <input
              id="share"
              type="checkbox"
              className="mt-1"
              checked={!!form.share}
              onChange={(e) => setForm({ ...form, share: e.target.checked })}
            />
            <Label htmlFor="share">Allow secure sharing of summary with GP/commissioner (optional)</Label>
          </div>
        </div>
      ),
    },
    {
      title: "Safeguarding & risk",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label>Risk level</Label>
            <Select onValueChange={(v) => setForm({ ...form, risk: v as "Low" | "Medium" | "High" })}>
              <SelectTrigger><SelectValue placeholder="Select risk" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label>Notes</Label>
            <Textarea
              placeholder="Any safeguarding concerns or accommodations"
              value={form.riskNotes || ""}
              onChange={(e) => setForm({ ...form, riskNotes: e.target.value })}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Summary",
      content: (
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><div className="text-zinc-500">Client</div><div>{form.firstName} {form.lastName}</div></div>
            <div><div className="text-zinc-500">Programme</div><div>{form.programme || "—"}</div></div>
            <div><div className="text-zinc-500">Entitlement</div><div>{form.entitlement || "—"}</div></div>
            <div><div className="text-zinc-500">Risk</div><div>{form.risk}</div></div>
          </div>
          <div>
            <div className="text-zinc-500">Issue</div>
            <div className="mt-1 whitespace-pre-line">{form.issue || "—"}</div>
          </div>
        </div>
      ),
    },
  ];

  const canContinue = () => {
    if (step === 0) return form.firstName && form.lastName && form.programme;
    if (step === 2) return !!form.consent; // consent required
    return true;
  };

  const submit = () => {
    const name = `${form.firstName || ""} ${form.lastName || ""}`.trim();
    onOpenChange(false);
    onCreated(name || "New client");
    setTimeout(() => {
      setStep(0);
      setForm({ consent: false, risk: "Low" });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>New referral</DialogTitle>
          <DialogDescription>Capture essential info to open a case. All changes are autosaved.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between text-sm">
          <div className="font-medium">Step {step + 1} of {steps.length} · {steps[step].title}</div>
          <div className="flex items-center gap-2">
            {[...Array(steps.length)].map((_, i) => (
              <div key={i} className={classNames("h-1.5 w-8 rounded-full", i <= step ? "bg-zinc-900" : "bg-zinc-200")} />
            ))}
          </div>
        </div>
        <div className="mt-2">{steps[step].content}</div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          {step > 0 && (
            <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>
          )}
          {step < steps.length - 1 ? (
            <Button disabled={!canContinue()} onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={submit}><CheckCircle2 className="mr-2 h-4 w-4" />Create referral</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
