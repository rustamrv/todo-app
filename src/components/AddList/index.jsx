import React, { useEffect, useState } from 'react';
import List from '../List';
import Badge from '../Badge';
import addSvg from '../../assets/img/add.svg';
import closeSvg from '../../assets/img/close.svg';
import axios from 'axios';

import './AddList.scss';


const AddList = ({ colors, onAdd }) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id);
        }
    }, [colors])

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id)
    }
    const addList = () => {
        if (!inputValue) {
            alert('Введите название листа')
            return
        }
        setisLoading(true)
        axios.post("http://localhost:3001/lists", { name: inputValue, colorId: selectedColor }).then(({ data }) => {
            const color = colors.filter(c => c.id === selectedColor)[0].name;
            let newObj = { ...data, color: { name: color } }
            onAdd(newObj);
            onClose(); 
        }).catch(() => {

        }).finally(()=>{
            setisLoading(false);
        })
    }

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
            />
            {visiblePopup && (
                <div className='add-list__popup'>
                    <img
                        onClick={onClose}
                        src={closeSvg}
                        alt='Close popup'
                        className='add-list__popup-close-btn'
                    />
                    <input
                        value={inputValue}
                        onChange={e => {
                            setInputValue(e.target.value)
                        }}
                        className='field'
                        type="text"
                        placeholder='Название списка'
                    />
                    <div className="add-list__popup-colors">
                        {
                            colors.map(color => (
                                <Badge
                                    onClick={() => selectColor(color.id)}
                                    key={color.id}
                                    color={color.name}
                                    className={selectedColor === color.id && 'active'}
                                />
                            ))
                        }
                    </div>
                    <button onClick={addList} className='button'>
                        {isLoading ? "Добавление" : "Добавить"}
                    </button>
                </div>
            )}
        </div>

    )
};

export default AddList;