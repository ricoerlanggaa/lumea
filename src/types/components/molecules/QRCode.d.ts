import type { CanvasHTMLAttributes } from 'react';

// https://www.qrcode.com/en/about/error_correction.html
export type QRCodeErrorLevel = 'L' | 'M' | 'Q' | 'H';
export type QRCodeStatus = 'active' | 'expired' | 'pending' | 'connected';

export interface QRCodeProps extends Omit<CanvasHTMLAttributes<HTMLCanvasElement>, 'children'> {
  value?: string;
  size?: number;
  errorLevel?: QRCodeErrorLevel;
  status?: QRCodeStatus;
  icon?: string;
  iconSize?: number;
  onRefresh?: () => void;
}
