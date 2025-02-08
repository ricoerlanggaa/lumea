/* eslint-disable no-unused-vars */
import Ajv, { JSONSchemaType, ErrorObject, ValidateFunction } from 'ajv';
import ajvErrors from 'ajv-errors';

export default class Validator<T> {
  private ajv: Ajv;

  private validateFn: ValidateFunction<T> | null = null;

  constructor(private schema: JSONSchemaType<T>) {
    this.ajv = new Ajv({ allErrors: true, strict: false, $data: true });
    ajvErrors(this.ajv);
    this.compileSchema();
  }

  private compileSchema() {
    this.validateFn = this.ajv.compile(this.schema);
  }

  public validate(data: unknown): { valid: boolean; errors?: ErrorObject[] } {
    if (!this.validateFn) {
      throw new Error('Schema is not compiled.');
    }

    const valid = this.validateFn(data);
    return valid ? { valid } : { valid, errors: this.validateFn.errors || [] };
  }
}
