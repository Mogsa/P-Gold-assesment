// JavaScript
document.getElementById('searchButton').addEventListener('click', function(e) {
    e.preventDefault();
    const searchBar = document.getElementById('searchBar');
    const searchString = searchBar.value.toLowerCase();
    

    // Fetch data from your CSV file
    fetch('books.csv') 
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const rows = data.split('\n');
            const headers = rows[0].split(',');

            // Filter rows based on search string
            const filteredRows = rows.filter(row => row.toLowerCase().includes(searchString));

            

           
            // Display filtered data
            const tableBody = document.querySelector('#bookTable tbody');
            tableBody.innerHTML = ''; // Clear previous results
            filteredRows.forEach(row => {
                const rowData = row.split(',');
                const item = headers.reduce((obj, header, i) => {
                    obj[header] = rowData[i];
                    return obj;
                }, {});

                // Create a new table row
                const tr = document.createElement('tr');

                // Display cover image
                const isbn = item['isbn13']; 
                const coverImage = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
                const img = document.createElement('img');
                img.src = coverImage;
                img.classList.add('img-thumbnail')
                const tdCover = document.createElement('td');
                tdCover.appendChild(img);
                tr.appendChild(tdCover);

                
                // Display title
                const tdTitle = document.createElement('td');
                tdTitle.style.verticalAlign = 'top';
                const a = document.createElement('a');
                a.href = `https://openlibrary.org/isbn/${isbn}`;
                const h1 = document.createElement('h1');
                h1.textContent = item['title'];
                a.appendChild(h1); // Append the heading to the link
                tdTitle.appendChild(a); // Append the link to the title cell
                tr.appendChild(tdTitle);
                

                // Display author
                const br1 = document.createElement('br');
                const span1 = document.createElement('span');
                span1.textContent = `by ${item['authors']}`;
                tdTitle.appendChild(br1);
                tdTitle.appendChild(span1);
                
                // Display ratings to work on later
                /*
                const br2 = document.createElement('br');
                const span2 = document.createElement('span');
                const  ratingsCount = item['ratings_count'];
                for (let i = 0; i < ratingsCount; i++) {
                    span2.textContent += '★';
                }
                tdTitle.appendChild(br2);
                tdTitle.appendChild(span2);
                */
                
        
                tableBody.appendChild(tr);
            });


        

        

        })
        .catch(error => console.error('Error:', error));
});

