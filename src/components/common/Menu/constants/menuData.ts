type Menu = {
  id: number;
  text: string;
  href: string;
};

export const menuData: Menu[] = [
  { id: 1, text: '.storage.', href: '/movieStorage' },
  { id: 2, text: '.about.', href: '/about/' },
  { id: 3, text: '.search.', href: '/search' },
];
