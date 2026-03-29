import { randomUUID } from 'crypto';
import { User } from '../types';

class UserManager {
  private users = new Map<string, User>();

  createOrLogin(name: string, password: string): User {
    const existing = Array.from(this.users.values()).find(
      (u) => u.name === name,
    );

    if (existing) {
      if (existing.password !== password) {
        throw new Error('Invalid password');
      }
      return existing;
    }

    const user: User = {
      index: randomUUID(),
      name,
      password,
    };

    this.users.set(user.index, user);

    console.log('User registered:', user);

    return user;
  }
}

export const userManager = new UserManager();
