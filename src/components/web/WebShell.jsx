import React from 'react'
import WebSidebar from './WebSidebar'
import WebHeaderBar from './WebHeaderBar'
import WebCategoryTabs from './WebCategoryTabs'
import WebSwipeStack from './WebSwipeStack'

const WebShell = ({ query, onQuery, recipes, onOpen, children, activeCategory='pizza', onCategory, onSave, onDiscard, cookLaterCount = 0, onShowCookLater }) => {
  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-xl font-semibold text-gray-900">
                Recipe Finder
              </div>
              <WebCategoryTabs active={activeCategory} onPick={onCategory} />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:block max-w-md">
                <WebHeaderBar 
                  query={query} 
                  onQuery={onQuery} 
                  cookLaterCount={cookLaterCount}
                  onShowCookLater={onShowCookLater}
                />
              </div>
              <button
                onClick={onShowCookLater}
                className="relative bg-white border border-gray-300 text-gray-700 rounded-full p-3 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                title="Cook later"
              >
                <span className="text-lg">🤍</span>
                {cookLaterCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cookLaterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile search bar */}
          <div className="md:hidden mt-4">
            <WebHeaderBar 
              query={query} 
              onQuery={onQuery} 
              cookLaterCount={cookLaterCount}
              onShowCookLater={onShowCookLater}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default WebShell
