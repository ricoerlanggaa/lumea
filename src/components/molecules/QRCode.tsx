'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { CheckmarkCircle02Icon, RefreshIcon } from 'hugeicons-react';
import { classNames } from '@/utilities/formats/string';
import { QRCodeProps } from '@/types/components/molecules';

export default function QRCode({
  value,
  size = 160,
  errorLevel = 'M',
  icon,
  iconSize = 40,
  status = 'active',
  className,
  onRefresh,
  ...rest
}: QRCodeProps) {
  const qrCodeClasses = classNames('relative border-2 rounded-lg w-fit bg-white p-2', className);
  const imageSettings = icon
    ? { excavate: false, width: iconSize, height: iconSize, src: icon }
    : undefined;
  return (
    <div className={qrCodeClasses}>
      {status !== 'active' && (
        <div
          className="absolute top-0 left-0 w-full flex flex-col items-center justify-center rounded-lg h-full z-10"
          style={{ backgroundColor: 'rgba(255,255,255,0.96)' }}
        >
          {status === 'pending' && (
            <div className="w-1/3 h-1/3 rounded-full animate-spin border-[6px] border-[darkgrey] border-solid border-t-transparent" />
          )}
          {status === 'expired' && (
            <div className="text-center">
              <p>QR code expired</p>
              <button
                type="button"
                className="btn btn-sm btn-info btn-link pl-0"
                onClick={onRefresh}
              >
                <RefreshIcon size={16} />
                Refresh
              </button>
            </div>
          )}
          {status === 'connected' && (
            <span className="inline-flex items-center">
              <CheckmarkCircle02Icon size={20} className="text-success mr-1" />
              Connected
            </span>
          )}
        </div>
      )}
      <QRCodeCanvas
        value={value ?? ''}
        size={size}
        level={errorLevel}
        imageSettings={imageSettings}
        {...rest}
      />
    </div>
  );
}
