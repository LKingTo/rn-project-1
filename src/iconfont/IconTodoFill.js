/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconTodoFill = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M725.333333 85.333333h128a42.666667 42.666667 0 0 1 42.666667 42.666667v768a42.666667 42.666667 0 0 1-42.666667 42.666667H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V128a42.666667 42.666667 0 0 1 42.666667-42.666667h128V0h85.333333v85.333333h256V0h85.333333v85.333333zM298.666667 341.333333v85.333334h426.666666V341.333333H298.666667z m0 170.666667v85.333333h426.666666v-85.333333H298.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconTodoFill.defaultProps = {
  size: 20,
};

export default IconTodoFill;
