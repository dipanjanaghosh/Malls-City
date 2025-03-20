export interface SingUpError {
  error: { errorMsg: string; keyName: { name: string } };
  status: string;
}

export interface AdminUser {
  token: string;
  user: {
    username: string;
    email: string;
  };
}
