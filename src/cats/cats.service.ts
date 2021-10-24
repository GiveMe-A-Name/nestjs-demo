import { Injectable } from '@nestjs/common';
import { ICat } from './interface/cat.interface';

@Injectable()
export class CatsService {
  private cats: ICat[] = [];
  create(cat: ICat) {
    this.cats.push(cat);
    return cat;
  }

  findAll() {
    return this.cats;
  }

  findOne(id: number) {
    return this.cats[id % this.cats.length];
  }
}
