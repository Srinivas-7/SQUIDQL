import React from 'react';

export type DoodleGender = 'male' | 'female' | 'auto';

interface DoodleAvatarProps {
  name?: string;
  avatarUrl?: string;
  gender?: DoodleGender;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * High-contrast Neo-Brutalist Doodle Portrait SVG generator.
 * Styled strictly with the 5-color palette:
 * Charcoal:        #1C1C1C
 * Dark Purple:     #4C1D95
 * Vivid Violet:    #A78BFA
 * Warm White:      #F4F4F0
 * Warm Silver:     #C9C5B9
 */
export const DoodleAvatar: React.FC<DoodleAvatarProps> = ({
  name = 'Cadet',
  avatarUrl: _avatarUrl,
  gender = 'auto',
  size = 'md',
  className = '',
}) => {
  // Determine doodle style based on name heuristics or explicit gender
  const nameLower = (name || '').toLowerCase();
  const femalePatterns = [
    'priya', 'neha', 'kiran', 'aria', 'sarah', 'emily', 'anna', 'laura', 'sophia',
    'claire', 'elena', 'chloe', 'zoe', 'maya', 'talia', 'ananya', 'sneha', 'rachel',
    'emma', 'olivia', 'ava', 'isabella', 'mia', 'charlotte', 'amelia', 'harper', 'she', 'her', 'woman', 'female', 'girl'
  ];
  
  const isFemale =
    gender === 'female' ||
    (gender === 'auto' && femalePatterns.some((pattern) => nameLower.includes(pattern)));

  // Generate deterministic color and doodle variant index based on name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const variant = Math.abs(hash) % 4; // 4 variants per gender

  const sizePx = {
    sm: 36,
    md: 42,
    lg: 56,
    xl: 80,
  }[size];

  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 bg-[#1C1C1C] shadow-hard-xs overflow-hidden select-none shrink-0 ${sizeClasses} ${className}`}
      title={`${name} (${isFemale ? 'Female' : 'Male'} Doodle)`}
    >
      <svg
        viewBox="0 0 100 100"
        width={sizePx}
        height={sizePx}
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Accent strictly using Vivid Violet or Dark Purple */}
        <rect width="100" height="100" fill={isFemale ? '#A78BFA' : '#4C1D95'} />

        {isFemale ? (
          /* ================= FEMALE DOODLE VARIANTS ================= */
          variant === 0 ? (
            /* Variant 0: Bob Hair + Round Geek Glasses */
            <g stroke="#1C1C1C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 44 C14 68 18 85 24 95 L76 95 C82 85 86 68 80 44 Z" fill="#1C1C1C" />
              <path d="M38 78 L38 88 M62 78 L62 88" />
              <path d="M26 100 C30 88 70 88 74 100" fill="#1C1C1C" />
              <path d="M30 40 C30 25 70 25 70 40 C70 65 65 78 50 78 C35 78 30 65 30 40 Z" fill="#F4F4F0" />
              <path d="M26 36 C38 42 62 42 74 36 C68 20 32 20 26 36 Z" fill="#4C1D95" />
              <circle cx="41" cy="49" r="8" fill="#F4F4F0" />
              <circle cx="59" cy="49" r="8" fill="#F4F4F0" />
              <path d="M49 49 L51 49" />
              <circle cx="41" cy="49" r="2.5" fill="#1C1C1C" />
              <circle cx="59" cy="49" r="2.5" fill="#1C1C1C" />
              <path d="M45 64 Q50 68 55 64" strokeWidth="3" />
              <ellipse cx="34" cy="58" rx="3.5" ry="2" fill="#4C1D95" stroke="none" />
              <ellipse cx="66" cy="58" rx="3.5" ry="2" fill="#4C1D95" stroke="none" />
            </g>
          ) : variant === 1 ? (
            /* Variant 1: High Ponytail + Wink */
            <g stroke="#1C1C1C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M68 25 C88 12 92 40 84 56" fill="#1C1C1C" />
              <circle cx="68" cy="27" r="4" fill="#4C1D95" />
              <path d="M32 98 C36 84 64 84 68 98" fill="#1C1C1C" />
              <path d="M32 40 C32 25 68 25 68 40 C68 64 62 76 50 76 C38 76 32 64 32 40 Z" fill="#F4F4F0" />
              <path d="M30 38 Q50 22 70 34 C64 18 36 18 30 38 Z" fill="#1C1C1C" />
              <circle cx="43" cy="48" r="3" fill="#1C1C1C" />
              <path d="M54 48 Q58 43 62 48" strokeWidth="3" />
              <path d="M50 51 L48 56 L52 56" strokeWidth="2.5" />
              <path d="M44 64 Q50 70 56 64" fill="#4C1D95" />
              <circle cx="30" cy="54" r="2.5" fill="#4C1D95" />
            </g>
          ) : variant === 2 ? (
            /* Variant 2: Curly Space Buns + Bandana */
            <g stroke="#1C1C1C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="28" cy="24" r="12" fill="#1C1C1C" />
              <circle cx="72" cy="24" r="12" fill="#1C1C1C" />
              <rect x="28" y="28" width="44" height="8" rx="2" fill="#4C1D95" />
              <path d="M32 42 C32 28 68 28 68 42 C68 66 62 78 50 78 C38 78 32 66 32 42 Z" fill="#F4F4F0" />
              <circle cx="42" cy="50" r="3" fill="#1C1C1C" />
              <circle cx="58" cy="50" r="3" fill="#1C1C1C" />
              <path d="M45 64 Q50 69 55 64" strokeWidth="3" />
              <circle cx="28" cy="54" r="3" fill="#4C1D95" />
              <circle cx="72" cy="54" r="3" fill="#4C1D95" />
            </g>
          ) : (
            /* Variant 3: Long Flowing Locks + Star Hairclip */
            <g stroke="#1C1C1C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 36 C16 65 18 90 28 100 L72 100 C82 90 84 65 78 36 Z" fill="#1C1C1C" />
              <path d="M32 40 C32 26 68 26 68 40 C68 64 62 76 50 76 C38 76 32 64 32 40 Z" fill="#F4F4F0" />
              <path d="M28 34 C36 44 64 44 72 34 C66 22 34 22 28 34 Z" fill="#1C1C1C" />
              {/* Star Clip */}
              <path d="M70 28 L72 32 L76 33 L73 36 L74 40 L70 38 L66 40 L67 36 L64 33 L68 32 Z" fill="#4C1D95" stroke="#1C1C1C" strokeWidth="1.5" />
              <circle cx="43" cy="49" r="3" fill="#1C1C1C" />
              <circle cx="57" cy="49" r="3" fill="#1C1C1C" />
              <path d="M45 63 Q50 68 55 63" strokeWidth="3" />
            </g>
          )
        ) : (
          /* ================= MALE DOODLE VARIANTS ================= */
          variant === 0 ? (
            /* Variant 0: Spiky Hair + Square Glasses + Smirk */
            <g stroke="#1C1C1C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M24 36 L28 16 L40 24 L50 12 L60 24 L72 14 L76 36 Z" fill="#1C1C1C" />
              <path d="M28 100 C32 86 68 86 72 100" fill="#1C1C1C" />
              <path d="M30 38 C30 26 70 26 70 38 C70 66 66 78 50 78 C34 78 30 66 30 38 Z" fill="#F4F4F0" />
              <rect x="34" y="44" width="13" height="11" fill="#F4F4F0" />
              <rect x="53" y="44" width="13" height="11" fill="#F4F4F0" />
              <path d="M47 49 L53 49" />
              <circle cx="40" cy="49" r="2.5" fill="#1C1C1C" />
              <circle cx="60" cy="49" r="2.5" fill="#1C1C1C" />
              <path d="M44 64 Q52 68 58 62" strokeWidth="3" />
            </g>
          ) : variant === 1 ? (
            /* Variant 1: Backward Cap + Stubble Beard */
            <g stroke="#1C1C1C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M26 34 C26 18 74 18 74 34 Z" fill="#A78BFA" />
              <rect x="22" y="32" width="56" height="6" rx="2" fill="#1C1C1C" />
              <path d="M30 40 C30 28 70 28 70 40 C70 65 65 78 50 78 C35 78 30 65 30 40 Z" fill="#F4F4F0" />
              <circle cx="42" cy="46" r="3" fill="#1C1C1C" />
              <circle cx="58" cy="46" r="3" fill="#1C1C1C" />
              <path d="M36 58 C36 74 64 74 64 58 L60 76 L40 76 Z" fill="#1C1C1C" />
              <path d="M45 62 Q50 66 55 62" stroke="#F4F4F0" strokeWidth="2.5" />
            </g>
          ) : variant === 2 ? (
            /* Variant 2: Headphone Gamer + Curls */
            <g stroke="#1C1C1C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 45 C20 16 80 16 78 45" stroke="#1C1C1C" strokeWidth="4" />
              <circle cx="36" cy="30" r="10" fill="#A78BFA" />
              <circle cx="50" cy="24" r="10" fill="#A78BFA" />
              <circle cx="64" cy="30" r="10" fill="#A78BFA" />
              <path d="M32 40 C32 26 68 26 68 40 C68 64 62 76 50 76 C38 76 32 64 32 40 Z" fill="#F4F4F0" />
              <rect x="18" y="42" width="9" height="16" rx="3" fill="#1C1C1C" />
              <rect x="73" y="42" width="9" height="16" rx="3" fill="#1C1C1C" />
              <circle cx="43" cy="48" r="3" fill="#1C1C1C" />
              <circle cx="57" cy="48" r="3" fill="#1C1C1C" />
              <path d="M44 62 Q50 67 56 62" strokeWidth="3" />
            </g>
          ) : (
            /* Variant 3: Beanie + Mustache */
            <g stroke="#1C1C1C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M28 38 C28 16 72 16 72 38 Z" fill="#A78BFA" />
              <rect x="24" y="34" width="52" height="7" rx="2" fill="#1C1C1C" />
              <path d="M30 40 C30 28 70 28 70 40 C70 65 65 78 50 78 C35 78 30 65 30 40 Z" fill="#F4F4F0" />
              <circle cx="42" cy="49" r="2.5" fill="#1C1C1C" />
              <circle cx="58" cy="49" r="2.5" fill="#1C1C1C" />
              <path d="M42 59 Q46 56 50 59 Q54 56 58 59 Q50 63 42 59" fill="#1C1C1C" />
              <path d="M46 66 Q50 69 54 66" strokeWidth="2.5" />
            </g>
          )
        )}
      </svg>
    </div>
  );
};
