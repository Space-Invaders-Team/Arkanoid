export type Props = {
  isRunStartAnimation: boolean,
  level: number,
  onClick(): void,
  onChangeLevel(operator: 1 | -1): void
};
