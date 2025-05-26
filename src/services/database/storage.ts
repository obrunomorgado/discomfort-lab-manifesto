
// Storage utility for localStorage operations
export class DatabaseStorage {
  static readonly STORAGE_KEYS = {
    PENALTY_CONTRACTS: 'mock_penalty_contracts',
    PENALTY_LOGS: 'mock_penalty_logs',
    PAYMENT_METHODS: 'mock_payment_methods'
  };

  static get<T>(key: string): T[] {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }

  static set<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static clear(key: string): void {
    localStorage.removeItem(key);
  }

  static clearAll(): void {
    Object.values(this.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  static getCurrentUserId(): string {
    return 'mock-user-' + Math.random().toString(36).substring(2, 8);
  }
}
