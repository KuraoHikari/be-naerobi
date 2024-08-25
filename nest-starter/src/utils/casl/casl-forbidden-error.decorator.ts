import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ForbiddenError } from '@casl/ability';

import { createForUser } from './casl-rules.factory';

import { RequestExtended } from '../types';

export const CaslForbiddenError = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestExtended>();

    const ability = createForUser(request.user);

    ForbiddenError.from(ability);

    request.forbiddenError = ForbiddenError.from(ability);

    return request.forbiddenError;
  },
);
