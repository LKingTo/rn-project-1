/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconPengyouquan = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M177.743 652.953c30.927 73.25 85.228 134.218 153.557 173.56V515.697L192.491 645.143a31.852 31.852 0 0 1-14.748 7.81z m-19.994-62.922l209.709-195.564H170.667c-0.62 0-1.236-0.018-1.847-0.052-12.631 36.874-19.487 76.429-19.487 117.585 0 26.788 2.905 52.898 8.416 78.031z m302.079-195.564a32.059 32.059 0 0 1-5.151 6.175l-62.107 57.917a31.889 31.889 0 0 1 2.73 12.953v79.541a31.914 31.914 0 0 1 9.794 7l67.58 70.855H563.232l68.306-72.94v-95.873l-68.182-66.822a32.025 32.025 0 0 1-8.69 1.194h-94.84zM395.23 855.458c36.641 12.454 75.916 19.209 116.769 19.209 32.767 0 64.52-4.346 94.712-12.492L395.3 640.514v212.82c0 0.713-0.023 1.422-0.07 2.124zM670.7 838.192c65.273-31.816 119.573-82.647 155.694-145.284h-292.68l131.942 138.34a32.034 32.034 0 0 1 5.044 6.944z m184.689-209.219c12.498-36.7 19.278-76.044 19.278-116.973 0-36.662-5.44-72.053-15.557-105.41L650.915 628.908h202.418c0.69 0 1.376 0.022 2.056 0.065zM197.967 330.467h301.306L359.54 193.521a31.982 31.982 0 0 1-5.893-7.882c-65.21 31.7-119.495 82.367-155.68 144.828z m220.378-168.925l213.194 208.941V175.291c0-1.918 0.168-3.798 0.492-5.623-37.569-13.172-77.963-20.335-120.031-20.335-32.385 0-63.779 4.245-93.655 12.209z m277.194 285.085v41L829.976 344.07a32.376 32.376 0 0 1 2.353-2.272c-31.549-59.253-79.058-108.719-136.79-142.66v247.49zM512 938.667C276.359 938.667 85.333 747.64 85.333 512 85.333 276.359 276.36 85.333 512 85.333c235.641 0 426.667 191.026 426.667 426.667 0 235.641-191.026 426.667-426.667 426.667z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconPengyouquan.defaultProps = {
  size: 20,
};

export default IconPengyouquan;
