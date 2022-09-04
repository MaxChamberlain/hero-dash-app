export default function Logout(){
    return(
        <div className='flex items-center justify-between w-full border-red-500 border-2 py-3 px-5 text-xl rounded cursor-pointer'
        onClick={() => {
            localStorage.removeItem('@ViDash:_userInfo')
            window.location.href = '/'
        }}>
            <p className='text-white'>Logout</p>
        </div>
    )
}