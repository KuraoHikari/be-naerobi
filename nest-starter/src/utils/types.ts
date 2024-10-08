import { Request } from 'express';

import { TokenData } from '../auth/auth-utils/types-auth';
import { CaslForbiddenErrorI } from './casl/casl-rules.factory';

export type OmitStrict<ObjectType, KeysType extends keyof ObjectType> = Pick<
  ObjectType,
  Exclude<keyof ObjectType, KeysType>
>;
//

export type RequestExtended = Request & {
  user: TokenData;
  forbiddenError: CaslForbiddenErrorI;
};
