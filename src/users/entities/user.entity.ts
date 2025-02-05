import { Child } from 'src/children/entities/child.entity';
import { Development } from 'src/developments/entities/development.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'app_user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  display_name: string;
  
  @Column({ unique: true })
  username: string;
  
  // Auth
  @Column()
  password?: string;
  
  @Column()
  salt?: string;

  // timestamps
  @CreateDateColumn()
  created_at?: Date;
  
  @UpdateDateColumn()
  updated_at?: Date;

  // relations
  @OneToMany(() => Child, child => child.parent)
  children: Child[];

  @OneToMany(() => Development, development => development.parent)
  developments: Development[];
}
