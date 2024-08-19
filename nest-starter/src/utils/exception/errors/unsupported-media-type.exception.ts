import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';
import { ErrorCode, ExceptionDetails } from './exception.type';
/**
 * Defines an HTTP exception for *Unsupported Media Type* type errors.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 *
 * @publicApi
 */
export class cUnsupportedMediaTypeException extends HttpException {
  /**
   * Instantiate an `UnsupportedMediaTypeException` Exception.
   *
   * @example
   * `throw new UnsupportedMediaTypeException()`
   *
   * @usageNotes
   * The HTTP response status code will be 415.
   * - The `objectOrError` argument defines the JSON response body or the message string.
   * - The `descriptionOrOptions` argument contains either a short description of the HTTP error or an options object used to provide an underlying error cause.
   *
   * By default, the JSON response body contains two properties:
   * - `statusCode`: this will be the value 415.
   * - `message`: the string `'Unsupported Media Type'` by default; override this by supplying
   * a string in the `objectOrError` parameter.
   *
   * If the parameter `objectOrError` is a string, the response body will contain an
   * additional property, `error`, with a short description of the HTTP error. To override the
   * entire JSON response body, pass an object instead. Nest will serialize the object
   * and return it as the JSON response body.
   *
   * @param objectOrError string or object describing the error condition.
   * @param descriptionOrOptions either a short description of the HTTP error or an options object used to provide an underlying error cause
   */
  constructor(
    code: ErrorCode,
    details?: ExceptionDetails,
    descriptionOrOptions:
      | string
      | HttpExceptionOptions = 'Unsupported Media Type',
  ) {
    const { description, httpExceptionOptions } =
      HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);

    super(
      HttpException.createBody(
        {
          code,
          details,
        },
        description,
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      ),
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      httpExceptionOptions,
    );
  }
}