export interface IAuditLog {
  category: string;
  action: string;
  message: string;
  user: string;
  payload: object | undefined;
}
