/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconJianshao = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 938.667C276.359 938.667 85.333 747.64 85.333 512 85.333 276.359 276.36 85.333 512 85.333c235.641 0 426.667 191.026 426.667 426.667 0 235.641-191.026 426.667-426.667 426.667z m0-64c200.295 0 362.667-162.372 362.667-362.667 0-200.295-162.372-362.667-362.667-362.667-200.295 0-362.667 162.372-362.667 362.667 0 200.295 162.372 362.667 362.667 362.667zM352 480h320c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H352c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconJianshao.defaultProps = {
  size: 20,
};

export default IconJianshao;
