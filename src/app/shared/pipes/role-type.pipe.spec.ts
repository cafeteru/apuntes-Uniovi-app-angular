import { RoleTypePipe } from './role-type.pipe';

describe('RoleTypePipe', () => {
  it('create an instance', () => {
    const pipe = new RoleTypePipe(null);
    expect(pipe).toBeTruthy();
  });
});
