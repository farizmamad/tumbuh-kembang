import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_SKIP_QUERY, DEFAULT_TAKE_QUERY } from 'src/lib/db-query';
import { getPaginationResponse } from 'src/lib/pagination';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDevelopmentDto } from './dto/create-development.dto';
import { FindAllDevelopmentDto } from './dto/find-all-development.dto';
import { UpdateDevelopmentDto } from './dto/update-development.dto';
import { Development } from './entities/development.entity';

@Injectable()
export class DevelopmentsService {
  constructor (
    @InjectRepository(Development)
    private developmentsRepository: Repository<Development>,
  ) {}

  async create(createDevelopmentDto: CreateDevelopmentDto) {
    const newDevelopment = this.developmentsRepository.create(createDevelopmentDto);
    const result = await this.developmentsRepository.save(newDevelopment);
    return result;
  }

  async findAll(parentId: string, options: FindAllDevelopmentDto) {
    const [result, count] = await this.developmentsRepository.findAndCount({
      where: [
        { parent: { id: parentId }},
        { child: { id: options.child_id }},
      ],
      order: { checkpoint_at: 'DESC' },
      skip: options?.skip ?? DEFAULT_SKIP_QUERY,
      take: options?.take ?? DEFAULT_TAKE_QUERY,
    });

    return {
      data: result,
      pagination: getPaginationResponse(count, options?.skip, options?.take),
    }
  }

  async findOne(id: string, query: { parent: Pick<User, 'id'> }) {
    return await this.developmentsRepository.findOneBy({ id, parent: query.parent });
  }

  async update(id: string, updateDevelopmentDto: UpdateDevelopmentDto) {
    let development = await this.findOne(id, { parent: { id: updateDevelopmentDto?.parent?.id }});
    if (!development) {
      throw new NotFoundException('Development is not found');
    }
    development.checkpoint_at = updateDevelopmentDto.checkpoint_at ?? development.checkpoint_at;
    development.weight_kg = updateDevelopmentDto.weight_kg ?? development.weight_kg;
    development.height_cm = updateDevelopmentDto.height_cm ?? development.height_cm;
    development.development = updateDevelopmentDto.development ?? development.development;
    return await this.developmentsRepository.save(development);
  }

  async remove(id: string, query: { parent: Pick<User, 'id'> }) {
    let child = await this.findOne(id, { parent: { id: query?.parent?.id }});
    if (!child) {
      throw new NotFoundException('Development is not found');
    }
    return await this.developmentsRepository.remove(child);
  }
}
