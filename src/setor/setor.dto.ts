import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
  } from 'class-validator';
  
  export class SetorDto {
    @IsUUID()
    @IsOptional()
    id: string;
  
    @IsString({ message: 'O campo nome deve ser do tipo texto' })
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    ativo: string;
  }