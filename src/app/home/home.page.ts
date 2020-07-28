import { Component, AfterViewInit, ViewChildren, ElementRef, QueryList, NgZone } from '@angular/core';
import {  GestureController, IonCard, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  people = [
    {
      name: 'Superman',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1l8vkq6s_Trbvni9AS0iySKgeHxkFPu4jkA&usqp=CAU',
      power: '9'
    },
    {
      name: 'Batman',
      img: 'https://vignette.wikia.nocookie.net/marvel_dc/images/a/a6/Batman_Vol_2_2_Variant_Textless.jpg/revision/latest/top-crop/width/360/height/450?cb=20120228075313',
      power: '10'
    },
    {
      name: 'Flash',
      img: 'https://vignette.wikia.nocookie.net/p__/images/b/bf/The-Flash.jpg/revision/latest/scale-to-width-down/340?cb=20120131042146&path-prefix=protagonist',
      power: '6.5'
    }
  ];

  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef>;
  //longPressActive = false;
  constructor(private gestureCtrl: GestureController, private zone: NgZone, private plt: Platform) {}

  ngAfterViewInit() {
    const cardArray = this.cards.toArray();

    //this.useLongPress(cardArray);
    this.useSwipe(cardArray);
  }

  // useLongPress(cardArray) {
  //   for (let i = 0; i < cardArray.length; i++) {
  //     const card = cardArray[i];
  //     const gesture= this.gestureCtrl.create({
  //       el: card.nativeElement,
  //       gestureName: 'long-press',
  //       onStart: ev => {
  //         this.longPressActive = true;
  //         this.increasePower(i);
  //       },
  //       onEnd: ev => {
  //         this.longPressActive = false;
  //       }
  //     });
  //     gesture.enable(true);
  //   }
  // }

  // increasePower(i) {
  //   setTimeout(() => {
  //     if (this.longPressActive) {
  //       this.zone.run(() => {
  //         this.people[i].power++;
  //         this.increasePower(i);
  //     }cmd
  //       )}
  //   }, 200)
  // } 

  useSwipe(cardArray) {
    for (let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i];

      const gesture= this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'swipe',
        onStart: ev => {
          
        },
        onMove: ev  => {
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
          this.setCardColor(ev.deltaX, card.nativeElement);
        },
        onEnd: ev => {
          card.nativeElement.style.transition = '1.5s ease-out';

          if (ev.deltaX > 150) {
            card.nativeElement.style.transform = `translateX(${+this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;

          } else if (ev.deltaX < -150) {
            card.nativeElement.style.transform = `translateX(-${+this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
          } else {
            card.nativeElement.style.transform = '';
          }
        }
      });
      gesture.enable(true);
    }
  }

  setCardColor(x, element) {
    let color = '';
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    const hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    element.style.background = color;
  }

  decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    padding = typeof padding === 'undefined' || padding === null ? (padding = 2) : padding;

    while (hex.length < padding) {
      hex = '0' + hex;
    }

    return hex;
  }
  

}
