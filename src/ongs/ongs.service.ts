import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { OngsEntity } from './ongs.entity';
  import { InjectRepository } from '@nestjs/typeorm';
  import { OngsDto } from './ongs.dto';
  
  @Injectable()
  export class OngsService {
    constructor(
      @InjectRepository(OngsEntity)
      private ongsRepository: Repository<OngsEntity>,
    ) {}
  
    findAll() {
      return this.ongsRepository.find({
        relations: { setor: true },
      });
    }
  
    async findById(id: string): Promise<OngsEntity> {
      const findOne = await this.ongsRepository.findOne({
        where: { id },
        relations: { setor: true },
      });
      if (!findOne) {
        throw new NotFoundException('Ong não encontrado com o id ' + id);
      }
      return findOne;
    }
  
    async remove(id: string) {
      const findById = await this.findById(id);
      await this.ongsRepository.remove(findById);
      return { ...findById, id };
    }
  
    async create(dto: OngsDto) {
      const newOngs = this.ongsRepository.create(dto);
  
      this.validateOngs(newOngs);
  
      return this.ongsRepository.save(newOngs);
    }
  
    async update(ongs: OngsDto) {
      await this.findById(ongs.id);
  
      this.validateOngs(ongs);
  
      return this.ongsRepository.save(ongs);
    }
  
    private validateOngs(ongs: OngsEntity | OngsDto) {
      this.validateOngsCNPJ(ongs);
    }
  
    private validateOngsCNPJ(ongs: OngsEntity | OngsDto) {
      const dataAtual = new Date();
      const cnpj = ongs.cnpj;
  
      if (cnpj.length < 14) {
        throw new BadRequestException('O CNPJ deve ter 14 caracteres!');
      }
    }
  }