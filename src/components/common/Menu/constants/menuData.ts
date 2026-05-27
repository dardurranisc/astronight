type Menu = {
  id: number;
  text: string;
  href: string;
  type: 'link' | 'modal';
};

export const menuData: Menu[] = [
  { id: 1, text: '.storage.', href: '/storage', type: 'link' },
  { id: 2, text: '.about.', href: '/about', type: 'link' },
  { id: 3, text: '.search.', href: '/#', type: 'modal' },
];
