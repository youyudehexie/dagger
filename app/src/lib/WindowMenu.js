import NativeRequire from './NativeRequire';
import {MENU_TEMPLATE} from '../constants/menu';

const remote = NativeRequire('remote');
export const Menu = remote.require('menu');
export const MenuItem = remote.require('menu-item');

const menu = Menu.buildFromTemplate(MENU_TEMPLATE);
Menu.setApplicationMenu(menu);
module.module = menu;

