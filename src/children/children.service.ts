import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { Repository } from 'typeorm';
import { Child } from './entities/child.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_SKIP_QUERY, DEFAULT_TAKE_QUERY, QueryOptions } from 'src/lib/db-query';
import { getPaginationResponse } from 'src/lib/pagination';

@Injectable()
export class ChildrenService {
  constructor (
    @InjectRepository(Child)
    private childrenRepository: Repository<Child>,
  ) {}

  async create(createChildDto: CreateChildDto) {
    const newChild = this.childrenRepository.create(createChildDto);
    const result = await this.childrenRepository.save(newChild);
    return result;
  }

  async findAll(parentId: string, options?: QueryOptions) {
    const [result, count] = await this.childrenRepository.findAndCount({
      where: { parent: { id: parentId }},
      order: { dob: 'DESC' },
      skip: options?.skip ?? DEFAULT_SKIP_QUERY,
      take: options?.take ?? DEFAULT_TAKE_QUERY,
    });

    return {
      data: result,
      pagination: getPaginationResponse(count, options?.skip, options?.take),
    }
  }

  async findOne(id: string, query: { parent: Pick<Child, 'id'> }) {
    return await this.childrenRepository.findOneBy({ id, parent: query.parent });
  }

  async update(id: string, updateChildDto: UpdateChildDto) {
    let child = await this.findOne(id, { parent: { id: updateChildDto?.parent?.id }});
    if (!child) {
      throw new NotFoundException('Child is not found');
    }
    child.display_name = updateChildDto.display_name ?? child.display_name;
    child.dob = updateChildDto.dob ?? child.dob;
    return await this.childrenRepository.save(child);
  }

  async remove(id: string, query: { parent: Pick<Child, 'id'> }) {
    let child = await this.findOne(id, { parent: { id: query?.parent?.id }});
    if (!child) {
      throw new NotFoundException('Child is not found');
    }
    return await this.childrenRepository.remove(child);
  }
}
