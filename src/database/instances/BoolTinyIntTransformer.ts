import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

export class BoolTinyIntTransformer implements ValueTransformer {
  // To db from typeorm
  public to(value?: boolean): boolean {
    return !!value;
  }

  // From db to typeorm
  public from(value: number): boolean {
    return value === 1;
  }
}
