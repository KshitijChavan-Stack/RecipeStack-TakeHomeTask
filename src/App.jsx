import { useState, useEffect } from 'react'
import './App.css'

// Mobile UI
import MobileHomeHeader from './components/mobile/MobileHomeHeader'
import MobileRecipeDetails from './components/mobile/RecipeBottomSheet'
import MobileSwipeStack from './components/mobile/MobileSwipeStack'

// Shared
import DecorLayer from './components/DecorLayer'
import FixedDecor from './components/FixedDecor'

// Web shell (sidebar + header) and classic components inside
import WebShell from './components/web/WebShell'
import RecipeGrid from './components/RecipeGrid'
import ErrorMessage from './components/ErrorMessage'
import LoadingSpinner from './components/LoadingSpinner'
import NoResults from './components/NoResults'
import PopularRecipes from './components/PopularRecipes'
import QuickSearch from './components/QuickSearch'

// Services
import { recipeService } from './services/recipeService'

function App() {
  const [ingredient, setIngredient] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isMobile, setIsMobile] = useState(true)
  const [openId, setOpenId] = useState(null)
  const [cookLater, setCookLater] = useState([])
  const [showCookLater, setShowCookLater] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (ingredient.trim()) return

    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const all = await recipeService.getAllRecipes()
        if (!cancelled) setRecipes(all)
      } catch (e) {
        if (!cancelled) {
          setRecipes([])
          setError('Failed to load recipes')
        }
      } finally { if (!cancelled) setLoading(false) }
    }
    load()
    return () => { cancelled = true }
  }, [ingredient])

  useEffect(() => {
    if (!ingredient.trim()) return

    const handle = setTimeout(async () => {
      setLoading(true)
      setError('')
      try {
        const results = await recipeService.searchByIngredient(ingredient.trim())
        setRecipes(results)
      } catch (_) {
        setRecipes([])
        setError('Failed to fetch recipes. Please try again.')
      } finally { setLoading(false) }
    }, 350)

    return () => clearTimeout(handle)
  }, [ingredient])

  const loadingNode = <div className="px-4 py-6 text-center text-gray-500 text-sm">Loading recipes...</div>

  const handleSave = (r) => {
    setCookLater((list) => (list.find(x => x.id === r.id) ? list : [...list, r]))
  }
  const handleDiscard = () => {}

  // Unified mobile layout with swipe stack
  const MobileLayout = (
    <div className="max-w-md mx-auto pb-10">
      <DecorLayer />
      {/* Top-right decor.png */}
      <FixedDecor variant="main" position="top-right" />
      {/* Bottom-left decor1.png */}
      <FixedDecor variant="alt" position="bottom-left" />

      <div className="sticky top-0 z-20 bg-gray-50/90 backdrop-blur px-4 py-2 flex items-center justify-between">
        <MobileHomeHeader query={ingredient} onQuery={setIngredient} />
        <button
          onClick={()=>setShowCookLater(true)}
          className="ml-2 shrink-0 bg-white rounded-full p-2 shadow text-red-500"
          title="Cook later"
        >❤️</button>
      </div>

      <div className="px-4 mt-2 mb-4">
        <QuickSearch onQuickSearch={setIngredient} />
      </div>

      <div className="px-4 mb-6">
        <PopularRecipes isCollapsed />
      </div>

      <div className="px-4">
        {error && (<ErrorMessage error={error} />)}
        {loading && (<LoadingSpinner />)}
        {!loading && recipes.length > 0 && (
          <MobileSwipeStack items={recipes} onSave={handleSave} onDiscard={handleDiscard} onOpen={setOpenId} />
        )}
        {!loading && recipes.length === 0 && !error && (<NoResults />)}
      </div>

      {/* Cook later simple sheet */}
      {showCookLater && (
        <div className="fixed inset-0 z-40">
          <button className="absolute inset-0 bg-black/40" onClick={()=>setShowCookLater(false)} />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[92%] max-w-md bg-white rounded-2xl shadow-xl p-4 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Cook later ({cookLater.length})</h3>
              <button className="text-sm text-gray-500" onClick={()=>setShowCookLater(false)}>Close</button>
            </div>
            <ul className="space-y-3">
              {cookLater.map(r => (
                <li key={r.id} className="flex items-center gap-3">
                  <img src={r.image} alt={r.name} className="w-12 h-12 rounded object-cover" />
                  <div className="text-sm flex-1">{r.name}</div>
                </li>
              ))}
              {cookLater.length===0 && <div className="text-xs text-gray-500">No saved recipes yet.</div>}
            </ul>
          </div>
        </div>
      )}

      <MobileRecipeDetails recipeId={openId} open={Boolean(openId)} onClose={()=>setOpenId(null)} />
    </div>
  )

  // Web layout wrapped in WebShell to show sidebar + search bar + user name
  const WebLayout = (
    <>
      <DecorLayer />
      {/* Top-right decor.png */}
      <FixedDecor variant="main" position="top-right" />
      {/* Bottom-left decor1.png */}
      <FixedDecor variant="alt" position="bottom-left" />

      <WebShell query={ingredient} onQuery={setIngredient} recipes={recipes} onOpen={setOpenId}>
        {/* Quick search below the shell header */}
        <div className="mt-2 mb-4">
          <QuickSearch onQuickSearch={setIngredient} />
        </div>

        {/* Most popular bar directly under search */}
        <div className="mb-6">
          <PopularRecipes isCollapsed />
        </div>

        <div className="mt-4">
          {error && (<ErrorMessage error={error} />)}
          {loading && (<LoadingSpinner />)}
          {!loading && recipes.length > 0 && (
            <RecipeGrid recipes={recipes} ingredient={ingredient || 'All'} />
          )}
          {!loading && recipes.length === 0 && !error && (<NoResults />)}
        </div>

        <MobileRecipeDetails recipeId={openId} open={Boolean(openId)} onClose={()=>setOpenId(null)} />
      </WebShell>
    </>
  )

  return (
    <div className="app">
      {isMobile ? MobileLayout : WebLayout}
    </div>
  )
}

export default App
