
import { DatabasePenaltyContract } from './types';
import { DatabaseStorage } from './storage';

export class PenaltyContractsService {
  private static getContracts(): DatabasePenaltyContract[] {
    return DatabaseStorage.get<DatabasePenaltyContract>(DatabaseStorage.STORAGE_KEYS.PENALTY_CONTRACTS);
  }

  private static saveContracts(contracts: DatabasePenaltyContract[]): void {
    DatabaseStorage.set(DatabaseStorage.STORAGE_KEYS.PENALTY_CONTRACTS, contracts);
  }

  static async insert(contract: Omit<DatabasePenaltyContract, 'id' | 'created_at' | 'user_id'>): Promise<DatabasePenaltyContract> {
    const contracts = this.getContracts();
    const newContract: DatabasePenaltyContract = {
      id: 'contract_' + Date.now(),
      user_id: DatabaseStorage.getCurrentUserId(),
      created_at: new Date().toISOString(),
      ...contract
    };
    
    contracts.push(newContract);
    this.saveContracts(contracts);
    return newContract;
  }

  static async update(id: string, updates: Partial<DatabasePenaltyContract>): Promise<DatabasePenaltyContract | null> {
    const contracts = this.getContracts();
    const index = contracts.findIndex(c => c.id === id);
    
    if (index === -1) return null;
    
    contracts[index] = { ...contracts[index], ...updates };
    this.saveContracts(contracts);
    return contracts[index];
  }

  static async getActive(userId?: string): Promise<DatabasePenaltyContract | null> {
    const contracts = this.getContracts();
    return contracts.find(c => c.is_active && (!userId || c.user_id === userId)) || null;
  }
}
