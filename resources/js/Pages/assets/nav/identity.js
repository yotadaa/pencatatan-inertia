import dashboardIcon from './dashboard.png';
import itemIcon from './product.png';
import userIcon from '../user.png';
import settingsIcon from '../settings.png';
import inboundIcon from '../inbox.png';
import outboundIcon from '../unpacking.png';
import Items from '../../components/items/Items';
import Inbound from '../../components/inbound/Inbound';
import Outbound from '../../components/outbound/Outbound';
import Users from '../../components/users/Users';
import Settings from '../../components/settings/Settings';
import Content from '../../components/main/Content';

export const menu = [
    {
        name: 'Dashboard',
        icon: dashboardIcon,
        bg: '#E2E8F0',
        path: 'dashboard',
        element: Content

    },
    {
        name: 'Items',
        icon: itemIcon,
        bg: '#E2E8F0',
        path: 'items',
        element: Items
    },
    {
        name: 'Inbound',
        icon: inboundIcon,
        bg: '#FDBA74',
        path: 'inbound',
        element: Inbound
    },
    {
        name: 'Outbound',
        icon: outboundIcon,
        bg: '#6EE7B7',
        path: 'outbound',
        element: Outbound
    },
    {
        name: 'User',
        icon: userIcon,
        bg: '#E2E8F0',
        path: 'users',
        element: Users
    },
    {
        name: 'Pengaturan',
        icon: settingsIcon,
        bg: '#E2E8F0',
        path: 'settings',
        element: Settings
    },
];

export function storeCurrentMenu(value) {
    localStorage.setItem('current-menu', value);
}

export function retrieveCurrentMenu() {
    return localStorage.getItem('current-menu');
}
