
import { DatabasePaymentMethod } from './types';
import { DatabaseStorage } from './storage';

export class PaymentMethodsService {
  private static getMethods(): DatabasePaymentMethod[] {
    return DatabaseStorage.get<DatabasePaymentMethod>(DatabaseStorage.STORAGE_KEYS.PAYMENT_METHODS);
  }

  private static saveMethods(methods: DatabasePaymentMethod[]): void {
    DatabaseStorage.set(DatabaseStorage.STORAGE_KEYS.PAYMENT_METHODS, methods);
  }

  static async insert(method: Omit<DatabasePaymentMethod, 'id' | 'created_at' | 'user_id'>): Promise<DatabasePaymentMethod> {
    const methods = this.getMethods();
    const newMethod: DatabasePaymentMethod = {
      id: 'pm_' + Date.now(),
      user_id: DatabaseStorage.getCurrentUserId(),
      created_at: new Date().toISOString(),
      ...method
    };
    
    methods.push(newMethod);
    this.saveMethods(methods);
    return newMethod;
  }

  static async getByUser(userId: string): Promise<DatabasePaymentMethod[]> {
    const methods = this.getMethods();
    return methods.filter(method => method.user_id === userId);
  }

  static async delete(id: string): Promise<boolean> {
    const methods = this.getMethods();
    const filteredMethods = methods.filter(method => method.id !== id);
    
    if (filteredMethods.length === methods.length) return false;
    
    this.saveMethods(filteredMethods);
    return true;
  }
}
