import { Response } from "node-fetch";
import { BempaggoHttp } from "../BempaggoHttp";

const errors: ((value: string) => BempaggoError)[] = [];
errors[400] = (value: string): BempaggoBadRequestException => new BempaggoBadRequestException('Bad Request', value);
errors[401] = (value: string): BempaggoUnauthorizedException => new BempaggoUnauthorizedException('Unauthorized', value);
errors[403] = (value: string): BempaggoForbiddenException => new BempaggoForbiddenException('Forbidden', value);
errors[404] = (value: string): BempaggoNotFoundException => new BempaggoNotFoundException('Not found', value);
errors[422] = (value: string): BempaggoUnprocessableEntityException => new BempaggoUnprocessableEntityException('Unprocessable Entity', value);
errors[500] = (value: string): BempaggoInternalServerErrorException => new BempaggoInternalServerErrorException('Internal Server Error', value);
errors[502] = (value: string): BempaggoInternalServerErrorException => new BempaggoInternalServerErrorException('Internal Server Error', value);
const assertNotError: ((response: Response) => Promise<void>) = async (response: Response) => {
  if (response.status >= 400) {
    const typeError: ((value: any) => BempaggoError) = errors[response.status];
    if (typeError) {
      const error = typeError(await response.text());
      throw error;
    } else {
      throw new BempaggoError("Bempaggo Error", response.status, await response.text());
    }
  }
}
const getByUrlResponse: ((response: Response, http: BempaggoHttp) => Promise<any>) =
  async (response: Response, http: BempaggoHttp): Promise<any> => {
    const location: string | null = response.headers.get("location");
    if (location) {
      const responseFollow: Response = await http.httpGetByLocation(location);
      assertNotError(responseFollow);
      return await responseFollow.json();
    } else {
      await assertNotError(response);
      throw new BempaggoError("Bempaggo Error", response.status, await response.text());
    }
  };

class BempaggoError extends Error {
  constructor(message: string = 'Bempaggo Error', private status: number, private value: string) {
    super(message);
    Object.setPrototypeOf(this, BempaggoError.prototype);
  }
  getStatus(): number {
    return this.status;
  }
  getValue(): string {
    return this.value;
  }
}

class BempaggoUnprocessableEntityException extends BempaggoError {
  constructor(message = 'Unprocessable Entity', value: string) {
    super(message, 422, value);
    Object.setPrototypeOf(this, BempaggoUnprocessableEntityException.prototype);
  }
}

class BempaggoNotFoundException extends BempaggoError {

  constructor(message = 'Not found', value: string) {
    super(message, 404, value);
    Object.setPrototypeOf(this, BempaggoError.prototype);
  }
}

class BempaggoUnauthorizedException extends BempaggoError {

  constructor(message = 'Unauthorized', value: string) {
    super(message, 401, value);
    Object.setPrototypeOf(this, BempaggoUnauthorizedException.prototype);
  }
}

class BempaggoForbiddenException extends BempaggoError {

  constructor(message = 'Forbidden', value: string) {
    super(message, 403, value);
    Object.setPrototypeOf(this, BempaggoForbiddenException.prototype);
  }
}

class BempaggoBadRequestException extends BempaggoError {
  constructor(message = 'Bad Request', value: string) {
    super(message, 400, value);
    Object.setPrototypeOf(this, BempaggoBadRequestException.prototype);
  }
}

class BempaggoInternalServerErrorException extends BempaggoError {

  constructor(message = 'Internal Server Error', value: string) {
    super(message, 500, value);
    Object.setPrototypeOf(this, BempaggoInternalServerErrorException.prototype);
  }
}

export {
  BempaggoBadRequestException, BempaggoError, BempaggoForbiddenException,
  BempaggoInternalServerErrorException,
  BempaggoNotFoundException,
  BempaggoUnauthorizedException,
  BempaggoUnprocessableEntityException, assertNotError, errors, getByUrlResponse
};

