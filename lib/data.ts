import { Client, Session, KpiData } from './types';

export const MOCK_CLIENTS: Client[] = [
  {
    id: "C-1001",
    name: "Amelia Khan",
    dob: "1990-04-12",
    phone: "07400 111111",
    email: "amelia.khan@example.org",
    programme: "Adult Counselling",
    status: "Active",
    riskLevel: "Medium",
    nextAppt: "2025-09-12T10:30:00Z",
    postcode: "UB10 0QQ",
  },
  {
    id: "C-1002",
    name: "James Osei",
    dob: "1985-11-03",
    phone: "07400 222222",
    email: "james.osei@example.org",
    programme: "Relationship Therapy",
    status: "Waiting List",
    riskLevel: "Low",
    nextAppt: null,
    postcode: "W13 9AB",
  },
  {
    id: "C-1003",
    name: "Priya Patel",
    dob: "2002-07-22",
    phone: "07400 333333",
    email: "priya.patel@example.org",
    programme: "Young People",
    status: "Active",
    riskLevel: "High",
    nextAppt: "2025-09-11T15:00:00Z",
    postcode: "SW6 1AA",
  },
];

export const MOCK_SESSIONS: Session[] = [
  { id: "S-1", counsellor: "Dr. Evans", client: "Amelia Khan", start: "2025-09-11T09:00:00Z", end: "2025-09-11T09:50:00Z", room: "R1" },
  { id: "S-2", counsellor: "Dr. Evans", client: "—", start: "2025-09-11T10:00:00Z", end: "2025-09-11T10:50:00Z", room: "R1" },
  { id: "S-3", counsellor: "M. Green", client: "Priya Patel", start: "2025-09-11T11:00:00Z", end: "2025-09-11T11:50:00Z", room: "R2" },
  { id: "S-4", counsellor: "M. Green", client: "—", start: "2025-09-11T12:00:00Z", end: "2025-09-11T12:50:00Z", room: "R2" },
];

export const KPI_DATA: KpiData[] = [
  { name: "Mon", referrals: 7, sessions: 22, dnas: 2 },
  { name: "Tue", referrals: 9, sessions: 24, dnas: 1 },
  { name: "Wed", referrals: 5, sessions: 19, dnas: 3 },
  { name: "Thu", referrals: 11, sessions: 27, dnas: 2 },
  { name: "Fri", referrals: 4, sessions: 15, dnas: 1 },
];
