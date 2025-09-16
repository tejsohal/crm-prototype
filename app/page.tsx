"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { LoginView } from "@/components/auth/LoginView";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { DashboardView } from "@/components/views/DashboardView";
import { ClientsView } from "@/components/views/ClientsView";
import { ClientProfile } from "@/components/views/ClientProfile";
import { ReferralsView } from "@/components/views/ReferralsView";
import { ScheduleView } from "@/components/views/ScheduleView";
import { ReportingView } from "@/components/views/ReportingView";
import { SettingsView } from "@/components/views/SettingsView";
import { ReferralsWizard } from "@/components/wizards/ReferralsWizard";
import { Toast } from "@/components/shared/Toast";


// ---------------- Root Component ----------------
export default function FamilyActionCRMPrototype() {
  const [authed, setAuthed] = useState(false);
  const [view, setView] = useState("dashboard");
  const [showReferral, setShowReferral] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [openClientId, setOpenClientId] = useState<string | null>(null);

  const openWizard = () => setShowReferral(true);
  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Auth guard
  if (!authed) {
    return <LoginView onLogin={() => setAuthed(true)} />;
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-white to-zinc-50 text-zinc-900">
      <div className="flex h-full">
        <Sidebar view={view} setView={setView} />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar onLogout={() => setAuthed(false)} />

          <AnimatePresence mode="wait">
            <motion.div
              key={view + (openClientId || "")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="min-h-[calc(100vh-56px)]"
            >
              {openClientId ? (
                <ClientProfile id={openClientId} onBack={() => setOpenClientId(null)} />
              ) : view === "dashboard" ? (
                <DashboardView openWizard={openWizard} />
              ) : view === "clients" ? (
                <ClientsView
                  onOpenClient={(id) => setOpenClientId(id)}
                  onBook={(name) => {
                    setView("schedule");
                    notify(`Booking started for ${name}`);
                  }}
                />
              ) : view === "referrals" ? (
                <ReferralsView openWizard={openWizard} />
              ) : view === "schedule" ? (
                <ScheduleView onBooked={(slotId) => notify(`Session booked in slot ${slotId}`)} />
              ) : view === "reporting" ? (
                <ReportingView />
              ) : view === "settings" ? (
                <SettingsView />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ReferralsWizard
        open={showReferral}
        onOpenChange={setShowReferral}
        onCreated={(name) => notify(`Referral created for ${name}`)}
      />

      <Toast message={toast} />
    </div>
  );
}
