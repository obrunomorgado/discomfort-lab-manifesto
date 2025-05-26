
export interface PenaltyContract {
  id: string;
  user_id: string;
  daily_task: string;
  penalty_amount: number;
  currency: 'BRL';
  destination_type: 'fund' | 'ngo' | 'friend';
  destination_details?: {
    ngo_name?: string;
    ngo_pix?: string;
    friend_name?: string;
    friend_phone?: string;
  };
  stripe_setup_intent_id?: string;
  stripe_payment_method_id?: string;
  is_active: boolean;
  created_at: Date;
  last_check_date?: Date;
  consecutive_failures: number;
}

export interface PenaltyLog {
  id: string;
  contract_id: string;
  user_id: string;
  amount_charged: number;
  currency: 'BRL';
  destination_type: 'fund' | 'ngo' | 'friend';
  stripe_payment_intent_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  reason: string;
  charged_at: Date;
  confirmed_at?: Date;
}

export interface PaymentMethod {
  id: string;
  user_id: string;
  stripe_payment_method_id: string;
  type: 'card' | 'pix';
  last_four?: string;
  brand?: string;
  is_default: boolean;
  created_at: Date;
}
