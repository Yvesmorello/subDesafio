import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  dueDate: Date;

  @Column({ default: 'Pending' })
  status: string;

  @Column()
  assignedTo: string; // Pode ser um ID de usuário ou nome do responsável
}
