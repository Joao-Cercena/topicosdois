import { SetorEntity } from 'src/setor/setor.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ongs' })
export class OngsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 14 })
  cnpj: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  endereco: string;

  @Column({ length: 100 })
  pedido: string;

  @Column({ length: 1 })
  ativo: string;

  @ManyToMany(() => SetorEntity, (setor) => setor.id)
  setor: SetorEntity[]
}