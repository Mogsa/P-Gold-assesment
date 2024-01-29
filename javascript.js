    // JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const itemsPerPage = 10;
    let currentPage = 1;
    let currentItems = [];

    var headers = [];
    let items = [];


    function sortItems(type = 'desc', criteria) {
        return items.sort((a, b) => {
            switch (type) {
                case 'asc':
                    if (a[criteria] < b[criteria]) {
                        return -1;
                    }
                    if (a[criteria] > b[criteria]) {
                        return 1;
                    }
                    return 0;
                default:
                    if (a[criteria] > b[criteria]) {
                        return -1;
                    }
                    if (a[criteria] < b[criteria]) {
                        return 1;
                    }
                    return 0;
            }
        }); 
    }
    

    document.getElementById('searchButton').addEventListener('click', function(e) {
        e.preventDefault();
        const searchBar = document.getElementById('searchBar');
        const searchString = searchBar.value.toLowerCase();
        
            
        
        // Fetch data from CSV file
        fetch('books.csv') 
            .then(response => response.text())
            .then(data => {
                // Parse CSV data
                const rows = data.split('\n');
                headers = rows[0].split(',');

                // rows to object

                items = rows.slice(1).map(row => {
                    const values = row.split(',');
                    let item = {};
                    headers.forEach((header, i) => {
                        item[header] = values[i];
                    });
                    return item;
                });

                // criteria for how well received a book is 
                // for (let i = 0; i < items.length; i++) {
                //     items[i]['bestness'] = parseInt(items[i]['ratings_count']) * parseInt(items[i]['text_reviews_count']);
                // }
                // console.log(items[5]['bestness']);
                // console.log(items[6]['bestness']);

        

                // Filter rows based on search string
                items = items.filter(item =>
                    item.title && 
                    typeof item.title === 'string' &&
                    item.title.toLowerCase().includes(searchString) 
                );
                
                

                const filterButton = document.getElementById('filterButton');

                // filterButton.addEventListener('click', () => {
                //     let ratingThreshold = document.getElementById('ratingThreshold').value;
                    
                // });



                // Display filtered data
                displayPage(1,headers);
            });
        });

        

        function displayPage(pageNumber, headers) {
            const start = (pageNumber - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageItems =items.slice(start, end);

                

            
                // Display filtered data
            const tableBody = document.querySelector('#bookTable tbody');
            tableBody.innerHTML = ''; // Clear previous results
            pageItems.forEach(item => {
                
                

                    // Create a new table row
                    const tr = document.createElement('tr');

                    // Display cover image
                    const isbn = item['isbn13']; 
                    const coverImage = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
                    const img = document.createElement('img');
                    img.src = coverImage;
                    img.classList.add('img-thumbnail')
                    img.alt = item['title'];
                    img.style.width = '150px';
                    
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
                    span1.textContent = `by: ${item['authors']}`;
                    tdTitle.appendChild(br1);
                    tdTitle.appendChild(span1);

                    

                    // Display rating & rating count

                    const br2 = document.createElement('br');
                    const span2 = document.createElement('span');
                    span2.textContent = `rating: ${item['ratings_count']}     `;
                    const span3 = document.createElement('span');
                    span3.textContent = `rating count: ${item['text_reviews_count']}`;
                    tdTitle.appendChild(br2);
                    tdTitle.appendChild(span2);
                    tdTitle.appendChild(span3);

                    // display publication year
                    

                    




                    
                    // Display ratings to work on later
                
                    // const spanRating = document.createElement('span');
                    // spanRating.id = 'starsContainer';
                    // spanRating.classList.add('rating');
                    // let rating= item['ratings_count'];
                    // spanRating.textContent = '';

                    // let stars = '';
                    
                    //     let intP = Math.floor(rating);
                    //     let decP = rating - intP;
                
                
                    //     //display stars
                    //     for (let i=0; i< intP; i++){
                    //         stars += '<span class="star"><img src="star.10.png></span>';
                                                      
                    //     }
                    //     //display half star
                    //     if (decP <= 0.5){
                    //         stars += '<span class="star"><img src="star.3.png></span>';
                    //     }else{
                    //         stars += '<span class="star"><img src="star.6.png></span>';
                    //     }
                    //     //display empty stars
                    //     for (let i=0; i< 5 - intP - 1; i++){
                    //         stars += '<span class="star"><img src="star.0.png></span>';
                    //     }
                    
                    // tdTitle.appendChild(spanRating);
                
                               

                    const br4 = document.createElement('br');
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'btn btn-primary';
                    button.dataset.toggle = 'modal';
                    button.dataset.target = '#Modal';
                    button.textContent = 'more info ';
                    tdTitle.appendChild(br4);
                    tdTitle.appendChild(button);
                    
                    
            
                    tableBody.appendChild(tr);
                    
                    // event lisner for modal button
                    button.addEventListener('click', function() {
                        var myModal = new bootstrap.Modal(document.getElementById('Modal'), {})
                        

                        //create the title of the modal
                        const modal = document.querySelector('#Modal');
                        const modalTitle = modal.querySelector('.modal-dialog .modal-content .modal-header .modal-title');
                        
                        modalTitle.textContent = item['title'];


                        //create the image of the modal
                        const isbn = item['isbn13'];
                        const coverImage = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
                        const img = document.querySelector('.modal-dialog .modal-content .modal-body img');                    
                        img.src = coverImage;
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
            



                // Add event listeners to "Next" and "Previous" buttons
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

            document.getElementById('sort-asc-btn').addEventListener('click', function (e) {
                console.log('asc');
            });




        })
        .catch(error => console.error('Error:', error));


    //reset



