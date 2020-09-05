import React from 'react';
import './ImageLinkForm.css';



const ImageLinkForm = ({cambiaInput, cliccaBottone}) => {
    return (
        <>
        <p className='f3'>
            {'This Magic Brain will detect faces in your picture. Give it a try.'}
        </p>
        <div className='center'>
            <div className='center form pa4 br3 shadow-5'>
            <input onChange={cambiaInput} placeholder="Paste the URL of Your Image here" className='f4 pa2 w-70 center' type='text'/>
            <button onClick={cliccaBottone} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
            </div>
        </div>
        </>
    );
}

export default ImageLinkForm;