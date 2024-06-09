import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoadorEntity } from './doador.entity';

@Injectable()
export class DoadorService {
  constructor(
    @InjectRepository(DoadorEntity)
    private readonly doadorRepository: Repository<DoadorEntity>,
  ) {}

  async findAll(): Promise<DoadorEntity[]> {
    return this.doadorRepository.find();
  }

  async findOne(id: string): Promise<DoadorEntity> {
    const doador = await this.doadorRepository.findOne({ where: { id } });
    if (!doador) {
      throw new NotFoundException('Doador não encontrado');
    }
    return doador;
  }

  async create(doadorData: DoadorEntity): Promise<DoadorEntity> {
    await this.validateDoadorData(doadorData);
    const newDoador = this.doadorRepository.create(doadorData);
    return this.doadorRepository.save(newDoador);
  }

  async update(id: string, doadorData: DoadorEntity): Promise<DoadorEntity> {
    await this.validateDoadorData(doadorData, id);
    await this.doadorRepository.update(id, doadorData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.doadorRepository.delete(id);
  }

  // Métodos de Validação
  private async validateDoadorData(doadorData: DoadorEntity, id?: string): Promise<void> {
    await this.validateAge(doadorData);
    await this.validateUniqueEmail(doadorData.email, id);
    this.validateCPF(doadorData.cpf);
  }

  private async validateAge(doadorData: DoadorEntity): Promise<void> {
    const age = this.calculateAge(doadorData.dataNascimento);
    if (age < 18) {
      throw new BadRequestException('O doador deve ter pelo menos 18 anos.');
    }
  }

  private calculateAge(birthdate: Date): number {
    const ageDifMs = Date.now() - new Date(birthdate).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  private async validateUniqueEmail(email: string, id?: string): Promise<void> {
    const doador = await this.doadorRepository.findOne({ where: { email } });
    if (doador && doador.id !== id) {
      throw new BadRequestException('O email já está em uso.');
    }
  }

  private validateCPF(cpf: string): void {
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      throw new BadRequestException('O CPF é inválido.');
    }
  }
}
