const loading_icon = require('../assets/images/loading_logo.gif')

export default function Loading(){
    return(
        <div className='w-full h-full flex justify-center items-center'>
            <img src={loading_icon} alt="loading" className='w-20'/>
        </div>
    )
}