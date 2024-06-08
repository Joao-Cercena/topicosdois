import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'setor' })
export class SetorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;


  @Column({ length: 1 })
  ativo: string;
}