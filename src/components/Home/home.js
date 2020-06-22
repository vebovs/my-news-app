import React, { useState } from 'react';

export default function Home(props) {

    const [posts, setPosts] = useState(props.posts);

    const redirect = (id, title, text) => {
        props.history.push({
            pathname: '/edit',
            state: {
                id: id,
                title: title,
                text: text
            }
        });
    }

    const remove = (id) => {
        setPosts(posts.filter(e => e.id !== id));
        props.remove(id);
    }

    return (
        <div className='container'>
            {
                posts.map((e) => 
                    <div key={ e.id } className='card'>
                        <header className='card-header'>
                            <p className='card-header-title'>
                                { e.title }
                            </p>
                        </header>
                        <div className='card-content'>
                            <div className='content'>
                                { e.text }
                            </div>
                        </div>
                        <footer className='card-footer'>
                            <button onClick={() => redirect(e.id, e.title, e.text)} className='card-footer-item button is-info'>Edit</button>
                            <button onClick={() => remove(e.id)} className='card-footer-item button is-danger'>Delete</button>
                        </footer>
                    </div>
                )
            }
        </div>
    );
}