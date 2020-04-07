/* eslint-disable */

import React from 'react';

import IconJia from './IconJia';
import IconRight from './IconRight';
import IconLeft from './IconLeft';
import IconUp from './IconUp';
import IconDown from './IconDown';
import IconBianji from './IconBianji';
import IconChenggong from './IconChenggong';
import IconFenxiang from './IconFenxiang';
import IconDianzan from './IconDianzan';
import IconJianshao from './IconJianshao';
import IconPengyouquan from './IconPengyouquan';
import IconShanchu from './IconShanchu';
import IconShezhi from './IconShezhi';
import IconSaoyisao from './IconSaoyisao';
import IconSousuo from './IconSousuo';
import IconWeixin from './IconWeixin';
import IconTupian from './IconTupian';
import IconShuaxin from './IconShuaxin';
import IconXiazai from './IconXiazai';
import IconShoucang from './IconShoucang';
import IconZengjia from './IconZengjia';
import IconFileEditLine from './IconFileEditLine';
import IconTodoFill from './IconTodoFill';
import IconTodoLine from './IconTodoLine';

export const WIcon = ({ name, ...rest }) => {
  switch (name) {
    case 'jia':
      return <IconJia {...rest} />;
    case 'right':
      return <IconRight {...rest} />;
    case 'left':
      return <IconLeft {...rest} />;
    case 'up':
      return <IconUp {...rest} />;
    case 'down':
      return <IconDown {...rest} />;
    case 'bianji':
      return <IconBianji {...rest} />;
    case 'chenggong':
      return <IconChenggong {...rest} />;
    case 'fenxiang':
      return <IconFenxiang {...rest} />;
    case 'dianzan':
      return <IconDianzan {...rest} />;
    case 'jianshao':
      return <IconJianshao {...rest} />;
    case 'pengyouquan':
      return <IconPengyouquan {...rest} />;
    case 'shanchu':
      return <IconShanchu {...rest} />;
    case 'shezhi':
      return <IconShezhi {...rest} />;
    case 'saoyisao':
      return <IconSaoyisao {...rest} />;
    case 'sousuo':
      return <IconSousuo {...rest} />;
    case 'weixin':
      return <IconWeixin {...rest} />;
    case 'tupian':
      return <IconTupian {...rest} />;
    case 'shuaxin':
      return <IconShuaxin {...rest} />;
    case 'xiazai':
      return <IconXiazai {...rest} />;
    case 'shoucang':
      return <IconShoucang {...rest} />;
    case 'zengjia':
      return <IconZengjia {...rest} />;
    case 'file-edit-line':
      return <IconFileEditLine {...rest} />;
    case 'todo-fill':
      return <IconTodoFill {...rest} />;
    case 'todo-line':
      return <IconTodoLine {...rest} />;
  }

  return null;
};

export default WIcon;
