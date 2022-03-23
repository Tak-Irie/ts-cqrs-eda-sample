import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/usecase/UseCaseError";

export class EmailAlreadyExistsError extends Result<UseCaseError> {
  constructor(email: string) {
    super(
      false,
      {
        message: `The email ${email} associated for this account already exists`,
      },
      "NOTHING"
    );
  }
}
