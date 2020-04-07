/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

export const IconFileEditLine = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M896 288.298667l-85.333333 85.333333V170.666667h-384v213.333333H213.333333v469.333333h597.333334v-117.632l85.333333-85.333333v245.973333a42.368 42.368 0 0 1-42.368 42.325334H170.368A42.666667 42.666667 0 0 1 128 895.701333V341.333333l256.128-256h469.12C876.8 85.333333 896 104.746667 896 127.658667v160.64z m33.194667 87.466666l60.330666 60.373334L657.664 768l-60.416-0.085333 0.085333-60.245334 331.861334-331.861333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFileEditLine.defaultProps = {
  size: 20,
};

export default IconFileEditLine;
