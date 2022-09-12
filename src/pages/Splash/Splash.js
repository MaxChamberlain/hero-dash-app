import Header from './components/Header';
const bgImg = require('../../assets/images/splash_bg.png');

export default function HomePage(){
    return (
        <div className='text-slate-50'>
            <Header />
            <div className='absolute top-12 left-0 right-0 bottom-0 flex items-center justify-center' style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: 'cover',
                filter: 'blur(5px) brightness(0.5) contrast(1.5) saturate(1.5) grayscale(0.5) opacity(0.5)',
            }}></div>
            <div className='absolute top-12 left-0 right-0 bottom-0 flex items-center justify-center'>
                <div className='p-5 border-2 rounded bg-white text-black'>
                    <div className='text-3xl flex items-center justify-start w-full'>
                        <img src={require('../../assets/images/logo.png')} alt='logo' className='w-16' />
                        <div className='w-fit'>ViDash</div>
                    </div>
                    <div className='text-xl mt-5'>A data visualization dashboard for ShipHero</div>
                    <div className='flex justify-around mt-5'>
                        <div className='border-2 border-slate-700 rounded p-2 cursor-pointer' onClick={() => window.location.href = '/register'}>
                            <div className='text-xl'>Register</div>
                        </div>
                        <div className='border-2 border-slate-700 rounded p-2 cursor-pointer' onClick={() => window.location.href = '/login'}>
                            <div className='text-xl'>Login</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}