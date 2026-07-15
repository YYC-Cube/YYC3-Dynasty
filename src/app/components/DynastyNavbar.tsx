import { Link, useLocation } from 'react-router';
import { Suspense, lazy } from 'react';
import { Bell, User } from 'lucide-react';
import { motion } from 'motion/react';

const LanguageSwitcher = lazy(() => import('./LanguageSwitcher'));

export function DynastyNavbar() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: '看板', icon: '🏛️' },
    { path: '/court', label: '朝堂', icon: '🏯' },
    { path: '/timeline', label: '王朝', icon: '📜' },
    { path: '/edict', label: '旨意', icon: '📋' },
    { path: '/bridge', label: '双星桥', icon: '🌉' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-[#0a0e17]/95 backdrop-blur-md border-b border-accent-gold/15 z-50 flex items-center px-6">
      <div className="flex items-center gap-3 w-1/4">
        <div className="w-8 h-8 rounded border border-accent-gold/50 flex items-center justify-center text-accent-gold font-ancient text-xl leading-none pt-1">
          玺
        </div>
        <span className="font-serif-sc font-bold text-accent-gold tracking-widest">
          YYC³ Dynasty
        </span>
      </div>

      <div className="flex-1 flex justify-center h-full">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative h-full flex items-center px-6 text-sm group"
            >
              <span
                className={`flex items-center gap-2 font-serif-sc transition-colors ${isActive ? 'text-accent-gold' : 'text-text-secondary group-hover:text-text-primary'}`}
              >
                <span className="text-base">{item.icon}</span> {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-gold"
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="w-1/4 flex justify-end items-center gap-4 text-text-secondary">
        <Suspense fallback={null}>
          <LanguageSwitcher />
        </Suspense>
        <button className="relative hover:text-accent-gold transition-colors p-1">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent-red rounded-full" />
        </button>
        <button className="w-8 h-8 rounded-full border border-text-secondary/30 flex items-center justify-center hover:border-accent-gold hover:text-accent-gold transition-colors">
          <User className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
