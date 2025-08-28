import React from 'react'
import WebSidebar from './WebSidebar'
import WebHeaderBar from './WebHeaderBar'
import WebCategoryTabs from './WebCategoryTabs'
import WebSwipeStack from './WebSwipeStack'

const WebShell = ({ query, onQuery, recipes, onOpen, children, activeCategory='pizza', onCategory, onSave, onDiscard, cookLaterCount = 0, onShowCookLater }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex">
        <WebSidebar />
        <main className="flex-1 md:ml-64">
          <WebHeaderBar 
            query={query} 
            onQuery={onQuery} 
            cookLaterCount={cookLaterCount}
            onShowCookLater={onShowCookLater}
          />
          <div className="px-6">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-center">Learn, Cook, & Eat your food</h1>
              <div className="flex justify-center mb-4">
                <WebCategoryTabs active={activeCategory} onPick={onCategory} />
              </div>

              {/* Swipe Stack for recipes */}
              <div className="mt-8 mb-8">
                {recipes.length > 0 && (
                  <WebSwipeStack 
                    items={recipes} 
                    onSave={onSave} 
                    onDiscard={onDiscard} 
                    onOpen={onOpen} 
                  />
                )}
              </div>

              <div className="mt-8">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default WebShell
