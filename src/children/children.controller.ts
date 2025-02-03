import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { Request as RequestContext } from 'express';
import { TokenPayloadDto } from 'src/auth/dto/token.dto';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { QueryOptions } from 'src/lib/db-query';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  async create(
    @Request() req: RequestContext & { user: TokenPayloadDto },
    @Body() createChildDto: CreateChildDto
  ) {
    createChildDto.parent = { id: req.user.sub };
    return await this.childrenService.create(createChildDto);
  }

  @Get()
  async findAll(
    @Request() req: RequestContext & { user: TokenPayloadDto },
    @Query() query?: QueryOptions,
  ) {
    return await this.childrenService.findAll(req.user.sub, query);
  }

  @Get(':id')
  async findOne(
    @Request() req: RequestContext & { user: TokenPayloadDto },
    @Param('id') id: string,
  ) {
    return await this.childrenService.findOne(id, { parent: { id: req.user.sub }});
  }

  @Patch(':id')
  async update(
    @Request() req: RequestContext & { user: TokenPayloadDto },
    @Param('id') id: string,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    updateChildDto.parent = { id: req.user.sub };
    return await this.childrenService.update(id, updateChildDto);
  }

  @Delete(':id')
  async remove(
    @Request() req: RequestContext & { user: TokenPayloadDto },
    @Param('id') id: string,
  ) {
    return await this.childrenService.remove(id, { parent: { id: req.user.sub }});
  }
}
