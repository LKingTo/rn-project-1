/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconTodoLine = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M725.333333 85.333333h128a42.666667 42.666667 0 0 1 42.666667 42.666667v768a42.666667 42.666667 0 0 1-42.666667 42.666667H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V128a42.666667 42.666667 0 0 1 42.666667-42.666667h128V0h85.333333v85.333333h256V0h85.333333v85.333333z m0 85.333334v85.333333h-85.333333V170.666667H384v85.333333H298.666667V170.666667H213.333333v682.666666h597.333334V170.666667h-85.333334zM298.666667 341.333333h426.666666v85.333334H298.666667V341.333333z m0 170.666667h426.666666v85.333333H298.666667v-85.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconTodoLine.defaultProps = {
  size: 20,
};

export default IconTodoLine;
