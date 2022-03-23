import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import {
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
} from "../../../shared/util/Constants";

type UserNameProps = {
  userName: string;
};

export class UserName extends ValueObject<UserNameProps> {
  private static MAX_LENGTH = USER_NAME_MAX_LENGTH;
  private static MIN_LENGTH = USER_NAME_MIN_LENGTH;

  private constructor(props: UserNameProps) {
    super(props);
  }

  getValue(): string {
    return this.props.userName;
  }

  public static create(props: UserNameProps): Result<UserName> {
    const usernameResult = Guard.againstNullOrUndefined(
      props.userName,
      "userName"
    );
    if (!usernameResult.succeeded) {
      return Result.fail<UserName>(usernameResult.message);
    }
    const greaterEnough = Guard.againstAtLeast(this.MIN_LENGTH, props.userName);
    if (!greaterEnough) {
      return Result.fail<UserName>("ユーザー名は最小3文字です");
    }

    const lessEnough = Guard.againstAtMost(this.MAX_LENGTH, props.userName);
    if (!lessEnough) {
      return Result.fail<UserName>("ユーザー名は最大20文字です");
    }

    return Result.success<UserName>(new UserName(props));
  }
}
