
/**
 * @name woof
 * @author diesweed
 */

import Allpass from 'anonymous/109cc6034aba1b3f51f8';
import { dsp as bass } from 'stagas/218913c1a4538e83139d';

var delay = Allpass(sampleRate / .7 | 0);
var ap = Allpass(sampleRate / 1.6 | 0);
var dry, wet;

var ch = 1;
var out = [];
var step = .5;

export function dsp(t) {
  t *= 0.6; // play with me!
  if ((t*4) % step === 0) ch = 1 - ch;

  dry = Math.sin(1401 * t * Math.PI * 2) * Math.exp(240 * (-t/2 % step));
  dry += Math.sin(1403 * ([1.5, 1.2][(t / 2) % 2 | 0]) * t * Math.PI * 2) * Math.exp(240 * (-t/2 % step));
  wet = ap.run(dry);

  dry += bass(t*0.75) * 0.9;
  dry += delay.run(clamp(bass(t*[8,13,5,4][(t / 4) % 4 | 0]) * 5, -1, 1) * Math.exp(50 * ((((-t-14-step)/2)) % step)) * 0.3) * .9;
  
  out = [
    1.3 * dry + (ch ? wet : 0),
    1.3 * dry + (ch ? 0 : wet)
  ];
  
  return out;
}

export function clamp(t, low, high) {
  return Math.min(Math.max(t, low), high);
}
