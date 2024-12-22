import { IsDate, IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../core/types";

export class CreateTodoDto {
  @IsString()
  title!: string

  @IsOptional()
  description?: string

  @IsEnum(TaskStatus)
  status?: TaskStatus

  @IsDateString()
  duedate!: Date;
}