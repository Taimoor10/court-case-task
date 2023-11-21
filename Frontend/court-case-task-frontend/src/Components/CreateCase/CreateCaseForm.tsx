import React, { ReactNode, useState } from 'react';
import '../Box/Box.css';
import axios from 'axios';
import { CREATE_CASE_URL } from '../../config';

type FormData = {
    customerName: string,
    startDate: string,
    isFinished: boolean
}

export const CreateCaseForm = () => {
    
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({
        customerName: '',
        startDate: '',
        isFinished: false
    })

    const handleNext = () => {
        console.log(formData);
        setStep((step) => step + 1);
    }

    const handleBack = () => {
        setStep((step) => step - 1);
    }

    const handleInputChange = (field: string, value: string | boolean) => {
        if (field === 'startDate' && typeof value === 'string') {
            const formattedDate = new Date(value).toISOString().split('T')[0];
            console.log(formattedDate);
            setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));
        } else {
            setFormData((prevData) => ({ ...prevData, [field]: value }));
        }
    }

    const handleSubmit = () => {
        axios({
            method: 'post',
            url:CREATE_CASE_URL,
            data: formData
        }).then((response: any) => {
            if (response.status === 200) {
                setFormData({
                    customerName: '',
                    startDate: '',
                    isFinished: false
                });

                alert("Case added successfully");
                window.location.href = "/";
            }
        });
    }

    const renderStep = (): ReactNode => {
        switch(step)
        {
            case 1:
                return (
                    <div className='box'>
                        <h2 className='h2'>Create a new Case</h2>

                        <label className='label' htmlFor='customerName'> Customer Name: </label> 
                        <input className='input' type='text' id='customerName' value={formData.customerName}
                            onChange={(e) => handleInputChange('customerName', e.target.value)} placeholder='Customer Name' />
                        <div>
                            {formData.customerName ?
                                <button className='button' title='Next' id='nextButton' type='button' onClick={handleNext}>Next</button>:
                                <button className='button' disabled title='Next' id='nextButton' type='button'>Next</button>
                            }
                         </div>
                    </div>
                );
            case 2:
                return  (
                    <div className='box'>
                        <h2 className='h2'>Create a new Case</h2>

                        <label className='label' htmlFor='startDate'> Start Date: </label> 
                        <input className='input' type='date' value={formData.startDate}
                            onChange={(e) => handleInputChange('startDate', e.target.value)} id='startDate' placeholder='Start Date' />
                        <div>
                            <button className='button' title='Back' id='backButton' type='button' onClick={handleBack}>Back</button>
                            {formData.startDate ?
                                <button className='button' title='Next' id='nextButton' type='button' onClick={handleNext}>Next</button>:
                                <button className='button' disabled title='Next' id='nextButton' type='button'>Next</button>
                            }
                        </div>
                    </div>
                )
            case 3:
                return  (
                    <div className='box'>
                        <h2 className='h2'>Create a new Case</h2>

                        <label className='label'> Case Finished ? : </label> 
                        <input className='caseStatus' type='checkbox' id='caseStatus' checked={formData.isFinished}
                            onChange={(e) => handleInputChange('isFinished', e.target.checked)} placeholder='Case Status' />
                        <div>
                            <button className='button' title='Back' id='backButton' type='button' onClick={handleBack}>Back</button>
                            <button className='button' title='Finish' id='finishButton'
                                onClick={handleSubmit} type='button'>Finish</button>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div>{renderStep()}</div>
    )
}
