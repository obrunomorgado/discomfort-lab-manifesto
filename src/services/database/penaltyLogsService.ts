
import { DatabasePenaltyLog } from './types';
import { DatabaseStorage } from './storage';

export class PenaltyLogsService {
  private static getLogs(): DatabasePenaltyLog[] {
    const stored = DatabaseStorage.get<DatabasePenaltyLog>(DatabaseStorage.STORAGE_KEYS.PENALTY_LOGS);
    if (stored.length === 0) {
      // Initialize with demo data if empty
      return this.initializeDemoLogs();
    }
    return stored;
  }

  private static saveLogs(logs: DatabasePenaltyLog[]): void {
    DatabaseStorage.set(DatabaseStorage.STORAGE_KEYS.PENALTY_LOGS, logs);
  }

  private static initializeDemoLogs(): DatabasePenaltyLog[] {
    const demoLogs: DatabasePenaltyLog[] = [
      {
        id: 'log_demo_1',
        contract_id: 'contract_demo',
        user_id: DatabaseStorage.getCurrentUserId(),
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
        user_id: DatabaseStorage.getCurrentUserId(),
        amount_charged: 1000,
        currency: 'BRL',
        destination_type: 'fund',
        status: 'pending',
        reason: 'Não completou leitura',
        charged_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    
    this.saveLogs(demoLogs);
    return demoLogs;
  }

  static async insert(log: Omit<DatabasePenaltyLog, 'id' | 'charged_at'>): Promise<DatabasePenaltyLog> {
    const logs = this.getLogs();
    const newLog: DatabasePenaltyLog = {
      id: 'log_' + Date.now(),
      charged_at: new Date().toISOString(),
      ...log
    };
    
    logs.unshift(newLog); // Add to beginning for chronological order
    this.saveLogs(logs);
    return newLog;
  }

  static async getByUser(userId: string): Promise<DatabasePenaltyLog[]> {
    const logs = this.getLogs();
    return logs.filter(log => log.user_id === userId);
  }

  static async updateStatus(id: string, status: DatabasePenaltyLog['status'], confirmedAt?: string): Promise<boolean> {
    const logs = this.getLogs();
    const index = logs.findIndex(l => l.id === id);
    
    if (index === -1) return false;
    
    logs[index].status = status;
    if (confirmedAt) logs[index].confirmed_at = confirmedAt;
    
    this.saveLogs(logs);
    return true;
  }
}
