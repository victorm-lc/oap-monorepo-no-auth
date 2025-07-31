import {
  AuthProvider,
  AuthCredentials,
  AuthError,
  Session,
  User,
  AuthStateChangeCallback,
  AuthProviderOptions,
} from "./types";

export class NoAuthProvider implements AuthProvider {
  private options: AuthProviderOptions;
  private mockUser: User;
  private mockSession: Session;
  private listeners: AuthStateChangeCallback[] = [];

  constructor(options: AuthProviderOptions = {}) {
    this.options = {
      shouldPersistSession: true,
      ...options,
    };

    // Create a mock user for internal use
    this.mockUser = {
      id: "internal-user-id",
      email: "internal@company.com",
      displayName: "Internal User",
      firstName: "Internal",
      lastName: "User",
      companyName: "Internal Company",
      avatarUrl: null,
      metadata: {},
    };

    // Create a mock session
    this.mockSession = {
      user: this.mockUser,
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    };
  }

  async signUp(credentials: AuthCredentials) {
    // Always return success with mock user/session
    return {
      user: this.mockUser,
      session: this.mockSession,
      error: null,
    };
  }

  async signIn(credentials: AuthCredentials) {
    // Always return success with mock user/session
    return {
      user: this.mockUser,
      session: this.mockSession,
      error: null,
    };
  }

  async signInWithGoogle() {
    // Always return success with mock user/session
    return {
      user: this.mockUser,
      session: this.mockSession,
      error: null,
    };
  }

  async signOut() {
    // Sign out doesn't actually do anything in no-auth mode
    // User remains "logged in"
    return { error: null };
  }

  async getSession() {
    // Always return the mock session
    return this.mockSession;
  }

  async refreshSession() {
    // Return the same mock session with updated expiry
    this.mockSession.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    return this.mockSession;
  }

  async getCurrentUser() {
    // Always return the mock user
    return this.mockUser;
  }

  async updateUser(attributes: Partial<User>) {
    // Update the mock user with provided attributes
    this.mockUser = {
      ...this.mockUser,
      ...attributes,
    };

    // Update the session user as well
    this.mockSession.user = this.mockUser;

    // Notify listeners of the change
    this.listeners.forEach((callback) => callback(this.mockSession));

    return {
      user: this.mockUser,
      error: null,
    };
  }

  async resetPassword(email: string) {
    // Always return success (no actual password reset)
    return { error: null };
  }

  async updatePassword(newPassword: string) {
    // Always return success (no actual password update)
    return { error: null };
  }

  onAuthStateChange(callback: AuthStateChangeCallback) {
    // Add the callback to our listeners
    this.listeners.push(callback);

    // Immediately call the callback with the current session
    callback(this.mockSession);

    return {
      unsubscribe: () => {
        const index = this.listeners.indexOf(callback);
        if (index > -1) {
          this.listeners.splice(index, 1);
        }
      },
    };
  }
}