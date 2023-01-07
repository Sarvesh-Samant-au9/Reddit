// /* eslint-disable prettier/prettier */
// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { User } from "../Schemas/user.schema"

// export const CurrentUser = createParamDecorator(
//   (data, context: ExecutionContext): User => {
//     const req = context.switchToHttp().getRequest();
//     return req.user;
//   },
// );