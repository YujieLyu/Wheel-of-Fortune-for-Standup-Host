import React from 'react';
import './candidateList.scss';

const CandidateList = ({ allList, pieList, handleChange }) => {
    return allList.length > 0 ? (
        allList.map(ele =>
            <div key={ele.id} className='candidate-list'>
                <input type="checkbox"
                    checked={pieList.filter(e => e.name === ele.name).length > 0}
                    onChange={() => { handleChange(ele.name) }} >
                </input>
                <label htmlFor={ele.id}>{ele.name}</label>
            </div>
        )) : (<div>
            Loading...
        </div>)
}
export default CandidateList