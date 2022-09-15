import { useContext } from 'react';
import { CompanyContext } from '../../../contexts/CompanyContext';
const step1 = require('../images/loopreturns/loop-step-1.png')
const step2 = require('../images/loopreturns/step2.png')
const step3 = require('../images/loopreturns/step3.png')
const step4 = require('../images/loopreturns/step4.png')

export default function UsesLoopReturns(){
    const { company } = useContext(CompanyContext);
    return(
        <div className='text-lg'>
            <p>This setting determines whether or not your company uses Loop to process returns.</p>
            <p>When this setting is enabled, the Loop returns KPI page will be visible.</p>
            <p>Data on returns is only gathered once the webhook is set up in the Loop Admin portal</p>
            <div className="mt-8 mb-3 text-center w-full border-b border-slate-300">How to configure</div>
            <div className="flex items-center justify-around">
                <img src={step1} alt="Step 1" className="w-1/2 mb-3 mx-auto"/>
                <img src={step2} alt="Step 2" className="w-1/2 mb-3 mx-auto"/>
            </div>
            <div className="flex items-center justify-around">
                <p className="mt-8 mb-16 text-center w-full border-b border-slate-300">1. Navigate to the Loop Admin portal and enter the "Settings" Section</p>
                <p className="mt-8 mb-16 text-center w-full border-b border-slate-300">2. Navigate into the "Developers" section of the settings page</p>
            </div>
            <div className="flex items-center justify-around">
                <img src={step3} alt="Step 1" className="w-1/2 mb-3 mx-auto"/>
                <img src={step4} alt="Step 2" className="w-1/2 mb-3 mx-auto"/>
            </div>
            <div className="flex items-end justify-around">
                <p className="mt-8 mb-16 text-center w-full border-b border-slate-300">3. Click the "Create webhook" Button to open the menu</p>
                <p className="mt-8 mb-16 text-center w-full border-b border-slate-300">4. Ensure the "Event" field shows "Return Created", the "Response" field shows "Return", and the "URL" field shows the following url: <br /> <span className='bg-stone-100 text-sm'>https://vidash-api-server.herokuapp.com/loopreturns/{company && company.company_code}/insert</span></p>
            </div>
            <p className="mt-8 mb-16 text-center w-full border-b border-slate-300">5. Repeat step 3 and 4, but on this second webhook, ensure the "Event" field shows "Return Updated", the "Response" field shows "Return", and the "URL" field shows the following url: <br /> <span className='bg-stone-100 text-sm'>https://vidash-api-server.herokuapp.com/loopreturns/{company && company.company_code}/update</span></p>
        </div>
    )
}