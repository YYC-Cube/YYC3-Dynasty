import { motion } from 'motion/react';

export type SealState = 'idle' | 'hover' | 'pressing' | 'stamped' | 'locked';

interface ImperialSealProps {
  state: SealState;
  onClick?: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  className?: string;
}

export function ImperialSeal({
  state,
  onClick,
  onHoverStart,
  onHoverEnd,
  className = '',
}: ImperialSealProps) {
  const isLocked = state === 'locked';
  const isStamped = state === 'stamped';

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      disabled={isLocked || isStamped || state === 'pressing'}
      className={`relative w-20 h-20 rounded-md border-2 bg-gradient-to-b from-[#f9f9f9] to-[#e5e5e5] shadow-[0_8px_32px_rgba(212,168,67,0.3)] flex flex-col items-center justify-center transition-all ${
        isLocked
          ? 'grayscale opacity-50 border-white/20 shadow-none cursor-not-allowed'
          : 'border-accent-gold/80 cursor-pointer'
      } ${className}`}
      animate={{
        scale: state === 'hover' ? 1.1 : state === 'pressing' ? 0.95 : state === 'stamped' ? 1 : 1,
        y: state === 'hover' ? -8 : state === 'pressing' ? 8 : 0,
        boxShadow:
          state === 'hover'
            ? '0 12px 40px rgba(212,168,67,0.5)'
            : '0 8px 32px rgba(212,168,67,0.3)',
      }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
    >
      {/* 螭虎钮 (Dragon Knob) representation */}
      <div className="absolute -top-4 w-10 h-6 bg-gradient-to-t from-[#e5e5e5] to-[#fcfcfc] rounded-t-lg border-2 border-b-0 border-accent-gold/60 shadow-inner flex items-center justify-center">
        <div className="w-4 h-2 rounded-full border border-accent-gold/40" />
      </div>

      {isLocked ? (
        <div className="text-2xl mt-2">🔒</div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full p-1 mt-2">
          {/* 九叠篆印文 Fake representation */}
          <div
            className={`grid grid-cols-2 gap-[2px] w-full h-full p-1 border-2 ${isStamped ? 'border-accent-red text-accent-red' : 'border-accent-gold/30 text-accent-gold/30'} font-ancient text-sm leading-none`}
          >
            <div className="flex flex-col justify-center items-center">受既</div>
            <div className="flex flex-col justify-center items-center">命寿</div>
            <div className="flex flex-col justify-center items-center">于永</div>
            <div className="flex flex-col justify-center items-center">天昌</div>
          </div>
        </div>
      )}

      {/* Stamped Ink Ripple Effect */}
      {state === 'pressing' && (
        <motion.div
          className="absolute inset-0 rounded-md border-4 border-accent-red"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.4, 0], scale: 1.5 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Stamped Particles */}
      {isStamped && (
        <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Decorative burst dots */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-accent-gold rounded-full"
              initial={{ x: '50%', y: '50%', scale: 0 }}
              animate={{
                x: `calc(50% + ${Math.cos((i * Math.PI) / 4) * 50}px)`,
                y: `calc(50% + ${Math.sin((i * Math.PI) / 4) * 50}px)`,
                scale: [0, 1, 0],
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          ))}
        </motion.div>
      )}
    </motion.button>
  );
}
