import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'doador'})
export class DoadorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length:100})
    nome: string;

    @Column({ length:11})
    cpf: string;

    @Column({ length:100})
    email: string;

    @Column({ type: 'date', name: 'data_nascimento', nullable: true })
    dataNascimento: Date;


}
