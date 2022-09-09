import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NavPage(){
    const [show, setShow] = useState(false);
    return(
        <motion.div className='text-lg bg-white p-2 rounded md:fixed top-200 right-0 pr-64 z-[9998] border-2 border-stone-400 hidden md:block text-black'
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            animate={{ x: show ? 200 : 320 }}
        >
            <div className='p-2 my-2'>Navigate To...</div>
            {show && <>
                <div className='p-2 bg-stone-300 rounded my-2 cursor-pointer' onClick={() => {
                        window.scrollTo({
                            top: document.getElementById('map-section').offsetTop - 60,
                            behavior: 'smooth',
                        });
                    }}
                >Map</div>
                <div className='p-2 bg-stone-300 rounded my-2 cursor-pointer' onClick={() => {
                        window.scrollTo({
                            top: document.getElementById('shipping-section').offsetTop - 60,
                            behavior: 'smooth',
                        });
                    }}
                >Shipping Details</div>
                <div className='p-2 bg-stone-300 rounded my-2 cursor-pointer' onClick={() => {
                        window.scrollTo({
                            top: document.getElementById('order-section').offsetTop - 60,
                            behavior: 'smooth',
                        });
                    }}
                >Order Details</div>
            </>}
        </motion.div>
    )
}