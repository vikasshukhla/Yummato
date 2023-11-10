export const isUserAuthenticated = (req: any, res: any, next: any) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("You must login first!");
  }
};
