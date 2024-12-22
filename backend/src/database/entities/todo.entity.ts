import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { TaskStatus } from "../../core/types";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status!: TaskStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  duedate!: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user!: User;
}
