import { Guard, Result } from "../../../shared/core";
import { Entity, UniqueEntityID, Event } from "../../../shared/domain";
import { UserEmail, UserName, UserPassword } from ".";

type UserProps = {
  userName: UserName;
  email: UserEmail;
  password: UserPassword;
};

type UserArgs = {
  id: string;
  userName: string;
  email: string;
  password: string;
};

export class User extends Entity<UserProps> {
  private constructor(readonly props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  getId(): string {
    if (!this._id) return "id doesn't exist";
    return this._id.toString();
  }

  getUsername(): string {
    return this.props.userName.getValue();
  }

  getEmail(): string {
    return this.props.email.getValue();
  }

  getPassword(): string {
    // if (this.props.password === undefined) return undefined;
    return this.props.password.getValue();
  }

  public static async create(
    args: Omit<UserArgs, "id">
  ): Promise<Event<"UserCreated", UserArgs> | false> {
    // console.log("args:", args);
    // const guardResult = Guard.againstNullOrUndefinedBulk([
    //   { argument: args.userName, argumentName: "userName" },
    //   { argument: args.email, argumentName: "email" },
    // ]);

    // if (!guardResult.succeeded) {
    //   return false;
    // }

    const _email = UserEmail.create({ email: args.email });
    // console.log("email:", _email);
    if (_email.isFailure) return false;
    const _password = await UserPassword.create({
      isHashed: false,
      password: args.password,
    });
    if (_password.isFailure) return false;
    const _userName = UserName.create({ userName: args.userName });
    if (_userName.isFailure) return false;

    const event = Event.createEvent<"UserCreated", UserArgs>({
      type: "UserCreated",
      data: {
        id: new UniqueEntityID().toString(),
        email: _email.getValue().getValue(),
        password: _password.getValue().getValue(),
        userName: _userName.getValue().getValue(),
      },
      metadata: { NONE: "NONE" },
    });

    return event;
  }
}
