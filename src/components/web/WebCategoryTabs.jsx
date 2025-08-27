import React from 'react'

const WebCategoryTabs = ({ active='pizza', onPick }) => {
  const cats = ['Pizza','Dessert','Noodle','Cocktails','Salad']
  return (
    <div className="flex gap-3 flex-wrap">
      {cats.map(c => (
        <button
          key={c}
          onClick={()=>onPick?.(c.toLowerCase())}
          className={`px-4 py-2 rounded-full border text-sm ${active.toLowerCase()===c.toLowerCase() ? 'bg-black text-white border-black':'bg-white text-gray-700 border-gray-300'}`}
        >{c}</button>
      ))}
    </div>
  )}

export default WebCategoryTabs

