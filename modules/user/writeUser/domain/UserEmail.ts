import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { EmailRegExp } from "../../../shared/util/RegularExpressions";

export type UserEmailProps = {
  email: string;
};

export class UserEmail extends ValueObject<UserEmailProps> {
  private constructor(props: UserEmailProps) {
    super(props);
  }

  getValue(): string {
    return this.props.email;
  }

  private static isValidEmail(email: string): boolean {
    return EmailRegExp.test(email);
  }

  private static formatEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: UserEmailProps): Result<UserEmail> {
    if (!this.isValidEmail(email.email)) {
      return Result.fail<UserEmail>(
        "メールアドレスに使用できない文字が含まれています"
      );
    }

    return Result.success<UserEmail>(
      new UserEmail({ email: this.formatEmail(email.email) })
    );
  }
}
