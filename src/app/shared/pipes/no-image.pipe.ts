import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
/**
 * Pipe to handle image loading and always show one even if it fails
 */
export class NoImagePipe implements PipeTransform {

  /**
   * Check if src is valid
   *
   * @param image Path where the image is hosted
   */
  transform(image: string): string {
    if (!image || image.length === 0) {
      return 'assets/img/noImage.png';
    }
    return image;
  }

}
