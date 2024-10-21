import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';

export const getStartRandomTransformRotate = () => {
  const values = ['rotate(15deg)', 'rotate(-15deg)', 'rotate(65deg)', 'rotate(-75deg)', 'rotate(-135deg)']
  const index = Math.floor(Math.random() * values.length);
  return values[index];
}

export const getRandomRotationTransform = () => {
  const values = ['rotate(15deg)', 'rotate(-15deg)', 'rotate(65deg)', 'rotate(-40deg)', 'rotate(180deg)', 'rotate(-180deg)']
  const index = Math.floor(Math.random() * values.length);
  return values[index];
}

export const getRandomTransformRotate = () => {
  const values = ['rotate(180deg)', 'rotate(0deg)']
  const index = Math.floor(Math.random() * values.length);
  return values[index];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('50ms', style({opacity: 1})),
      ]),
      transition(':leave', [
        animate('2s', style({opacity: .9, transform: getRandomRotationTransform()}))
      ])
    ]),
  ],
})
export class AppComponent {
  title = 'joyeuxanniversairemacouillasse';
  audio: HTMLAudioElement = new Audio();
  cutPlay = true;
  shufflePlay = true;
  randomColorClass = this.getRandomColorClass();
  randomPooClass = this.getRandomPooClass();
  animateImage = false;
  imgSrc = 'jamy1.jpg';

  turnAnimation() {
    this.animateImage = !this.animateImage;
  }

  playAudio(index: number) {
    if (this.cutPlay) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    if (index == 1) this.audio = new Audio('enorme.mp3');
    if (index == 2) this.audio = new Audio('jmbmacouillasse.mp3');
    if (index == 3) this.audio = new Audio('salpe.mp3');
    if (index == 4) this.audio = new Audio('tourjaponaise.mp3');

    this.audio!.play();

    const imgIndex = this.getRandomAudioIndex();
    this.turnAnimation();
    this.imgSrc = 'jmb' + imgIndex + '.jpg';
    if (index == 1 || index == 4) {
      this.imgSrc = 'jamy' + imgIndex + '.jpg';
    }
  }

  playShuffle() {
    this.playAudio(this.getRandomAudioIndex());
    this.randomColorClass = this.getRandomColorClass();
    this.randomPooClass = this.getRandomPooClass();
  }

  getRandomAudioIndex() {
    return Math.floor(Math.random() * 4) + 1;
  }

  getRandomColorClass() {
    const classes = ['first', 'second', 'third', 'fourth'];
    const index = Math.floor(Math.random() * 4);
    return `${classes[index]}-color`;
  }

  getRandomPooClass() {
    const classes = ['poo', 'poo-storm'];
    const index = Math.floor(Math.random() * 2);
    return `fa-${classes[index]}`;
  }

}

