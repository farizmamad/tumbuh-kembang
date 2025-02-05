import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { Request as RequestContext } from 'express';
import { TokenPayloadDto } from 'src/auth/dto/token.dto';
import { ChildrenService } from 'src/children/children.service';
import { DevelopmentsService } from './developments.service';
import { CreateDevelopmentDto } from './dto/create-development.dto';
import { FindAllDevelopmentDto } from './dto/find-all-development.dto';
import { UpdateDevelopmentDto } from './dto/update-development.dto';

@Controller('developments')
export class DevelopmentsController {
  constructor(
    private readonly childrenService: ChildrenService,
    private readonly developmentsService: DevelopmentsService,
  ) {}
  
  @Post()
  async create(
    @Request() req: RequestContext & { user: TokenPayloadDto },
    @Body() createDevelopmentDto: CreateDevelopmentDto,
  ) {
    await this.validateChildExistence(req.user.sub, createDevelopmentDto.child_id);
    createDevelopmentDto.parent = { id: req.user.sub };
    return await this.developmentsService.create(createDevelopmentDto);
  }

  @Get()
  async findAll(
    @Request() req: RequestContext & { user: TokenPayloadDto },
    @Query() query: FindAllDevelopmentDto,
  ) {
    await this.validateChildExistence(req.user.sub, query.child_id);
    return await this.developmentsService.findAll(req.user.sub, query);
  }

  @Patch(':id')
  async update(
    @Request() req: RequestContext & { user: TokenPayloadDto },
    @Param('id') id: string,
    @Body() updateDevelopmentDto: UpdateDevelopmentDto,
  ) {
    await this.validateChildExistence(req.user.sub, updateDevelopmentDto.child_id);
    updateDevelopmentDto.parent = { id: req.user.sub };
    return await this.developmentsService.update(id, updateDevelopmentDto);
  }

  @Delete(':id')
  async remove(
    @Request() req: RequestContext & { user: TokenPayloadDto },
    @Param('id') id: string,
  ) {
    return await this.developmentsService.remove(id, { parent: { id: req.user.sub }});
  }

  async validateChildExistence(parentId: string, childId: string) {
    const isExist = await this.childrenService.validateExistence(parentId, childId);
    if (!isExist) {
      throw new NotFoundException('Child is not found.');
    }
  }
}
