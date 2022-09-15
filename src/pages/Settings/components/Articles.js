import { Link } from 'react-router-dom'

export default function Articles({ filter }){

    const articles = [
        {
            title: 'Uses DHL Setting',
            description: 'This setting determines whether or not your company uses DHL for shipping.',
            link: '/help/uses-dhl'
        },
        {
            title: 'Uses Loop For Returns Setting',
            description: 'This setting determines whether or not your company uses Loop to process returns.',
            link: '/help/uses-loop-for-returns'
        }
    ]
    return(
        <div>
            {articles.map((article, index) => {
                if(`${article.title}${article.description}`.toLowerCase().includes(filter.toLowerCase())){
                    return(
                        <div className='flex justify-between items-center p-2 border-b border-slate-200 bg-slate-200 my-4 rounded relative'>
                            <Link to={article.link}>
                                <h2 className='text-xl'>{article.title}</h2>
                                <p>{article.description}</p>
                            </Link>
                            <svg className='absolute right-0 top-0 mr-4 mt-4' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5L19 12L12 19" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    )
                }
            })}
        </div>
    )
}