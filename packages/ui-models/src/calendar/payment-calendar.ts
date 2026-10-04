export interface PaymentCalendarItemDto {
  loanId: string;
  quotaId: string;
  dueDate: string;
  amountDue: number;
  customerId: string;
  customerName: string;
  customerDocument: string;
  isOverdue: boolean;
}

/** `yyyy-MM-ddTHH:mm:ss` in the device's local time: the format the calendar endpoint expects. */
export function toLocalDateTimeString(date: Date): string {
  const pad = (value: number): string => String(value).padStart(2, '0');
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}
