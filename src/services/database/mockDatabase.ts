
// Main database service that coordinates between different services
import { PenaltyContractsService } from './penaltyContractsService';
import { PenaltyLogsService } from './penaltyLogsService';
import { PaymentMethodsService } from './paymentMethodsService';
import { DatabaseStorage } from './storage';
import type { DatabasePenaltyContract, DatabasePenaltyLog, DatabasePaymentMethod } from './types';

class MockDatabase {
  // Penalty Contracts
  async insertPenaltyContract(contract: Omit<DatabasePenaltyContract, 'id' | 'created_at' | 'user_id'>): Promise<DatabasePenaltyContract> {
    return PenaltyContractsService.insert(contract);
  }

  async updatePenaltyContract(id: string, updates: Partial<DatabasePenaltyContract>): Promise<DatabasePenaltyContract | null> {
    return PenaltyContractsService.update(id, updates);
  }

  async getActivePenaltyContract(userId?: string): Promise<DatabasePenaltyContract | null> {
    return PenaltyContractsService.getActive(userId);
  }

  // Penalty Logs
  async insertPenaltyLog(log: Omit<DatabasePenaltyLog, 'id' | 'charged_at'>): Promise<DatabasePenaltyLog> {
    return PenaltyLogsService.insert(log);
  }

  async getPenaltyLogsByUser(userId: string): Promise<DatabasePenaltyLog[]> {
    return PenaltyLogsService.getByUser(userId);
  }

  async updatePenaltyLogStatus(id: string, status: DatabasePenaltyLog['status'], confirmedAt?: string): Promise<boolean> {
    return PenaltyLogsService.updateStatus(id, status, confirmedAt);
  }

  // Payment Methods
  async insertPaymentMethod(method: Omit<DatabasePaymentMethod, 'id' | 'created_at' | 'user_id'>): Promise<DatabasePaymentMethod> {
    return PaymentMethodsService.insert(method);
  }

  async getPaymentMethodsByUser(userId: string): Promise<DatabasePaymentMethod[]> {
    return PaymentMethodsService.getByUser(userId);
  }

  async deletePaymentMethod(id: string): Promise<boolean> {
    return PaymentMethodsService.delete(id);
  }

  // Utility methods
  async clearAllData(): Promise<void> {
    DatabaseStorage.clearAll();
  }

  async seedDemoData(): Promise<void> {
    await this.clearAllData();
    // Re-initialize penalty logs (which creates demo data)
    await this.getPenaltyLogsByUser('current-user');
    console.log('Mock database seeded with demo data');
  }
}

export const mockDatabase = new MockDatabase();
