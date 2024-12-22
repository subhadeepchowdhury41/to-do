import { IsAlpha, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsAlpha()
  name?: string;
}
