class Posts {
    constructor(data)
    {
        Object.assign(this, data)
    }

    getHeroPostHtml(){
        const {id, name, date, thumbnail, summary} = this
        return `
        <div id="${id}" class="hero" style=" background-image: url(${thumbnail})">
            <div class="hero-text flow">
                <p class="date">${date}</p>
                <h1 class="blog-title">${name}</h1>
                <p class="blog-description">${summary}</p>
            </div>
        </div>
        `
    }

    getPostCardHtml(){
        const {id, name, date, thumbnail, summary} = this
        return `
        <div class="post-card" data-post="${id}">
            <img class="post-img" src="${thumbnail}">
            <p>${date}</p>
            <h2>${name}</h2>
            <p>${summary}</p>
        </div>
        ` 
    }

    getPostHtml(){
        const {name, date, thumbnail, summary, postContent} = this
        return ` 
        <article class="open-post-article container">
            <p class="date">${date}</p>
            <h1 class="blog-title">${name}</h1>
            <p class="blog-description">${summary}</p>
            <img src="${thumbnail}">
            <section id="post-content" class="post-content">
                ${postContent}
            </section>
        </article>

        <h2 class="container recent-post-h2">Recent Posts</h2>
        `
    }
}

export default Posts