import { IsDefined } from 'class-validator';
import { QueryOptions } from 'src/lib/db-query';

export class FindAllDevelopmentDto implements QueryOptions {
  skip?: number;
  take?: number;
  
  @IsDefined()
  child_id: string;
}