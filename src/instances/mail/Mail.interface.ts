export interface IMail {
  sendRegistrationEmail(email: string): Promise<void>;
}
