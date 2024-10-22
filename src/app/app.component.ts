import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0,  transform: '{{startRotationParam}}'}),
        animate('50ms', style({opacity: 1, transform: '{{startRotationParam}}'})),
      ],  {params: {startRotationParam: 'rotate(180deg)'}}),
      transition(':leave', [
        animate('2s', style({opacity: .9, transform: '{{endRotationParam}}'}))
      ],  {params: {endRotationParam: 'rotate(180deg)'}})
    ]),
    trigger('fullRotate', [
      transition(':enter', [
        style({transform: 'rotate(0deg)'}),
        animate('2s', style({transform: 'rotate(720deg)'}))
      ])
    ])
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
  startRotationParam = 'rotate(-90deg)';
  endRotationParam = 'rotate(90deg)';

  turnAnimation() {
    this.animateImage = !this.animateImage;
    this.startRotationParam = this.getRandomRotationTransform();
    this.endRotationParam = this.getRandomRotationTransform();
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

  getRandomRotationTransform = () => {
    const values = ['rotate(15deg)', 'rotate(-15deg)', 'rotate(65deg)', 'rotate(-40deg)', 'rotate(180deg)', 'rotate(-180deg)']
    const index = Math.floor(Math.random() * values.length);
    return values[index];
  }

}

