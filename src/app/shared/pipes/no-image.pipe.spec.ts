import { NoImagePipe } from './no-image.pipe';

describe('NoImagePipe', () => {
  const pipe = new NoImagePipe();
  const invalidImage = 'assets/img/noImage.png';

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('check transform with empty key', () => {
    const image = pipe.transform('');
    expect(image).toBe(invalidImage);
  });

  it('check transform with null key', () => {
    const image = pipe.transform(null);
    expect(image).toBe(invalidImage);
  });

  it('check transform with undefined key', () => {
    const image = pipe.transform(undefined);
    expect(image).toBe(invalidImage);
  });

  it('check transform with empty key', () => {
    const image = pipe.transform('image');
    expect(image).toBe('image');
  });
});
