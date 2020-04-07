/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconShezhi = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M944.48 552.461L762.126 883.128c-13.048 23.66-37.755 38.326-64.564 38.326h-362.14c-26.808 0-51.515-14.667-64.563-38.326L88.502 552.46c-12.459-22.592-12.459-50.089 0-72.68l182.356-330.668c13.048-23.66 37.755-38.326 64.564-38.326h362.14c26.808 0 51.515 14.667 64.563 38.326L944.48 479.78c12.459 22.592 12.459 50.089 0 72.681z m-55.988-31.149a10.779 10.779 0 0 0 0-10.383L706.454 180.262c-1.861-3.38-5.384-5.475-9.208-5.475h-361.51c-3.823 0-7.346 2.095-9.207 5.475L144.491 510.93a10.779 10.779 0 0 0 0 10.383l182.038 330.667c1.861 3.38 5.384 5.475 9.208 5.475h361.51c3.823 0 7.346-2.095 9.207-5.475l182.038-330.667zM513.735 682.667c-94.257 0-170.667-76.41-170.667-170.667s76.41-170.667 170.667-170.667S684.402 417.743 684.402 512s-76.41 170.667-170.667 170.667z m0-64c58.91 0 106.667-47.757 106.667-106.667 0-58.91-47.757-106.667-106.667-106.667-58.91 0-106.667 47.757-106.667 106.667 0 58.91 47.757 106.667 106.667 106.667z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconShezhi.defaultProps = {
  size: 20,
};

export default IconShezhi;