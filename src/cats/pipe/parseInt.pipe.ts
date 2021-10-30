import {
  ArgumentMetadata,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metedata: ArgumentMetadata) {
    // 因为从 transform 函数返回的值完全覆盖了参数先前的值
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
