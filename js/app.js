import blogPost from "./blogPostData.js"
import Posts from "./Post.js"

const INCREMENT_OF_ADDED_POSTS = 3
const postsContainer = document.getElementById('posts-container')
const btnContainer = document.getElementById('btn-container')
const heroContainer = document.getElementById('hero')

let allPosts = ''

let numOfCurrentPosts = 6
let isAllPostsVisible = false

heroContainer.innerHTML = getBlogPostByIndex(0).getHeroPostHtml()
postsContainer.innerHTML = getRecentPostsHtml(6)

addEventListenerToPosts()

//general event listener
document.body.addEventListener('click', (event)=>{
    if(event.target.id === 'view-more'){
        postsContainer.innerHTML = getMorePosts()
        addEventListenerToPosts()
        if(isAllPostsVisible){
            btnContainer.innerHTML = `<button id="view-less" class="view-btn bold">View Less</button>`
        }
        window.scrollTo(0, document.body.scrollHeight);
    }
    else if(event.target.id === 'view-less'){
        btnContainer.innerHTML = `<button id="view-more" class="view-btn bold">View More</button>`
        postsContainer.innerHTML = getRecentPostsHtml(6)
        numOfCurrentPosts = 6
        isAllPostsVisible = false
        addEventListenerToPosts()
    }
    else if(event.target.id === 'about-nav'){
        heroContainer.innerHTML = getAboutPageHtml()
        postsContainer.innerHTML = getRecentPostsHtml(3)
        numOfCurrentPosts = 3
        addEventListenerToPosts()
    }
})
//adds an event listener to post cards
function addEventListenerToPosts(){
    const postBtn = document.querySelectorAll('[data-post]')
    postBtn.forEach(post => {
        post.addEventListener('click', postHandler)
    })
}

//Opens post if user clicks on the post card according to it's post-id attribute
function postHandler(event){
    const postId = Number(event.currentTarget.getAttribute('data-post'))
    const currentPost = getBlogPostById(postId).getPostHtml()
    heroContainer.innerHTML = currentPost
    postsContainer.innerHTML = getRecentPostsHtml(3)
    addEventListenerToPosts()
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    numOfCurrentPosts = 3
}
//Generates the most recent. The argument value is how many need to be generated
function getRecentPostsHtml(numOfRecentPosts){
    allPosts = ''
    let num = 0
    blogPost.slice(0, numOfRecentPosts).map(()=>{
        allPosts += getBlogPostByIndex(num).getPostCardHtml()
        num++
    })
    return allPosts
}
//Loops through blogPost and generates more posts for the user to see 
function getMorePosts(){
    numOfCurrentPosts += INCREMENT_OF_ADDED_POSTS
    let num = 0
    if(numOfCurrentPosts < blogPost.length){
        allPosts = ''
        blogPost.slice(0, numOfCurrentPosts).map(()=>{
            allPosts += getBlogPostByIndex(num).getPostCardHtml()
            num++
        })
        return allPosts
    }
    else{
        allPosts = ''
        num = 0
        blogPost.map(()=>{
            allPosts += getBlogPostByIndex(num).getPostCardHtml()
            num++
        })
        isAllPostsVisible = true
        return allPosts
    }
}

function getBlogPostById(postIdNum){
    for(let i = 0; i < blogPost.length; i++){
        if(blogPost[i].id === postIdNum){
            return new Posts(blogPost[i])
        } 
    }
}

function getBlogPostByIndex(postIndexNum){
    return new Posts(blogPost[postIndexNum])
}

function getAboutPageHtml(){
    return `
    <section class="container">
        <div class="about-intro flex">
            <img class="about-profile-img" src="images/image 18.png" alt="profile picture of learning journal author">
            <div class="flow">
                <h2>Hi there! My name is Roku and welcome to my learning journal.</h2>
                <p>After several months of learning in the Frontend Developer Career Path, 
                    I've made the big jump over to the Bootcamp to get expert code reviews of 
                    my Solo Projects projects and meet like-minded peers.
                </p>
            </div>
        </div>
        <div class="post-content">
            <h2>How I stay committed to learning</h2>
            <p>I like to think of myself as a lifelong learner. I used 
                to spend hours and hours learning, then try to create 
                simple projects using what I learned or work new techniques 
                into existing projects.
            </p>
            <p >While that was fun, I felt like it would be helpful to share 
                what I was learning and most things about my journey with the 
                world.
            </p>
            <h2>How I got started</h2>
            <p>I started simple and gradually grew my learning journal site. 
                I would take notes about what I was learning. After each 
                learning session, I'd use my notes to not only reflect 
                on what I learned but also write short summaries of what 
                I learned using my own words.
            </p>
            <p >That helped me grok what I was learning, and I realized that 
                posting my learning summaries was also helping others learn 
                and stay motivated.
            </p>
        </div>
    </section>
    `
}