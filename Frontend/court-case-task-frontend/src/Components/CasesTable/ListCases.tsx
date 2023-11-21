import React, { useState,useEffect } from 'react';
import axios from "axios";
import './ListCases.css';
import { GET_ALL_CASES_URL } from '../../config';

export const ListCases = () => {

    const [cases, setCases]: [Array<string>, React.Dispatch<Array<string>>] = useState(['']);

  useEffect(() => {
    axios({
        method: 'get',
        url: GET_ALL_CASES_URL
    }).then((response: any) => {
        if(response.status===200)
        {
            console.log(response.data.cases);
            setCases(response.data.cases);
        }
    }).catch((err: any) => {
        if(err.response.status===500)
        {
          alert("Error while fetching cases");
        }
    })
  })

  return (
    <div className='tableBox'>
      <h2 className='tableH'>List of Cases</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Start Date</th>
            <th>Is Finished</th>
            <th>FX Field</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseItem: any, index: number) => (
            <tr key={index}>
              <td>{caseItem.customerName}</td>
              <td>{caseItem.startDate}</td>
              <td>{caseItem.isFinished ? 'Yes': 'No'}</td>
              <td>{caseItem.fxField}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCases;
