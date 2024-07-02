type User = {
  id: number;
  username: string;
  email: string;
};

type UserWithPasswordHash = User & {
  passwordHash: string;
};
