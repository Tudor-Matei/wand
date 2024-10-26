export type SessionsSchema = {
  session_id: string;
  expires: number;
  data: string;
}[];
