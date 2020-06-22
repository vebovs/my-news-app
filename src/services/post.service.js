import axios from 'axios';

let API_URL = 'http://localhost:5000/';

if(process.env.NODE_ENV === 'production') {
    API_URL = '';   
}

class postService {

    async getPosts() {
        return await axios.get(API_URL)
        .then(res => {
            return res.data;
        }).catch(error => console.log(error));
    }

    async setPost(post) {
        return await axios.post(API_URL + 'post', {
            title: post.title,
            text: post.text
        }).then(res => {
            return res.data;
        }).catch(error => console.log(error));
    }

    async updatePost(post) {
        return await axios.patch(API_URL + 'update', {
            post
        }).then(res => {
            return res.data;
        })
        .catch(error => console.log(error));
    }

    async deletePost(id) {
        return await axios.delete(API_URL + 'delete/:' + id)
        .then(res => {
            return res.data;
        });
    }
}

export default new postService();