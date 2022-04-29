import { useState, useRef } from 'react'

function TagsInput( {existingTags} ){

    let [tags, setTags] = useState([])
    let updateTags = useRef(true)
    
    if (updateTags.current) {
        printExistingTags()
        updateTags.current = false
    }
    
    function printExistingTags() {
        for (let i = 0; i < existingTags.length; i++) {
            setTags([...tags, existingTags[i]])
        }
    }
    

    function handleKeyDown(e){
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
    }

    return (
        <div className="tags-input-container">
            { tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type somthing" />
        </div>
    )
}

export default TagsInput