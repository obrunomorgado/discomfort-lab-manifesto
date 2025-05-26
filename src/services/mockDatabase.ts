
// Mock database service to simulate Supabase tables locally
export interface DatabasePenaltyContract {
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
  created_at: string;
  last_check_date?: string;
  consecutive_failures: number;
}

export interface DatabasePenaltyLog {
  id: string;
  contract_id: string;
  user_id: string;
  amount_charged: number;
  currency: 'BRL';
  destination_type: 'fund' | 'ngo' | 'friend';
  stripe_payment_intent_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  reason: string;
  charged_at: string;
  confirmed_at?: string;
}

export interface DatabasePaymentMethod {
  id: string;
  user_id: string;
  stripe_payment_method_id: string;
  type: 'card' | 'pix';
  last_four?: string;
  brand?: string;
  is_default: boolean;
  created_at: string;
}

class MockDatabase {
  private readonly STORAGE_KEYS = {
    PENALTY_CONTRACTS: 'mock_penalty_contracts',
    PENALTY_LOGS: 'mock_penalty_logs',
    PAYMENT_METHODS: 'mock_payment_methods'
  };

  private getCurrentUserId(): string {
    return 'mock-user-' + Math.random().toString(36).substring(2, 8);
  }

  // Penalty Contracts Table
  async insertPenaltyContract(contract: Omit<DatabasePenaltyContract, 'id' | 'created_at' | 'user_id'>): Promise<DatabasePenaltyContract> {
    const contracts = this.getPenaltyContracts();
    const newContract: DatabasePenaltyContract = {
      id: 'contract_' + Date.now(),
      user_id: this.getCurrentUserId(),
      created_at: new Date().toISOString(),
      ...contract
    };
    
    contracts.push(newContract);
    localStorage.setItem(this.STORAGE_KEYS.PENALTY_CONTRACTS, JSON.stringify(contracts));
    return newContract;
  }

  async updatePenaltyContract(id: string, updates: Partial<DatabasePenaltyContract>): Promise<DatabasePenaltyContract | null> {
    const contracts = this.getPenaltyContracts();
    const index = contracts.findIndex(c => c.id === id);
    
    if (index === -1) return null;
    
    contracts[index] = { ...contracts[index], ...updates };
    localStorage.setItem(this.STORAGE_KEYS.PENALTY_CONTRACTS, JSON.stringify(contracts));
    return contracts[index];
  }

  async getActivePenaltyContract(userId?: string): Promise<DatabasePenaltyContract | null> {
    const contracts = this.getPenaltyContracts();
    return contracts.find(c => c.is_active && (!userId || c.user_id === userId)) || null;
  }

  private getPenaltyContracts(): DatabasePenaltyContract[] {
    const stored = localStorage.getItem(this.STORAGE_KEYS.PENALTY_CONTRACTS);
    return stored ? JSON.parse(stored) : [];
  }

  // Penalty Logs Table
  async insertPenaltyLog(log: Omit<DatabasePenaltyLog, 'id' | 'charged_at'>): Promise<DatabasePenaltyLog> {
    const logs = this.getPenaltyLogs();
    const newLog: DatabasePenaltyLog = {
      id: 'log_' + Date.now(),
      charged_at: new Date().toISOString(),
      ...log
    };
    
    logs.unshift(newLog); // Add to beginning for chronological order
    localStorage.setItem(this.STORAGE_KEYS.PENALTY_LOGS, JSON.stringify(logs));
    return newLog;
  }

  async getPenaltyLogsByUser(userId: string): Promise<DatabasePenaltyLog[]> {
    const logs = this.getPenaltyLogs();
    return logs.filter(log => log.user_id === userId);
  }

  async updatePenaltyLogStatus(id: string, status: DatabasePenaltyLog['status'], confirmedAt?: string): Promise<boolean> {
    const logs = this.getPenaltyLogs();
    const index = logs.findIndex(l => l.id === id);
    
    if (index === -1) return false;
    
    logs[index].status = status;
    if (confirmedAt) logs[index].confirmed_at = confirmedAt;
    
    localStorage.setItem(this.STORAGE_KEYS.PENALTY_LOGS, JSON.stringify(logs));
    return true;
  }

  private getPenaltyLogs(): DatabasePenaltyLog[] {
    const stored = localStorage.getItem(this.STORAGE_KEYS.PENALTY_LOGS);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Initialize with some demo data
    const demoLogs: DatabasePenaltyLog[] = [
      {
        id: 'log_demo_1',
        contract_id: 'contract_demo',
        user_id: this.getCurrentUserId(),
        amount_charged: 1000,
        currency: 'BRL',
        destination_type: 'ngo',
        status: 'completed',
        reason: 'Falhou no exercício diário',
        charged_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        confirmed_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'log_demo_2',
        contract_id: 'contract_demo',
        user_id: this.getCurrentUserId(),
        amount_charged: 1000,
        currency: 'BRL',
        destination_type: 'fund',
        status: 'pending',
        reason: 'Não completou leitura',
        charged_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    
    localStorage.setItem(this.STORAGE_KEYS.PENALTY_LOGS, JSON.stringify(demoLogs));
    return demoLogs;
  }

  // Payment Methods Table
  async insertPaymentMethod(method: Omit<DatabasePaymentMethod, 'id' | 'created_at' | 'user_id'>): Promise<DatabasePaymentMethod> {
    const methods = this.getPaymentMethods();
    const newMethod: DatabasePaymentMethod = {
      id: 'pm_' + Date.now(),
      user_id: this.getCurrentUserId(),
      created_at: new Date().toISOString(),
      ...method
    };
    
    methods.push(newMethod);
    localStorage.setItem(this.STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(methods));
    return newMethod;
  }

  async getPaymentMethodsByUser(userId: string): Promise<DatabasePaymentMethod[]> {
    const methods = this.getPaymentMethods();
    return methods.filter(method => method.user_id === userId);
  }

  async deletePaymentMethod(id: string): Promise<boolean> {
    const methods = this.getPaymentMethods();
    const filteredMethods = methods.filter(method => method.id !== id);
    
    if (filteredMethods.length === methods.length) return false;
    
    localStorage.setItem(this.STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(filteredMethods));
    return true;
  }

  private getPaymentMethods(): DatabasePaymentMethod[] {
    const stored = localStorage.getItem(this.STORAGE_KEYS.PAYMENT_METHODS);
    return stored ? JSON.parse(stored) : [];
  }

  // Utility methods
  async clearAllData(): Promise<void> {
    Object.values(this.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  async seedDemoData(): Promise<void> {
    // Clear existing data
    await this.clearAllData();
    
    // Re-initialize penalty logs (which creates demo data)
    this.getPenaltyLogs();
    
    console.log('Mock database seeded with demo data');
  }
}

export const mockDatabase = new MockDatabase();
