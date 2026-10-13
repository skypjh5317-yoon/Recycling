import React from 'react';

interface MascotAvatarProps {
  id: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  expression?: 'happy' | 'thinking' | 'wink' | 'cheer';
  className?: string;
  showBadge?: boolean;
}

export const MascotAvatar: React.FC<MascotAvatarProps> = ({
  id,
  size = 'md',
  expression = 'happy',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const currentSize = sizeMap[size];

  // Specific colors & styles per mascot
  const getMascotDetails = () => {
    switch (id) {
      case 'peti':
        return {
          bodyColor: '#38bdf8', // sky-400
          bellyColor: '#bae6fd',
          cheekColor: '#f472b6',
          accessory: 'droplet',
          accent: '#0284c7',
        };
      case 'jongi':
        return {
          bodyColor: '#f59e0b', // amber-500
          bellyColor: '#fef3c7',
          cheekColor: '#fb7185',
          accessory: 'paper-cap',
          accent: '#b45309',
        };
      case 'candi':
        return {
          bodyColor: '#8b5cf6', // violet-500
          bellyColor: '#ede9fe',
          cheekColor: '#ec4899',
          accessory: 'crown',
          accent: '#6d28d9',
        };
      case 'bini':
        return {
          bodyColor: '#14b8a6', // teal-500
          bellyColor: '#ccfbf1',
          cheekColor: '#f472b6',
          accessory: 'cloud-ears',
          accent: '#0f766e',
        };
      case 'glassy':
        return {
          bodyColor: '#10b981', // emerald-500
          bellyColor: '#d1fae5',
          cheekColor: '#fb7185',
          accessory: 'glasses',
          accent: '#047857',
        };
      case 'yamyam':
        return {
          bodyColor: '#f97316', // orange-500
          bellyColor: '#ffedd5',
          cheekColor: '#f43f5e',
          accessory: 'detective',
          accent: '#c2410c',
        };
      case 'special':
        return {
          bodyColor: '#f43f5e', // rose-500
          bellyColor: '#ffe4e6',
          cheekColor: '#fb7185',
          accessory: 'hard-hat',
          accent: '#be123c',
        };
      case 'chorok':
      default:
        return {
          bodyColor: '#22c55e', // green-500
          bellyColor: '#dcfce7',
          cheekColor: '#f472b6',
          accessory: 'leaf-sprout',
          accent: '#15803d',
        };
    }
  };

  const details = getMascotDetails();

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${currentSize} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="soft-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Head / Body Base */}
        <circle
          cx="50"
          cy="52"
          r="40"
          fill={details.bodyColor}
          filter="url(#soft-glow)"
        />

        {/* Belly / Soft highlight */}
        <ellipse
          cx="50"
          cy="66"
          rx="26"
          ry="18"
          fill={details.bellyColor}
          opacity="0.9"
        />

        {/* Cheeks (Blush) */}
        <ellipse cx="25" cy="58" rx="6" ry="3.5" fill={details.cheekColor} opacity="0.65" />
        <ellipse cx="75" cy="58" rx="6" ry="3.5" fill={details.cheekColor} opacity="0.65" />

        {/* Expressions */}
        {expression === 'happy' && (
          <>
            {/* Round sparkling eyes */}
            <circle cx="34" cy="48" r="4.5" fill="#1e293b" />
            <circle cx="36" cy="46" r="1.5" fill="#ffffff" />
            <circle cx="66" cy="48" r="4.5" fill="#1e293b" />
            <circle cx="68" cy="46" r="1.5" fill="#ffffff" />
            {/* Gentle smile */}
            <path
              d="M 43 56 Q 50 64 57 56"
              stroke="#1e293b"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}

        {expression === 'wink' && (
          <>
            {/* Left Eye: Sparkle open */}
            <circle cx="34" cy="48" r="4.5" fill="#1e293b" />
            <circle cx="36" cy="46" r="1.5" fill="#ffffff" />
            {/* Right Eye: Cute arch wink */}
            <path
              d="M 62 49 Q 67 43 72 49"
              stroke="#1e293b"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Playful open smile */}
            <path
              d="M 43 56 Q 50 65 57 56 Z"
              fill="#ef4444"
              stroke="#1e293b"
              strokeWidth="2"
            />
          </>
        )}

        {expression === 'thinking' && (
          <>
            {/* Questioning eyes looking up-right */}
            <circle cx="36" cy="45" r="4" fill="#1e293b" />
            <circle cx="38" cy="43" r="1.5" fill="#ffffff" />
            <circle cx="68" cy="45" r="4" fill="#1e293b" />
            <circle cx="70" cy="43" r="1.5" fill="#ffffff" />
            {/* Cute 'o' mouth */}
            <ellipse cx="50" cy="58" rx="3.5" ry="4.5" fill="#1e293b" />
          </>
        )}

        {expression === 'cheer' && (
          <>
            {/* Happy arch eyes (^^) */}
            <path
              d="M 28 50 Q 34 43 40 50"
              stroke="#1e293b"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 60 50 Q 66 43 72 50"
              stroke="#1e293b"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Big wide open smile with tongue */}
            <path
              d="M 40 55 Q 50 68 60 55 Z"
              fill="#ef4444"
              stroke="#1e293b"
              strokeWidth="2"
            />
            <path
              d="M 44 60 Q 50 67 56 60 Z"
              fill="#fbcfe8"
            />
          </>
        )}

        {/* Mascot-Specific Accessories */}
        {details.accessory === 'leaf-sprout' && (
          <g>
            {/* Sprout stem */}
            <path
              d="M 50 14 Q 48 6 52 2"
              stroke="#15803d"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left little leaf */}
            <path
              d="M 50 6 Q 36 2 40 12 Q 46 16 50 10 Z"
              fill="#86efac"
              stroke="#15803d"
              strokeWidth="1.5"
            />
            {/* Right little leaf */}
            <path
              d="M 51 5 Q 64 0 62 10 Q 56 15 51 9 Z"
              fill="#4ade80"
              stroke="#15803d"
              strokeWidth="1.5"
            />
          </g>
        )}

        {details.accessory === 'droplet' && (
          <g>
            {/* Water droplet tiara / head jewel */}
            <path
              d="M 50 4 Q 58 14 50 20 Q 42 14 50 4 Z"
              fill="#bae6fd"
              stroke="#0284c7"
              strokeWidth="2"
            />
            <circle cx="48" cy="11" r="1.5" fill="#ffffff" />
          </g>
        )}

        {details.accessory === 'paper-cap' && (
          <g>
            {/* Paper boat / folded origami cap */}
            <polygon
              points="28,20 72,20 50,2"
              fill="#fef08a"
              stroke="#b45309"
              strokeWidth="2"
            />
            <polygon
              points="38,20 62,20 50,9"
              fill="#fde047"
            />
          </g>
        )}

        {details.accessory === 'crown' && (
          <g>
            {/* Shiny can crown */}
            <polygon
              points="32,20 30,8 40,14 50,6 60,14 70,8 68,20"
              fill="#fde047"
              stroke="#ca8a04"
              strokeWidth="2"
            />
            <circle cx="50" cy="9" r="1.5" fill="#ef4444" />
          </g>
        )}

        {details.accessory === 'glasses' && (
          <g>
            {/* Round safety spectacles */}
            <circle cx="34" cy="48" r="9" stroke="#065f46" strokeWidth="2.5" fill="none" opacity="0.8" />
            <circle cx="66" cy="48" r="9" stroke="#065f46" strokeWidth="2.5" fill="none" opacity="0.8" />
            <line x1="43" y1="48" x2="57" y2="48" stroke="#065f46" strokeWidth="2.5" />
          </g>
        )}

        {details.accessory === 'detective' && (
          <g>
            {/* Detective cap */}
            <ellipse cx="50" cy="18" rx="26" ry="8" fill="#c2410c" />
            <path d="M 28 17 Q 50 6 72 17" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
          </g>
        )}

        {details.accessory === 'hard-hat' && (
          <g>
            {/* Safety Helmet */}
            <path
              d="M 24 22 C 24 8, 76 8, 76 22 Z"
              fill="#fbbf24"
              stroke="#b45309"
              strokeWidth="2"
            />
            <ellipse cx="50" cy="22" rx="28" ry="4" fill="#f59e0b" />
          </g>
        )}

        {details.accessory === 'cloud-ears' && (
          <g>
            {/* Cute cloud puffs */}
            <circle cx="20" cy="28" r="7" fill="#99f6e4" />
            <circle cx="80" cy="28" r="7" fill="#99f6e4" />
          </g>
        )}
      </svg>
    </div>
  );
};
