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
 

    async findAll(page: number = 1, limit: number = 10): Promise<OngsEntity[]> {
      const [result, total] = await this.ongsRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
      });
      return result;
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

    async search(query: any): Promise<OngsEntity[]> {
      const qb = this.ongsRepository.createQueryBuilder('ongs');
      if (query.nome) {
        qb.andWhere('ongs.nome LIKE :nome', { nome: `%${query.nome}%` });
      }
      if (query.cnpj) {
        qb.andWhere('ongs.cnpj = :cnpj', { cnpj: query.cnpj });
      }

      if (query.email) {
        qb.andWhere('ongs.email = :email', { email: query.email });
      }
      
      return qb.getMany();
    }
  
    async remove(id: string) {
      const findById = await this.findById(id);
      await this.ongsRepository.remove(findById);
      return { ...findById, id };
    }
  
    async create(dto: OngsDto) {
      const newOngs = this.ongsRepository.create(dto);
  
      await this.validateOngs(newOngs);
  
      return this.ongsRepository.save(newOngs);
    }
  
    async update(ongs: OngsDto) {
      await this.findById(ongs.id);
  
      return this.ongsRepository.save(ongs);
    }
  
    private async  validateOngs(ongs: OngsEntity | OngsDto) {
      await this.validateOngsCNPJ(ongs.cnpj);
      await this.validateOngNome(ongs.nome);
      await this.validateOngEmail(ongs.email);
    }
  

    private async validateOngNome(nome: string) {
      const existingOng = await  this.ongsRepository.findOne({ where: { nome } });
      if (existingOng) {
        throw new BadRequestException('Uma ONG com esse nome já existe.');
      }
    }

    
    private async validateOngsCNPJ(cnpj: string){
  
      if (cnpj.length < 14) {
        throw new BadRequestException('O CNPJ deve ter 14 caracteres!');
      }

      const existingOng = await this.ongsRepository.findOne({ where: { cnpj } });
      if (existingOng) {
        throw new BadRequestException('Uma ONG com esse CNPJ já existe.');
      }
    }
    
    
    private async validateOngEmail(email: string) {
      const existingOng =  await this.ongsRepository.findOne({ where: { email } });
      if (existingOng) {
        throw new BadRequestException('Um cadastro com esse e-mail já existe.');
      }
    }
    
    
  }