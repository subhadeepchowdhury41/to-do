import { IsString, IsStrongPassword } from "class-validator";

export class UpdatePasswordDto {
  @IsString()
  oldPassword!: string;
  
  @IsStrongPassword({
    minLength: 4,
  })
  newPassword!: string;
}
