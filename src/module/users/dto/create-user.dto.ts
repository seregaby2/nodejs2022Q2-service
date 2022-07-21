import { IsNotEmpty, IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
