import { DatabasePenaltyContract, DatabasePenaltyLog } from './types';
import { DatabaseStorage } from './storage';
import { PenaltyContract, PenaltyLog } from '@/types/penalty';

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

// Helper functions to convert between database and domain types
const convertToDomainContract = (dbContract: DatabasePenaltyContract): PenaltyContract => ({
  ...dbContract,
  created_at: new Date(dbContract.created_at),
  last_check_date: dbContract.last_check_date ? new Date(dbContract.last_check_date) : undefined
});

const convertToDomainLog = (dbLog: DatabasePenaltyLog): PenaltyLog => ({
  ...dbLog,
  charged_at: new Date(dbLog.charged_at),
  confirmed_at: dbLog.confirmed_at ? new Date(dbLog.confirmed_at) : undefined
});

// Export the functions expected by usePenaltyContract
export const createPenaltyContract = async (contractData: Omit<PenaltyContract, 'id' | 'created_at' | 'consecutive_failures'>): Promise<PenaltyContract> => {
  const dbContract = await PenaltyContractsService.insert({
    ...contractData,
    last_check_date: contractData.last_check_date?.toISOString(),
    consecutive_failures: 0
  });
  return convertToDomainContract(dbContract);
};

export const updatePenaltyContract = async (id: string, updates: Partial<PenaltyContract>): Promise<PenaltyContract | null> => {
  const dbUpdates: Partial<DatabasePenaltyContract> = {
    ...updates,
    // Convert Date objects to strings for database storage
    last_check_date: updates.last_check_date?.toISOString(),
    created_at: typeof updates.created_at === 'string' ? updates.created_at : updates.created_at?.toISOString()
  };
  const dbContract = await PenaltyContractsService.update(id, dbUpdates);
  return dbContract ? convertToDomainContract(dbContract) : null;
};

export const getPenaltyContractByUserId = async (userId: string): Promise<PenaltyContract | null> => {
  const dbContract = await PenaltyContractsService.getActive(userId);
  return dbContract ? convertToDomainContract(dbContract) : null;
};

export const createPenaltyLog = async (logData: Omit<PenaltyLog, 'id' | 'charged_at'>): Promise<PenaltyLog> => {
  // This should use PenaltyLogsService when it's available
  const dbLog: DatabasePenaltyLog = {
    id: 'log_' + Date.now(),
    charged_at: new Date().toISOString(),
    confirmed_at: logData.confirmed_at 
      ? (typeof logData.confirmed_at === 'string' ? logData.confirmed_at : logData.confirmed_at.toISOString())
      : undefined,
    contract_id: logData.contract_id,
    user_id: logData.user_id,
    amount_charged: logData.amount_charged,
    currency: logData.currency,
    destination_type: logData.destination_type,
    stripe_payment_intent_id: logData.stripe_payment_intent_id,
    status: logData.status,
    reason: logData.reason
  };
  
  const logs = DatabaseStorage.get<DatabasePenaltyLog>('penalty_logs');
  logs.push(dbLog);
  DatabaseStorage.set('penalty_logs', logs);
  
  return convertToDomainLog(dbLog);
};

export const getPenaltyLogsByUserId = async (userId: string): Promise<PenaltyLog[]> => {
  const logs = DatabaseStorage.get<DatabasePenaltyLog>('penalty_logs');
  return logs
    .filter(log => log.user_id === userId)
    .map(convertToDomainLog);
};
