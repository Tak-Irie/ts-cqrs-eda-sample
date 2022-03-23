export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: T | string | "NOTHING";
  private _value: T | "NOTHING";

  public constructor(
    isSuccess: boolean,
    error: T | string | "NOTHING",
    value: T | "NOTHING"
  ) {
    if (isSuccess && error !== "NOTHING") {
      throw new Error(
        "Result:InvalidOperation: A result cannot be successful and contain an error"
      );
    }
    if (!isSuccess && error === "NOTHING") {
      throw new Error(
        "Result:InvalidOperation: A failing result needs to contain an error message"
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      console.log(this.error);
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead."
      );
    }

    return this._value as T;
  }

  public errorValue(): T {
    return this.error as T;
  }
  public getErrorValue() {
    return this.error as string;
  }

  public static success<U>(value: U): Result<U> {
    return new Result<U>(true, "NOTHING", value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error, "NOTHING");
  }

  public static combine<U>(results: Result<U>[]): ResultMap<U> {
    const verifiedResult: ResultMap<U> = { failure: [], success: [] };

    for (const result of results) {
      if (result.isFailure) {
        verifiedResult.failure.push(Result.fail<U>(result.getErrorValue()));
      } else {
        verifiedResult.success.push(Result.success<U>(result.getValue()));
      }
    }

    return verifiedResult;
  }
}

type ResultMap<T> = {
  failure: Result<T>[];
  success: Result<T>[];
};

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
