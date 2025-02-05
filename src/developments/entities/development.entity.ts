import { Child } from 'src/children/entities/child.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'app_development' })
@Index('parent_child_dev', ['parent', 'child'])
export class Development {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  checkpoint_at: Date;

  @Column('float')
  weight_kg: number;

  @Column('float')
  height_cm: number;

  @Column('text', { array: true })
  development: string[];

  // timestamps
  @CreateDateColumn()
  created_at?: Date;
  
  @UpdateDateColumn()
  updated_at?: Date;

  // relations
  @ManyToOne(() => User)
  parent: User;

  @ManyToOne(() => Child, child => child.developments)
  child: Child;
}
