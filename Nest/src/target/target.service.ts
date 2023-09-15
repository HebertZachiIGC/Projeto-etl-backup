// csv-seeder.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as parser from 'csv-parser';
import { Repository, getRepository } from 'typeorm';
import { Target } from './target.entity';

@Injectable()
export class TargetService {
  constructor(
    @InjectRepository(Target)
    private readonly targetRepository: Repository<Target>,
  ) {}

  public async seedFromCSV() {
    // const filePath = __dirname + './../../arquivoTarget2.CSV';
    const filePath = __dirname + './../../arquivoTest.csv';
    // console.log(__e);


    // const stream = fs.createReadStream(filePath, { encoding: 'binary' });
    const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
    // stream.setEncoding('UTF8');
    // const corretor = (valor) => {
    //   if (valor) {
    //     const cleanString = valor.replace(/[^\d,]/g, '').replace(',', '.');
    //     return isNaN(cleanString) ? cleanString : Number(cleanString);
    //   } else {
    //     return null;
    //   }
    // };

    stream
      .pipe(parser({ separator: ',' }))
      .on('data', async (row) => {
        console.log(new Date(row.LastDateCloseDealPerInSubSector));

        const entity = this.targetRepository.create({
          // Mapeie as colunas do CSV para as propriedades da entidade
    
          Buyer: row.Buyer,
          // Client: row.Client,
          ClientSubSector: row.ClientSubSector,
          NDeals: row.Ndeals ? Number(row.Ndeals) : null,
          // NDeals: Number(row.NDeals),
          // Verifica se existe input e convert de string para number, caso não não existe convert para null  
          NumberOfNDAPerBuyerInSubSector: this.treatmentNumbers(
            row.SignedNDADate,
          ),
          NumberOfGosPerBuyerInSubSector: this.treatmentNumbers(
            row.NumberOfGosPerBuyerInSubSector,
          ),
          NumberOfGosPerSizeInSubSector: this.treatmentNumbers(
            row.NumberOfGosPerSizeInSubSector,
          ),
          NumberOfNBOperDealsInSubSector: this.treatmentNumbers(
            row.NumberOfNBOperDealsInSubSector,
          ),
          AverageSizePerDealInSubSector: this.treatmentNumbers(
            row.AverageSizePerDealInSubSector,
          ),
          MedianSizePerDealInSubSector: this.treatmentNumbers(
            row.MedianSizePerDealInSubSector,
          ),
          NBOLastDatePerDealInSubSector: row.NBOLastDatePerDealInSubSector ? new Date(row.NBOLastDatePerDealInSubSector) : null,
          LastDateCloseDealPerInSubSector: row.LastDateCloseDealPerInSubSector ? new Date(row.LastDateCloseDealPerInSubSector) : null,

          DealClosePerClientSector: this.treatmentNumbers(
            row.DealClosePerClientSector,
          ),
          MostRecentContact: row.MostRecentContact
            ? row.MostRecentContact
            : null,
          IsEqual: row.IsEqual ? row.IsEqual : null,
          // LastDateCloseDealPerInSubSector: row.LastDateCloseDealPerInSubSector,  
        });

        await this.targetRepository.save(entity);
      })
      .on('end', () => {
        console.log('Dados do CSV importados com sucesso!');
      });
  }

  private treatmentNumbers(value): null | number {
    return value ? Number(value) : null;
  }

  async findAll() {
    return await this.targetRepository.find();
  }

  async count(): Promise<number> {
    return await this.targetRepository.count();
  }

  async ClientSector() {
    const client = await this.targetRepository.find();
    const AllClient = [];
    // console.log(client);
    client.map((i) => {
      if(!AllClient.includes(i.ClientSubSector)) {
        AllClient.push(i.ClientSubSector); 
      }
    })
    AllClient.sort();
    // console.log(AllClient);
    return AllClient;
  }

  async findAllByQuery(ClientSubSector: string) {
    return await this.targetRepository.find({ where: {ClientSubSector}});
  }
}