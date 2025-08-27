import React from 'react'

const NavItem = ({ active, icon, label }) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border ${
      active
        ? 'bg-yellow-400/20 border-yellow-300 text-gray-900'
        : 'bg-white border-gray-200 text-gray-600'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-semibold">{label}</span>
  </button>
)

const WebSidebar = () => {
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r p-4 gap-4 fixed h-screen">
      {/* Brand */}
      <div className="flex items-center gap-2 text-2xl font-extrabold tracking-wide">
        <span>🍽️</span>
        <span>Chefle</span>
      </div>

      {/* User Info */}
      <div className="mt-2 flex items-center gap-3 px-2">
        <img
          src="https://i.pravatar.cc/60"
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div className="font-semibold text-gray-900">Theresa Webb</div>
          <div className="text-xs text-gray-500">Master Chef</div>
        </div>
      </div>

      {/* Nav Items */}
      <div className="mt-2 grid gap-2">
        <NavItem active icon="🧾" label="Recipes" />
        <NavItem icon="❤️" label="Favorites" />
        <NavItem icon="🎓" label="Courses" />
        <NavItem icon="👥" label="Community" />
      </div>

      {/* Decorative Image - moved slightly up */}
      <div className="mt-6 px-2">
        <img
          src="src/assets/cooking.png"
          alt="decor"
          className="w-full max-h-40 object-contain"
        />
      </div>
    </aside>
  )
}

export default WebSidebar
