export interface Payment {
  _id: string;
  enrollment: {
    _id: string;
    group: string;
    status: string;
  };
  student: {
    _id: string;
    firstName: string;
    lastName: string;
    phone: number;
  };
  amount: number;
  month: string;
  status: 'paid' | 'pending' | 'overdue';
  paidAt?: string | null;
  note?: string | null;
  createdBy?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}
