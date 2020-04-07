/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconShuaxin = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1025 1024" width={size} height={size} {...rest}>
      <Path
        d="M823.496 473.15c-15.402-8.668-34.914-3.21-43.582 12.192-8.668 15.402-3.21 34.914 12.192 43.582l97.453 54.847c20.32 11.437 45.656-2.001 47.586-25.238 1.675-20.174 2.522-35.58 2.522-46.533C939.667 276.359 748.64 85.333 513 85.333 277.359 85.333 86.333 276.36 86.333 512c0 235.641 191.026 426.667 426.667 426.667 144.116 0 276.06-72.029 354.752-189.537 9.834-14.684 5.901-34.56-8.783-44.394-14.685-9.834-34.56-5.901-44.395 8.783C747.641 813.47 635.536 874.667 513 874.667c-200.295 0-362.667-162.372-362.667-362.667 0-200.295 162.372-362.667 362.667-362.667 197.1 0 357.476 157.232 362.543 353.11l-52.047-29.293z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconShuaxin.defaultProps = {
  size: 20,
};

export default IconShuaxin;
