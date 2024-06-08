import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { SetorEntity } from './setor.entity';
  import { InjectRepository } from '@nestjs/typeorm';
  import { SetorDto } from './setor.dto'
  
  @Injectable()
  export class SetorService {
    constructor(
      @InjectRepository(SetorEntity)
      private setorRepository: Repository<SetorEntity>,
    ) {}
  
    findAll() {
      return this.setorRepository.find({
      });
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
  
    async remove(id: string) {
      const findById = await this.findById(id);
      await this.setorRepository.remove(findById);
      return { ...findById, id };
    }
  
    async create(dto: SetorDto) {
      const newSetor = this.setorRepository.create(dto);
  
      return this.setorRepository.save(newSetor);
    }
  
    async update(setor: SetorDto) {
      await this.findById(setor.id);
   
      return this.setorRepository.save(setor);
    }
  }