
const swithTab = document.querySelector("[swithTab]");
const swithValue = document.querySelector("[swithValue]");
const swithImg = document.querySelector("[swithImg]");
const wrapper = document.querySelector("#wrapper");
const searchInput = document.querySelector(".searchinput");
const searchBtn = document.querySelector("[searchbtn]");
const root = document.documentElement.style;
// console.log(root);

function swithDark() {
    swithValue.innerText = 'LIGHT';
    swithImg.src = "./assets/images/sun-icon.svg";
    document.body.style.backgroundColor = ' #141d2f';
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    console.log("Light Theme");
}

function swithLight(){
    swithValue.innerText = 'DARK';
    swithImg.src = "./assets/images/moon-icon.svg";
    document.body.style.backgroundColor = " #f6f8ff";
    root.setProperty("--lm-bg", " #F6F8FF");
    root.setProperty("--lm-bg-content", " #FEFEFE");
    root.setProperty("--lm-text", " #4B6A9B");
    root.setProperty("--lm-text-alt", " #2B3442");
    root.setProperty("--lm-shadow-xl", " rgba(70, 88, 109, 0.25)");
    root.setProperty("--lm-icon-bg", "brightness(100%)");

    console.log("Dark Theme")

}

function swithFxn(){
    if((swithValue.innerText == 'DARK')){
        swithDark();
    }
    else {
        swithLight();
    }
}

swithTab.addEventListener('click', swithFxn);

const url = "https://api.github.com/users/";
//default admin username 
const admin_username = "sohelAnsari08";
receiveUserName(admin_username);

// to send username to apicall fxn to fetch data
function receiveUserName(username){
    apiCall(url, username);
}

// fxn to fetch data of username
async function apiCall(giturl, username) {
    try{
        const response =await fetch(giturl + username);
        const data = await response.json();

        console.log(data);
        renderUserdetails(data);
    }

    catch(e){
        alert("Error hai bhaiya")
    }
    
}

function renderUserdetails(data) {

    const profilePic = document.querySelector("[picLink]");
    const userName = document. querySelector(".user-name");
    const githubLink = document.querySelector(".github-link");
    const joinedDate = document.querySelector(".joined-date");
    const userBio = document.querySelector("[user-bio]");
    const repos = document.querySelector("#repos");
    const followers = document.querySelector("#followers");
    const following = document.querySelector("#following");
    const location = document.querySelector("#location");
    const websiteLink = document.querySelector("#website-link");
    const twitter = document.querySelector("#twitter");
    const company = document.querySelector("#company");

    //inserting data

    profilePic.src = data?.avatar_url;
    userName.innerText = (data?.name === null) ? `${searchInput.value}` : data?.name;
    githubLink.innerText = `@${data?.login}`;
    githubLink.href = data?.html_url;

    // Spliting the date
    const onlyDate = data?.created_at.split('T');
    joinedDate.innerText = `Joined ${onlyDate[0]}`;

    userBio.innerText = (data?.bio === null) ? "User has no bio" : data?.bio;
    repos.innerText = data?.public_repos;
    followers.innerText = data?.followers;
    following.innerText = data?.following;
    location.innerText = data?.location;
    websiteLink.innerText = (data?.blog === "") ? "Null" : data?.blog;
    twitter.innerText = (data?.twitter_username === null) ? "Null" : data?.twitter_username;
    company.innerText = (data?.company === null) ? "Null" : data?.company;

}



function searchData() {
    console.log("Search is working");
    if(searchInput.value === ""){
        alert("Enter GitHub Username");
        return;
    }
    const username = searchInput.value;
    receiveUserName(username);
}

searchBtn.addEventListener('click', searchData);


