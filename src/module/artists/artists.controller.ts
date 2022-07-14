import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { Artist } from './artista.interface';
import { artistsService } from './artists.service';
import { createArtistDto } from './dto/create-artust.dto';
import { updateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class artistsController {
  constructor(private artistService: artistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllArtist(): Promise<Artist[]> {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<Artist> {
    const artist = await this.artistService.getArtistById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException('Artist id is not valid');
    } else if (!artist) {
      throw new NotFoundException('Artist is not found');
    } else {
      return artist;
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Body() createArtist: createArtistDto): Promise<Artist> {
    if (
      !createArtist.name ||
      (!createArtist.grammy && createArtist.grammy !== false)
    ) {
      throw new BadRequestException('fill in the fields correctly');
    } else {
      return this.artistService.createArtist(createArtist);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateArtist(
    @Param('id') id: string,
    @Body() updateArtist: updateArtistDto,
  ): Promise<Artist> {
    const artist: Artist = await this.artistService.getArtistById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException('Artist id is not valid');
    } else if (!artist) {
      throw new NotFoundException('Artist is not found');
    } else if (
      !updateArtist.name ||
      typeof updateArtist.grammy !== 'boolean' ||
      (!updateArtist.grammy && updateArtist.grammy !== false)
    ) {
      throw new BadRequestException('fill in the fields correctly');
    } else {
      return this.artistService.updateArtist(id, updateArtist);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') id: string) {
    const artist: Artist = await this.artistService.getArtistById(id);
    if (!uuidValidate(id)) {
      throw new BadRequestException('Artist id is not valid');
    } else if (!artist) {
      throw new NotFoundException('Artist is not found');
    } else {
      return this.artistService.deleteArtist(id);
    }
  }
}
