import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(image: string): string {
    if (!image || image.length === 0) {
      return 'assets/img/noImage.png';
    }
    return image;
  }

}
