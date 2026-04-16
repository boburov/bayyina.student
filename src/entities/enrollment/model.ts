export interface EnrollmentGroup {
  _id: string;
  name: string;
  price: number;
  description?: string;
  schedule?: {
    days: string[];
    time: string;
  };
  room?: string;
  teacher?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export interface Enrollment {
  _id: string;
  group: EnrollmentGroup;
  status: 'active' | 'completed' | 'dropped';
  enrolledAt: string;
  monthlyFee: number;
  discount: number;
  discountReason?: string | null;
  paymentDay?: number;
  lastPaymentDate?: string | null;
  nextPaymentDate?: string | null;
  debt: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}
