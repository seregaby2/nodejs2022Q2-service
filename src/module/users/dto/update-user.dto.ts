import { IsNotEmpty, IsString, Length } from 'class-validator';

export class updateUserDto {
  @Length(4)
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string; // previous password

  @IsNotEmpty()
  @Length(4)
  @IsString()
  readonly newPassword: string; // new password
}
