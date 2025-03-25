import config from '../config/config'
import { Client, Account, ID } from 'appwrite'

export class AuthServices {
    Client = new Client();
    account;

    constructor() {
        try {
            this.Client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectId);
            this.account = new Account(this.Client);
        } catch (error) {
            console.error("Failed to initialize Appwrite client:", error);
        }
    }

    async createAccount({ email, password, name }) {
        try {
            // Generate a valid user ID
            const userId = ID.unique();
            const response = await this.account.create(userId, email, password, name);
            if (response) {
                return this.Login({ email, password });
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async Login({ email, password }) {
        try {
            const session = await this.account.createSession(email, password);
            if (session?.providerAccessToken) {
                localStorage.setItem('jwt', session.providerAccessToken);
            }
            return session;
        } catch (error) {
            throw error;
        }
    }

    async getUserCurrent() {
        try {
            if (!this.account) {
                throw new Error('Appwrite client not initialized');
            }
            const user = await this.account.get();
            return user;
        } catch (error) {
            if (error.code === 401) {
                return null; // Not authenticated
            }
            if (error instanceof TypeError && error.message.includes('NetworkError')) {
                console.error('Network connection issue:', error);
                throw new Error('Unable to connect to the server. Please check your internet connection.');
            }
            console.error("getCurrentUser error:", error);
            return null;
        }
    }

    async Logout() {
        try {
            return await this.account.deleteSession('current');
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
}

const authServicObject = new AuthServices()
export default authServicObject