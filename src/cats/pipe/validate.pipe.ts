/* eslint-disable @typescript-eslint/ban-types */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// 元数据结构
// export interface ArgumentMetadata {
//   type: 'body' | 'query' | 'param' | 'custom';
//   metatype?: Type<unknown>;
//   data?: string;
// }
// type: 告诉我们该属性是一个 body @Body()，query @Query()，param @Param()
// metatype: 	属性的元类型，例如 String, Number, Boolean 等
// data: 传递给装饰器的字符串，例如 @Body('string')。

@Injectable()
export class ValidatePipe implements PipeTransform<any> {
  // 实现 PipeTransform 接口，实现 transform 方法
  // 这个方法接收两个参数 value 和 metadata
  // value: 当前处理的数据
  // metadata: 当前处理数据的修饰器相关数据

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
