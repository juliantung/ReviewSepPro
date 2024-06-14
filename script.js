function generateOutputs() {
    const reviewsInput = document.getElementById('reviews-input').value;
    const reviewLink = document.getElementById('review-link').value;
    const reviews = reviewsInput.split(/\n\n/);
    const outputContainer = document.getElementById('output-container');
    outputContainer.innerHTML = '';

    reviews.forEach((review, index) => {
        const outputDiv = document.createElement('div');
        outputDiv.className = 'output';
        outputDiv.id = `output-${index}`;

        const linkElement = document.createElement('p');
        linkElement.innerHTML = `Click: <a href="${reviewLink}" target="_blank">${reviewLink}</a>`;
        outputDiv.appendChild(linkElement);

        const reviewElement = document.createElement('p');
        reviewElement.textContent = review;
        outputDiv.appendChild(reviewElement);

        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.textContent = 'Copy';
        copyButton.onclick = () => copyToClipboard(review);
        outputDiv.appendChild(copyButton);

        const doneButton = document.createElement('button');
        doneButton.className = 'done-btn';
        doneButton.textContent = 'Mark as Done';
        doneButton.onclick = () => markAsDone(outputDiv);
        outputDiv.appendChild(doneButton);

        const undoneButton = document.createElement('button');
        undoneButton.className = 'undone-btn';
        undoneButton.textContent = 'Mark as Undone';
        undoneButton.onclick = () => markAsUndone(outputDiv);
        outputDiv.appendChild(undoneButton);

        outputContainer.appendChild(outputDiv);
    });

    updateStats();
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    }, () => {
        alert('Failed to copy!');
    });
}

function markAsDone(element) {
    element.classList.add('done');
    updateStats();
}

function markAsUndone(element) {
    element.classList.remove('done');
    updateStats();
}

function updateStats() {
    const totalReviews = document.querySelectorAll('.output').length;
    const doneReviews = document.querySelectorAll('.output.done').length;
    const undoneReviews = totalReviews - doneReviews;

    document.getElementById('total-reviews').textContent = totalReviews;
    document.getElementById('done-count').textContent = doneReviews;
    document.getElementById('undone-count').textContent = undoneReviews;
}

function saveData() {
    const outputs = document.querySelectorAll('.output');
    const data = Array.from(outputs).map(output => {
        return {
            link: output.querySelector('a').href,
            review: output.querySelector('p:nth-of-type(2)').textContent,
            done: output.classList.contains('done')
        };
    });
    const dataStr = JSON.stringify(data, null, 2);
    const dataOutput = document.getElementById('data-output');
    dataOutput.value = dataStr;
    copyToClipboard(dataStr);
}

function loadData() {
    const dataInput = document.getElementById('data-input').value;
    const outputContainer = document.getElementById('output-container');
    outputContainer.innerHTML = '';

    try {
        const data = JSON.parse(dataInput);
        data.forEach((item, index) => {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'output';
            if (item.done) {
                outputDiv.classList.add('done');
            }
            outputDiv.id = `output-${index}`;

            const linkElement = document.createElement('p');
            linkElement.innerHTML = `Click: <a href="${item.link}" target="_blank">${item.link}</a>`;
            outputDiv.appendChild(linkElement);

            const reviewElement = document.createElement('p');
            reviewElement.textContent = item.review;
            outputDiv.appendChild(reviewElement);

            const copyButton = document.createElement('button');
            copyButton.className = 'copy-btn';
            copyButton.textContent = 'Copy';
            copyButton.onclick = () => copyToClipboard(item.review);
            outputDiv.appendChild(copyButton);

            const doneButton = document.createElement('button');
            doneButton.className = 'done-btn';
            doneButton.textContent = 'Mark as Done';
            doneButton.onclick = () => markAsDone(outputDiv);
            outputDiv.appendChild(doneButton);

            const undoneButton = document.createElement('button');
            undoneButton.className = 'undone-btn';
            undoneButton.textContent = 'Mark as Undone';
            undoneButton.onclick = () => markAsUndone(outputDiv);
            outputDiv.appendChild(undoneButton);

            outputContainer.appendChild(outputDiv);
        });

        updateStats();
    } catch (error) {
        alert('Invalid data format');
    }
}


