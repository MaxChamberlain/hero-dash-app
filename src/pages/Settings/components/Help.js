import { useState, useEffect } from "react"
import Articles from "./Articles"

export default function General(){
    const [filter, setFilter] = useState('');

    return (
        <div className='text-slate-900'>
            <h1>Help</h1>
            <div className='flex justify-between'>
                <input
                    className='w-1/2 p-2 rounded border border-slate-900'
                    type='text'
                    placeholder='Search'
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    autoFocus
                />
            </div>
            <Articles filter={filter} />
        </div>
    )
}