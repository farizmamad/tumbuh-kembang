import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
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
}
