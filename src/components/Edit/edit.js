import React, { useState } from 'react';

export default function Edit(props) {

    const [title, setTitle] = useState(props.location.state.title);
    const [text, setText] = useState(props.location.state.text);

    const redirect = () => {
        props.history.push('/');
    }

    const editPost = (title, text) => {
        props.edit(props.location.state.id, title, text);
    }

    return (
        <div className='container'>
            <div className="field">
                <label className="label">Title</label>
                <div className="control">
                    <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
            </div>

            <div className="field">
                <label className="label">Text</label>
                <div className="control">
                    <textarea className="textarea" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button onClick={() => editPost(title, text)} className="button is-link">Submit</button>
                </div>
                <div className="control">
                    <button onClick={redirect} className="button is-link is-light">Cancel</button>
                </div>
            </div>
        </div>
    );
}