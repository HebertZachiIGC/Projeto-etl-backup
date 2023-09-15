import { Body, Controller, Get, Query } from '@nestjs/common';
import { TargetService } from './target.service';
import { Target } from './target.entity';

@Controller('auth')
export class TargetController {
  constructor(private targetService: TargetService) {
  }

  @Get('/target')
  async findAll() {
    return await this.targetService.findAll();
  }

  @Get('/targetClient')
  async findAllClient() {
    return await this.targetService.ClientSector();
  }

  @Get('/target2')
  async findAllBySub(@Query('ClientSubSector') ClientSubSector: string)  {
    console.log(ClientSubSector)
    return await this.targetService.findAllByQuery(ClientSubSector); //
  }
}