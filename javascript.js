    // JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const itemsPerPage = 10;
    let currentPage = 1;
    let currentItems = [];

    var headers = [];

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
                headers = rows[0].split(',');

                // Filter rows based on search string
                items = rows.filter(row => row.toLowerCase().includes(searchString));

                // Display filtered data
                displayPage(1,headers);
            });
        });

        function displayPage(pageNumber, headers) {
            const start =(pageNumber - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageItems =items.slice(start, end);

                

            
                // Display filtered data
            const tableBody = document.querySelector('#bookTable tbody');
            tableBody.innerHTML = ''; // Clear previous results
            pageItems.forEach(row => {
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

                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'btn btn-primary';
                    button.dataset.toggle = 'modal';
                    button.dataset.target = '#Modal';
                    button.textContent = 'Open Modal';
                    tdTitle.appendChild(button);
                    
                    
            
                    tableBody.appendChild(tr);
                    
                    // event lisner for modal button
                    button.addEventListener('click', function() {
                        var myModal = new bootstrap.Modal(document.getElementById('Modal'), {})
                        

                        //creat the title of the modal
                        const modal = document.querySelector('#Modal');
                        const modalTitle = modal.querySelector('.modal-dialog .modal-content .modal-header .modal-title');
                        
                        modalTitle.textContent = item['title'];


                        //creat the image of the modal
                        const isbn = item['isbn13'];
                        const coverImage = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
                        const img = document.querySelector('.modal-dialog .modal-content .modal-body img');                    
                        img.src = coverImage;//change image atribute
                        //insert book title 
                        const bookTitle = document.querySelector(' .modal-dialog .modal-content .container .row .col-sm h3');
                        bookTitle.textContent = item['title'];
                        
                        //insert book author

                        const bookAuthor = document.querySelector(' .modal-dialog .modal-content .container .row .col-sm .author');
                        bookAuthor.textContent = item['authors'];

                        //insert book description
                        
                        // function to get description using google books api (got from internet)
                        function getBookByISBN(isbn) {
                            fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
                                .then(response => response.json())
                                .then(data => {
                                    if (data.items) {
                                        let book = data.items[0].volumeInfo;
                                    
                                        // Insert the book description into the modal
                                        const bookDescription = document.querySelector('#Modal .modal-dialog .modal-content .container .row .col-sm .description');
                                        bookDescription.textContent = book.description;
                                    } else {
                                        console.log('No results for this ISBN'); //console log error
                                    }
                                })
                                .catch(error => console.error('Error:', error));
                        }
                        
                        getBookByISBN(isbn);

                        //insert book rating
                        const bookRating = document.querySelector(' .modal-dialog .modal-content .container .row .col-sm .rating');
                        bookRating.textContent = item['ratings_count'];



                        myModal.show();
                        
            
                        



                    });

                });
            }
                // Add event listeners to your "Next" and "Previous" buttons
            document.getElementById('nextButton').addEventListener('click', function() {
                if (currentPage < Math.ceil(items.length / itemsPerPage)) {
                    currentPage++;
                    displayPage(currentPage,headers);
                }
            });

            document.getElementById('prevButton').addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    displayPage(currentPage,headers);
                }
            });


        })
    .catch(error => console.error('Error:', error));


    //reset



