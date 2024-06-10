import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { SetorEntity } from './setor.entity';
  import { InjectRepository } from '@nestjs/typeorm';
  import { SetorDto } from './setor.dto'
import { OngsEntity } from 'src/ongs/ongs.entity';
  
  @Injectable()
  export class SetorService {
    constructor(
      @InjectRepository(SetorEntity)
      private setorRepository: Repository<SetorEntity>,
      private ongsRepository: Repository<OngsEntity>,
    ) {}
  
  

    async findAll(page: number = 1, limit: number = 10): Promise<SetorEntity[]> {
      const [result, total] = await this.setorRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
      });
      return result;
    }
  
    async findById(id: string): Promise<SetorEntity> {
      const findOne = await this.setorRepository.findOne({
        where: { id },
      });
      if (!findOne) {
        throw new NotFoundException('Setor não encontrado com o id ' + id);
      }
      return findOne;
    }

    async search(query: any): Promise<SetorEntity[]> {
      const qb = this.setorRepository.createQueryBuilder('setor');
      if (query.nome) {
        qb.andWhere('setor.nome LIKE :nome', { nome: `%${query.nome}%` });
      }
      if (query.id) {
        qb.andWhere('setor.id = :id', { id: query.id });
      }

      if (query.ativo) {
        qb.andWhere('setor.ativo = :ativo', { ativo: query.ativo });
      }
      
      return qb.getMany();
    }
  
    async remove(id: string) {
      const findById = await this.findById(id);
      await this.setorRepository.remove(findById);
      return { ...findById, id };
    }
  
    async create(dto: SetorDto) {
      const newSetor = this.setorRepository.create(dto);

      this.validateSetor(newSetor);
  
      return this.setorRepository.save(newSetor);
    }
  
    async update(setor: SetorDto) {
      await this.findById(setor.id);

      this.validateSetor(setor);
   
      return this.setorRepository.save(setor);
    }

    private validateSetor(setor: SetorEntity | SetorDto) {
      this.validateSetorNome(setor.nome);
      this.validateSetorInativacao(setor.id);
      this.validateSetorNomeLength(setor.nome);
    }

    private validateSetorNome(nome: string) {
      const existingSetor =  this.setorRepository.findOne({ where: { nome } });
      if (existingSetor) {
        throw new Error('Um setor com esse nome já existe.');
      }
    }

    private async validateSetorInativacao(setorId: string) {
      const ongs = await this.ongsRepository.find({ where: { setor: { id: setorId } } });
      if (ongs.length > 0) {
        throw new Error('O setor não pode ser inativado enquanto houver ONGs associadas.');
      }
    }

    private validateSetorNomeLength(nome: string): void {
      if (nome.length < 3) {
        throw new Error('O nome do setor deve ter pelo menos 3 caracteres.');
      }
    }
    
  }