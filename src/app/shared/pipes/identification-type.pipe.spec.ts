import { IdentificationTypePipe } from './identification-type.pipe';

describe('IdentificationTypePipe', () => {
  it('create an instance', () => {
    const pipe = new IdentificationTypePipe(null);
    expect(pipe).toBeTruthy();
  });
});
