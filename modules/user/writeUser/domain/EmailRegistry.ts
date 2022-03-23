export class EmailRegistry {
  private emailAddressesByUser = new Map();

  // used by projection
  setUserEmailAddress(userId: string, emailAddress: string) {
    if (!this.isEmailAvailable(emailAddress)) throw new Error("e-mail in use");
    this.emailAddressesByUser.set(userId, emailAddress);
  }

  // used by domain
  isEmailAvailable(emailAddress: string) {
    const usedEmailAddresses = Array.from(this.emailAddressesByUser.values());
    return !usedEmailAddresses.some((usedEmailAddress) =>
      usedEmailAddress.equals(emailAddress)
    );
  }
}
