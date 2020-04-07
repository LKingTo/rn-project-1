/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconBianji = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M862.706 116.04c12.497-12.498 32.758-12.498 45.255 0 12.497 12.496 12.497 32.757 0 45.254l-452.52 452.52c-12.497 12.497-32.758 12.497-45.255 0s-12.497-32.758 0-45.255l452.52-452.52zM853.333 448c0-17.673 14.327-32 32-32 17.673 0 32 14.327 32 32v352c0 64.801-52.532 117.333-117.333 117.333H224c-64.801 0-117.333-52.532-117.333-117.333V224c0-64.801 52.532-117.333 117.333-117.333h341.333c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H224c-29.455 0-53.333 23.878-53.333 53.333v576c0 29.455 23.878 53.333 53.333 53.333h576c29.455 0 53.333-23.878 53.333-53.333V448z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconBianji.defaultProps = {
  size: 20,
};

export default IconBianji;
