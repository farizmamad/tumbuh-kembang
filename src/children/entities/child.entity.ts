import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'app_child' })
export class Child {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  display_name: string;

  @Column()
  @Index()
  dob: Date;

  // timestamps
  @CreateDateColumn()
  created_at?: Date;
  
  @UpdateDateColumn()
  updated_at?: Date;

  // relations
  @ManyToOne(type => User, user => user.children)
  parent: User;
}
