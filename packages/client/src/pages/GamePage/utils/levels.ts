// eslint-disable-next-line @typescript-eslint/naming-convention
const _ = false;
const O = true;

export const LEVELS = new Map([
  [1, [
    [_, _, _, _, O, _, _, _, _, _, O, _, _, _, _],
    [_, _, _, _, _, O, _, _, _, O, _, _, _, _, _],
    [_, _, _, _, O, O, O, O, O, O, O, _, _, _, _],
    [_, _, _, O, O, _, O, O, O, _, O, O, _, _, _],
    [_, _, O, O, O, _, O, O, O, _, O, O, O, _, _],
    [_, O, O, O, O, O, O, O, O, O, O, O, O, O, _],
    [_, O, O, O, O, O, O, O, O, O, O, O, O, O, _],
    [_, O, _, O, _, _, _, _, _, _, _, O, _, O, _],
    [_, O, _, O, _, _, _, _, _, _, _, O, _, O, _],
    [_, _, _, O, O, O, O, _, O, O, O, O, _, O, _],
    [_, _, _, _, O, O, O, _, O, O, O, _, _, _, _],
  ]],
  [2, [
    [O, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [O, O, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [O, O, O, _, _, _, _, _, _, _, _, _, _, _, _],
    [O, O, O, O, _, _, _, _, _, _, _, _, _, _, _],
    [O, O, O, O, O, _, _, _, _, _, _, _, _, _, _],
    [O, O, O, O, O, O, _, _, _, _, _, _, _, _, _],
    [O, O, O, O, O, O, O, _, _, _, _, _, _, _, _],
    [O, O, O, O, O, O, O, O, _, _, _, _, _, _, _],
    [O, O, O, O, O, O, O, O, O, _, _, _, _, _, _],
    [O, O, O, O, O, O, O, O, O, O, _, _, _, _, _],
    [O, O, O, O, O, O, O, O, O, O, O, _, _, _, _],
    [O, O, O, O, O, O, O, O, O, O, O, O, _, _, _],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, _, _],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, _],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
  ]],
  [3, [
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, _, _, _, _, _, _, _, _, _, _, _, _, _, O],
    [O, _, O, O, O, O, O, O, O, O, O, O, O, _, O],
    [O, _, O, _, _, _, _, _, _, _, _, _, O, _, O],
    [O, _, O, _, O, O, O, O, O, O, O, _, O, _, O],
    [O, _, O, _, O, O, O, O, O, O, O, _, O, _, O],
    [O, _, O, _, _, _, _, _, _, _, O, _, O, _, O],
    [O, _, O, O, O, O, O, O, O, O, O, _, O, _, O],
    [O, _, _, _, _, _, _, _, _, _, _, _, O, _, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
  ]],
  [4, [
    [_, _, _, _, _, _, O, O, O, _, _, _, _, _, _],
    [_, _, _, _, O, O, _, _, _, O, O, _, _, _, _],
    [_, _, _, O, _, _, _, _, _, _, _, O, _, _, _],
    [_, _, O, _, _, O, _, _, _, O, _, _, O, _, _],
    [_, O, _, _, _, _, _, _, _, _, _, _, _, O, _],
    [_, O, _, _, _, _, _, O, _, _, _, _, _, O, _],
    [_, _, O, _, _, O, _, _, _, O, _, _, O, _, _],
    [_, _, _, O, _, _, O, _, O, _, _, O, _, _, _],
    [_, _, O, _, O, _, _, O, _, _, O, _, O, _, _],
    [_, O, _, _, _, O, _, _, _, O, _, _, _, O, _],
    [O, _, _, _, _, _, O, O, O, _, _, _, _, _, O],
  ]],
  [5, [
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, _, _, _, _, _, _, _, _, _, _, _, _, _, O],
    [O, _, O, O, O, O, O, O, O, O, O, O, O, _, O],
    [O, _, O, _, _, _, _, _, _, _, _, _, O, _, O],
    [O, _, O, _, O, O, O, O, O, O, O, _, O, _, O],
    [O, _, O, _, O, O, O, O, O, O, O, _, O, _, O],
    [O, _, O, _, _, _, _, _, _, _, _, _, O, _, O],
    [O, _, O, O, O, O, O, O, O, O, O, O, O, _, O],
    [O, _, _, _, _, _, _, _, _, _, _, _, _, _, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
  ]],
  [6, [
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
  ]],
]);
