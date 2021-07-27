window.onload = event => {
    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            console.log("Signed in as " + user.displayName);
            const googleUserId = user.uid;
            getNotes(googleUserId);
        } else {
            // User is signed out
            window.location = "index.html";
        }
    });

    const getNotes = (userId) => {
        const notesRef = firebase.database().ref(`users/${userId}`);
        notesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            renderDataAsHtml(data);
        });
    }

    const renderDataAsHtml = (data) => {
        let cards = ``;
        const display = document.querySelector("#app");
        for(const noteItem in data) {
            const note = data[noteItem];
            console.log(`${note.title} ${note.text}`);
            console.log(createCard(note));
            cards += createCard(note);
        }
        display.innerHTML = cards;
    }

    const createCard = (note) => {
        return `
            <div class="column is-one-quarter">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">${note.title}</p>
                        <span class="icon">
                            <i class="fas fa-${note.label}"></i>
                        </span>    
                    </header>
                    <div class="card-content">
                        <div class="content">${note.text}</div>
                    </div>
                </div>
            </div>
        `;
    }
}