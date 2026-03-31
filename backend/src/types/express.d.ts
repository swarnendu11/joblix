declare namespace Express {
  interface Request {
    auth?: {
      clerkUserId: string;
    };
  }
}
