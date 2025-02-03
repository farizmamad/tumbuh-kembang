import { IsDateString, IsDefined, IsNotEmpty } from 'class-validator';

export class CreateChildDto { 
  @IsDefined()
  @IsNotEmpty()
  display_name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsDateString()
  dob: Date;
  
  parent?: {
    id: string;
  };
}
