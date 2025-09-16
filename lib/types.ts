export interface Client {
  id: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  programme: string;
  status: string;
  riskLevel: "Low" | "Medium" | "High";
  nextAppt: string | null;
  postcode: string;
}

export interface Session {
  id: string;
  counsellor: string;
  client: string;
  start: string;
  end: string;
  room: string;
}

export interface KpiData {
  name: string;
  referrals: number;
  sessions: number;
  dnas: number;
}

export interface ReferralForm {
  firstName?: string;
  lastName?: string;
  dob?: string;
  postcode?: string;
  programme?: string;
  issue?: string;
  entitlement?: string;
  availability?: string;
  consent: boolean;
  share?: boolean;
  risk: "Low" | "Medium" | "High";
  riskNotes?: string;
}
