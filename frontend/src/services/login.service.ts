import { HttpInstance } from "../utils/http";

export interface User {
  email: string;
}

export async function login(email: string, senha: string): Promise<User> {
  const result = await HttpInstance.http.put("/auth", { email, senha });

  if (result.status !== 200) throw Error();

  const user: User = {
    email: email,
  };

  return user;
}
