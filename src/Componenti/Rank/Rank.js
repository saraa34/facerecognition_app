import React from 'react';


const Rank = ({name, entries}) => {
    return (
        <>
        <div className='white f3'>
            {`${name}, the number of images you have analyzed is...`}
        </div>
        <div className='white f1'>
            {entries}
        </div>
        </>
    );
}

export default Rank;