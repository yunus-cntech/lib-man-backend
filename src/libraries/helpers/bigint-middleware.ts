import { Prisma } from "@prisma/client";

function bigIntMiddleware() {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>
  ) => {
    const result = await next(params);

    const convertBigIntToString = (obj: any): any => {
      if (typeof obj === "bigint") {
        return obj.toString();
      } else if (Array.isArray(obj)) {
        return obj.map(convertBigIntToString);
      } else if (obj !== null && typeof obj === "object") {
        for (const key in obj) {
          if (Object.hasOwnProperty.call(obj, key)) {
            obj[key] = convertBigIntToString(obj[key]);
          }
        }
      }
      return obj;
    };

    return convertBigIntToString(result);
  };
}

export default bigIntMiddleware;
