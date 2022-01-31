export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class UsersDto {
  user: {
    id: string;
    email: string;
  };
}
