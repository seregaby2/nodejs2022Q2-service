import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class createAlbumDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  @IsUUID()
  @IsOptional()
  readonly artistId: string | null;
}
