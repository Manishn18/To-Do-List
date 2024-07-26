import React, { useState } from 'react'
import './Main.css'

// Main component for the Todo List application
function Main() {
    // State variables to manage the input value, error message, and list of items
    const [item, setItem] = useState('') // Input value
    const [error, setError] = useState('') // Error message
    const [text, setText] = useState([]) // List of items
    const [checkedItems, setCheckedItems] = useState([]) // List of checked items' indices

    // Function to handle the submission of a new item
    const handleItems = (e) => {
        e.preventDefault() // Prevent the default form submission behavior

        // Check if the input value is empty
        if (item.trim() !== '') {
            // Add the new item to the list and reset the input value and error message
            setText([...text, item])
            setItem('')
            setError('')
        } else {
            // Set the error message if the input value is empty
            setError('Empty String cannot be added')
        }
    }

    // Function to handle the deletion of checked items
    const handleDelete = () => {
        // Filter out the checked items from the list and reset the checked items list
        setText(text.filter((_, index) => !checkedItems.includes(index)))
        setCheckedItems([])  // Reset checked items after deletion
    }

    // Function to handle the change of checkboxes
    const handleCheckboxChange = (index) => {
        // Check if the checkbox is checked
        if (checkedItems.includes(index)) {
            // If checked, remove the item from the checked items list
            setCheckedItems(checkedItems.filter(item => item !== index))
        } else {
            // If unchecked, add the item to the checked items list
            setCheckedItems([...checkedItems, index])
        }
    }

    return (
        <div className='container'> {/* Container for the entire component */}
            {error && <p className="error">{error}</p>} {/* Display the error message if there is one */}
            <form> {/* Form for adding new items */}
                <input 
                    type="text"
                    value={item} /* Bind the input value to the state variable */
                    onChange={(e) => setItem(e.target.value)} /* Update the state variable when the input value changes */
                    placeholder='Enter the item to add'
                    required 
                /> {/* Input field for adding new items */}
                <button type="submit" onClick={handleItems}>Add Item</button> {/* Button to submit the new item */}
                <button type="button" onClick={handleDelete}>Delete Item</button> {/* Button to delete checked items */}
            </form>
            <ul> {/* Unordered list for displaying the items */}
                {text.map((item, index) => (
                    <li key={index}> {/* List item for each item */}
                        {item} {/* Display the item */}
                        <input 
                            type="checkbox" 
                            checked={checkedItems.includes(index)} /*checks if the current item's index is in the checkedItems array It returns true if checkedItems includes the current index, indicating that the checkbox should be checked. Otherwise, it returns false. & The index is the current position of the item in the array. */
                            onChange={() => handleCheckboxChange(index)} /* Update the checked items list when the checkbox is changed */
                        /> {/* Checkbox for each item */}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Main
