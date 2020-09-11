import { Pessoa } from './pessoa';

describe('Pessoa', () => {
  it('should be defined', () => {
    expect(new Pessoa()).toBeDefined();
  });
});
