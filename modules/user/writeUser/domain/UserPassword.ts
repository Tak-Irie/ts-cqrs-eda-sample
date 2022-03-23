import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { hashString, verifyHashedString } from "../../../shared/util/hash";

type UserPasswordProps = {
  password: string;
  isHashed: boolean;
};

export class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(props: UserPasswordProps) {
    super(props);
  }

  getValue(): string {
    return this.props.password;
  }

  // TODO:need to separate User and SSOUser?
  public static createForSSO(): UserPassword {
    return new UserPassword({ password: "IT_IS_SSO_USER", isHashed: false });
  }

  public static async create(
    props: UserPasswordProps
  ): Promise<Result<UserPassword>> {
    const AT_LEAST_NUM = 8;
    const propsResult = Guard.againstNullOrUndefined(
      props.password,
      "password"
    );

    if (!propsResult.succeeded) {
      return Result.fail<UserPassword>(propsResult.message);
    }

    const result = Guard.againstAtLeast(AT_LEAST_NUM, props.password);

    if (!props.isHashed && !result.succeeded) {
      return Result.fail<UserPassword>(
        "パスワードは8文字以上に設定してください"
      );
    }

    if (!props.isHashed) {
      props.password = await this.hashPassword(props.password);
    }

    return Result.success<UserPassword>(
      new UserPassword({
        password: props.password,
        isHashed: true,
      })
    );
  }

  private static async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hashString(password);

    return hashedPassword;
  }

  public static async verifyPassword(
    plainText: string,
    hashed: string
  ): Promise<boolean> {
    const result = await verifyHashedString(plainText, hashed);

    return result;
  }

  public isAlreadyHashed(): boolean {
    if (!this.props.isHashed) return false;

    return this.props.isHashed;
  }

  //TODO:YAGNI
  // public async getHashedValue(): Promise<string> {
  //   if (this.isAlreadyHashed()) return this.props.password;

  //   return await this.hashPassword(this.props.password);
  // }

  // public async comparePassword(plainTextPassword: string): Promise<boolean> {
  //   let isHashed: string;
  //   if (this.isAlreadyHashed()) {
  //     isHashed = this.props.password;

  //     return this.verifyPassword(plainTextPassword, isHashed);
  //   }

  //   return this.props.password === plainTextPassword;
  // }
}
