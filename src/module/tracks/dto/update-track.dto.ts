import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class updateTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly duration: number;

  @IsUUID()
  @IsOptional()
  readonly artistId: string | null;

  @IsUUID()
  @IsOptional()
  readonly albumId: string | null;
}
