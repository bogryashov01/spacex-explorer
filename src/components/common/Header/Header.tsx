'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Header.module.scss';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/favorites', label: 'Favorites' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          SpaceX Explorer
        </Link>

        <nav aria-label="Main navigation" className={styles.nav}>
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
                aria-current={isActive ? 'page' : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
