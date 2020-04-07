/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  name: 'jia' | 'right' | 'left' | 'up' | 'down' | 'bianji' | 'chenggong' | 'fenxiang' | 'dianzan' | 'jianshao' | 'pengyouquan' | 'shanchu' | 'shezhi' | 'saoyisao' | 'sousuo' | 'weixin' | 'tupian' | 'shuaxin' | 'xiazai' | 'shoucang' | 'zengjia' | 'file-edit-line' | 'todo-fill' | 'todo-line';
  size?: number;
  color?: string | string[];
}

export declare const WIcon: FunctionComponent<Props>;

export default WIcon;
