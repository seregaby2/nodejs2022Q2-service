import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class updateArtistDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly grammy: boolean;
}
