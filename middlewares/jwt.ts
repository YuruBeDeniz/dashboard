import { expressjwt as jwt } from 'express-jwt';
import { Request } from 'express';


const getTokenFromHeaders = (req: Request): string | undefined => {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }
  return undefined;
};

const isAuthenticated = jwt({
  secret: import.meta.env.VITE_JWT_SECRET as string, 
  algorithms: ['HS256'],
  requestProperty: 'payload', 
  getToken: getTokenFromHeaders, 
});

export { isAuthenticated };
