export abstract class Constants {
  // this are only proportional since we are using Phaser.Scale.FIT
  static readonly GAME_WINDOW_WIDTH: number = 1100;
  static readonly GAME_WINDOW_HEIGHT: number = 600;
  static readonly BACKGROUND_COLOR: number = 0xDBD9D9;
  static readonly PRIMARY_COLOR: number = 0xFFFFFF;
  static readonly SECONDARY_COLOR: number = 0x403932;
  static readonly ERROR_COLOR: number = 0xFF0000;
  static readonly HIGHLIGHT_COLORS: Array<number> = [0xFF4E02, 0x1AB157, 0xFE86B3, 0x4470E7, 0xFD9A1D];
}
