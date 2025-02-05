import { IsArray, IsDateString, IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateDevelopmentDto {
  @IsDefined()
  @IsString()
  child_id: string;
  
  @IsDefined()
  @IsDateString()
  checkpoint_at: Date;

  @IsDefined()
  @IsNumber()
  weight_kg: number;

  @IsDefined()
  @IsNumber()
  height_cm: number;

  @IsDefined()
  @IsArray()
  development: string[];

  parent?: { id: string };
}
