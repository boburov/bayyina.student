import { NavLink } from 'react-router-dom';
import { Home, User, Wallet, Bell } from 'lucide-react';

const navItems = [
  { to: '/dashboard',     label: 'Bosh sahifa',  icon: Home  },
  { to: '/moliya',        label: 'Moliya',        icon: Wallet },
  { to: '/notifications', label: 'Xabarnomalar', icon: Bell  },
  { to: '/profil',        label: 'Profil',        icon: User  },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-50">
      <div className="max-w-sm mx-auto flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-3 px-3 text-xs font-medium transition-colors border-t-2 ${
                isActive
                  ? 'text-brown-600 border-brown-600'
                  : 'text-stone-400 border-transparent hover:text-stone-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
