import React, { useState } from 'react';
import List from '../List';
import Badge from '../Badge';
import addSvg from '../../assets/img/add.svg';
import closeSvg from '../../assets/img/close.svg';

import './AddList.scss';


const AddList = ({ colors }) => {
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, selectColor] = useState(null)

    return (
        <div className='add-list'>
            <List
                onClick={() => setVisiblePopup(!visiblePopup)}
                items={
                    [
                        {
                            className: 'add-button',
                            icon: <img src={addSvg} alt="Add list" />,
                            name: "Добавить список",
                        },
                    ]}
                isRemovable
            />
            {visiblePopup && (
                <div className='add-list__popup'>
                    <img 
                        onClick={() => setVisiblePopup(false)} 
                        src={closeSvg} 
                        alt='Close popup' 
                        className='add-list__popup-close-btn' 
                    />
                    <input className='field' type="text" placeholder='Название списка' />
                    <div className="add-list__popup-colors">
                        {
                            colors.map(color => (
                                <Badge
                                    onClick={() => selectColor(color.id)}
                                    key={color.id}
                                    color={color.name}
                                    className={selectedColor == color.id && 'active'}
                                />
                            ))
                        }
                    </div>
                    <button className='button'>Добавить</button>
                </div>
            )}
        </div>

    )
};

export default AddList;