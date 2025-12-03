import {logout, onChangeAuth} from './auth.js';
import { readEntries } from './firestore.js';

const logoutBtn = document.querySelector("#logout");
const messageDiv = document.getElementById("message");
const addEntryBtn = document.getElementById("addEntryBtn");

logoutBtn.addEventListener('click', async ()=> {
    try {
        await logout();
    }
    catch (error) {
        console.error("Logout failed", error);
        messageDiv.textContent = "Logout failed: " + error.message;
    }
})

//const results = await readEntries();
addEntryBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("Adding new entry");
    window.location.href = "entry-editor.html?mode=new";
})

onChangeAuth(async(user)=>{
    if (!user) {
        window.location.href = "index.html";
        return;
    }
    const results = await readEntries(user.uid);
    updateEntriesList(results);
    console.log(results);
})


function updateEntriesList(entries) {
    console.log("Updating entries list with entries:", entries);
    const entriesList = document.getElementById("entriesList");
    const noEntriesMsg = document.getElementById("noEntriesMsg");

    entriesList.innerHTML = ""; // Clear existing

    if (!entries || entries.length === 0) {
        noEntriesMsg.style.display = "block";
        return;
    }

    noEntriesMsg.style.display = "none";

    entries.forEach(entry => {
        const li = document.createElement("li");
        li.dataset.id = entry.id;

        li.innerHTML = `
            <div class="entry-title">${entry.title || '(Untitled)'}</div>
            <div class="entry-date">${entry.createdAt ? new Date(entry.createdAt.seconds * 1000).toLocaleDateString() : '-'}</div>
            <div class="entry-actions">
                <button class="editEntryBtn">Edit</button>
                <button class="deleteEntryBtn">Delete</button>
            </div>
        `;
        const editEntryBtn = li.querySelector(".editEntryBtn");
        const deleteEntryBtn = li.querySelector(".deleteEntryBtn");
        const viewEntry = li.querySelector(".entry-title");

        editEntryBtn.addEventListener('click', ()=>{
            console.log('editing entry');
            window.location.href = `entry-editor.html?mode=edit&id=${entry.id}`;
        })
        deleteEntryBtn.addEventListener('click', ()=>{
            if(confirm("R u sure?")){
                console.log('deleting entry');
            }
        })
        viewEntryBtn.addEventListener('click', ()=>{
            console.log('viewing entry');
            window.location.href = `entry-editor.html?mode=view&id=${entry.id}`;
        })
        entriesList.appendChild(li);
    });
}
