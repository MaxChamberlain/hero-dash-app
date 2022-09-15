import { useParams } from 'react-router-dom';
import UsesDHL from './articles/UsesDHL';
import UsesLoopReturns from './articles/UsesLoopReturns';

export default function HelpArticle(){
    const { page } = useParams();
    const pages = {
        'uses-dhl': UsesDHL,
        'uses-loop-for-returns': UsesLoopReturns
    }
    return(
        <div className='bg-white rounded w-11/12 h-full text-black text-2xl'>
            <div className='border-b border-slate-400 p-2 mb-5'>
                {page.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </div>
            <div className='p-10'>
                {pages[page]()}
            </div>
        </div>
    )
}