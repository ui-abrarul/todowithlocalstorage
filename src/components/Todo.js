import React, { useState, useEffect } from 'react'
import todo from '../images/todo.svg'


const getLocalItems = () => {
    let list = localStorage.getItem('lists')

    if (list) {
        return JSON.parse(localStorage.getItem('lists'))
    } else {
        return []
    }
}

function Todo() {

    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState(getLocalItems())
    const [toggleSubmit,setToggleSubmit] = useState(true)

    const [isEditItem,setIsEditItem] = useState(null)


    const addItem = () => {
        if (!inputData) {
        } else if(inputData && !toggleSubmit) {

            setItems(items.map((elem) => {
                    if(elem.id === isEditItem){
                        return {...elem,name: inputData}
                    }
                    return elem;
            }
            ))
            setToggleSubmit(true)
        setInputData('')
        setIsEditItem(null);


        } else {
            const allInputData = {
                id: new Date().getTime().toString(), name: inputData
            }

            setItems([...items, allInputData])
            setInputData('')
        }
    }

    const deleteItem = (id) => {

        const updateditems = items.filter((elem) => {
            return elem.id !== id
        })
        setItems(updateditems)
    }


    const editItem = (id) => {
        let newEditItems = items.find((elem) => {
            return elem.id === id
        })
        console.log(newEditItems)
        setToggleSubmit(false)
        setInputData(newEditItems.name)
        setIsEditItem(id);
    }


    const removeAll = () => {
        setItems([])
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src={todo} alt="todologo" />
                        <figcaption>Add your list here</figcaption>
                    </figure>

                    <div className='addItems'>
                        <input
                            type="text"
                            placeholder='Add Items...'
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                      {toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>
                    :
                    <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>  
                    
                    }
                    </div>

                    <div className='showItems'>

                        {items.map((elem) => {
                            return (
                                <div className='eachItem' key={elem.id}>
                                    <h3>{elem.name}</h3>
                                    <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                        {
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>

                                        }  
                                        
                                        </div>
                                </div>
                            )
                        })}


                    </div>

                    {/* clear all button  */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> CHECK LIST </span> </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Todo