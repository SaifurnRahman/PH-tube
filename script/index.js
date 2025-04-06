function loadCategories() {
    //fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        //covert it to json
        .then((res) => res.json())

        // send the data to display
        .then((data) => displayCategories(data.categories))
}

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((response) => response.json())
        .then((data) => {
            removeActiveClass();
            document.getElementById('btn-all').classList.add('active');
            displayVideos(data.videos);
        });
}

function removeActiveClass() {
    activeButton = document.getElementsByClassName("active")
    for (let btn of activeButton) {
        btn.classList.remove("active");
    }
}

const loadCategoryVideos = (id) => {

    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    // console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass();

            const clickButton = document.getElementById(`btn-${id}`);
            clickButton.classList.add('active');
            displayVideos(data.category) 
        })
}


function displayCategories(categories) {
    // get the container
    const categoryContainer = document.getElementById('category-container')
    // use for loop for selact all category
    for (let cat of categories) {
        // console.log(cat);
        // create element
        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-red-600 hover:text-white">${cat.category}</button>
        `;

        // display it
        categoryContainer.append(categoryDiv);
    }
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container')

    videoContainer.innerHTML = " "

    if (videos.length == 0) {
        videoContainer.innerHTML = `
     <div class="col-span-full flex flex-col justify-center items-center p-20">
        <img class="w-[120px]" src="assets/Icon.png" alt="">
        <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
    </div>
    
    `
        return;
    }

    videos.forEach((video) => {
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
    <div class="card">
            <figure class="relative">
                <img class="w-full h-[150px] object-cover " src="${video.thumbnail}" />
                <span class="absolute p-1 bg-black text-white rounded-sm text-xs right-2 bottom-2">3hrs 56 min ago</span>
            </figure>
            <div class=" flex gap-5 py-5 items-start">
               <div class="profile">
                <div class="avatar">
                    <div class="ring-primary w-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
               </div>
                <div class="space-y-1">
                    <h2 class="card-title text-xl font-semibold">${video.title}</h2>
                    <p class="text-sm text-gray-400">${video.authors[0].profile_name}</p>
                    <p class="text-sm text-gray-400">${video.others.views}views</p>
                </div>
            </div>
        </div>
    `;

        videoContainer.append(videoCard)

    })

}


loadCategories()







// {
//     "category_id": "1003",
//     "video_id": "aaaf",
//     "thumbnail": "https://i.ibb.co/5LRQkKF/stick-and-stones.jpg",
//     "title": "Sticks & Stones",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/rdTZrCM/dev.jpg",
//             "profile_name": "Dave Chappelle",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "113K",
//         "posted_date": ""
//     },
//     "description": "Dave Chappelle's 'Sticks & Stones' has garnered 113K views and remains a controversial yet highly engaging piece of stand-up comedy. Known for his fearless approach, Dave dives into a wide range of topics, delivering his unique perspective with wit and sharp humor. As a verified artist, Dave's comedy is raw, honest, and unapologetically funny."
// }