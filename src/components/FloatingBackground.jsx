import React from 'react';

const FloatingBackground = () => {
  // Food emojis for floating elements
  const foodIcons = ['🍕', '🍔', '🌮', '🍜', '🥗', '🍝', '🥘', '🍲', '🥙', '🌯', '🥞', '🧇'];
  
  // Generate random positions and animations for floating elements
  const floatingElements = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    icon: foodIcons[i % foodIcons.length],
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
    size: 0.8 + Math.random() * 0.4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50" />
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-50/30 via-transparent to-green-50/30" />
      
      {/* Floating Food Icons */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute text-2xl opacity-20 animate-float"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
            transform: `scale(${element.size})`,
          }}
        >
          {element.icon}
        </div>
      ))}
      
      {/* Geometric Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-lg animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-lg animate-bounce" style={{ animationDuration: '4s', animationDelay: '2s' }} />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default FloatingBackground;
