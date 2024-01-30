    // JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const itemsPerPage = 10;
    let currentPage = 1;
    

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

                console.log(sortItems('desc', 'average_rating'));

            
            

                // Display filtered data
                displayPage(1);
            });
        });

        

        function displayPage(pageNumber) {
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
                    h1.style.fontSize = '25px'; 
                    a.appendChild(h1); // Append the heading to the link
                    tdTitle.appendChild(a); // Append the link to the title cell
                    tr.appendChild(tdTitle);
                    

                    // Display author
                    const br1 = document.createElement('br');
                    const span1 = document.createElement('span');
                    span1.textContent = `by: ${item['authors']}`;
                    span1.style.fontSize = '20px';
                    tdTitle.appendChild(br1);
                    tdTitle.appendChild(span1);

                    
                    

                    // display stars

                    const br2 = document.createElement('br');
                    const spanRating = document.createElement('span');
                    spanRating.id = 'starsContainer';
                
                    let rating= item['average_rating'];
                    spanRating.textContent = '';

                    let stars = '';
                    
                    let intP = Math.floor(rating);
                    let decP = rating - intP;
                
                
                     //display stars
                    for (let i=0; i< intP; i++){
                        
                        stars += '<img src="stars/star.10.png" class="star-image" >';
                                                      
                    }
                    //display half star
                    if (decP <= 0.5){
                        stars += '<img src="stars/star.3.png" class="star-image" >';
                    }else{
                        stars += '<img src="stars/star.6.png" class="star-image" >';
                    }
                     //display empty stars
                    let emptyStars = 5 - intP - 1;
                    
                    if(emptyStars >0){
                        for (let i=0; i< emptyStars; i++){
                            stars += '<img src="stars/star.0.png" class="star-image" >';
                        }
                    }
                    

                    spanRating.innerHTML = stars;
                    tdTitle.appendChild(br2);
                    tdTitle.appendChild(spanRating);

                    
                    // Display rating & rating count

                    
                    const span2 = document.createElement('span');
                    span2.textContent = `rating: ${item['average_rating']}     `;
                    const span3 = document.createElement('span');
                    span3.textContent = `ratings count: ${item['ratings_count']} --- text reviews count: ${item['text_reviews_count']} `;
                    
                    tdTitle.appendChild(span2);
                    tdTitle.appendChild(span3);

                    // display publication year
                    const br3 = document.createElement('br');
                    const span4 = document.createElement('span');
                    span4.textContent = `publication date: ${item['publication_date']}`;
                    tdTitle.appendChild(br3);
                    tdTitle.appendChild(span4);
                
                               

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
                        bookAuthor.style.fontSize = '20px';

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
                        const bookRatingStars = document.querySelector(' .modal-dialog .modal-content .container .row .col-sm .rating');
                        

                        //insert book rating count
                        const spanRating = document.createElement('span');
                        spanRating.id = 'starsContainer';
                
                        let rating= item['average_rating'];
                        bookRatingStars.textContent = '';

                        let stars = '';
                        
                        let intP = Math.floor(rating);
                        let decP = rating - intP;
                    
                    
                        //display stars
                        for (let i=0; i< intP; i++){
                            
                            stars += '<img src="stars/star.10.png" class="star-image" >';
                                                        
                        }
                        //display half star
                        if (decP <= 0.5){
                            stars += '<img src="stars/star.3.png" class="star-image" >';
                        }else{
                            stars += '<img src="stars/star.6.png" class="star-image" >';
                        }
                        //display empty stars
                        let emptyStars = 5 - intP - 1;
                        
                        if(emptyStars >0){
                            for (let i=0; i< emptyStars; i++){
                                stars += '<img src="stars/star.0.png" class="star-image" >';
                            }
                        }

                        stars += ' ---  rating count: '
                        stars += `<span class="Rating_count">(${item['ratings_count']})</span>`;
                        stars += ' --- text review count : '
                        stars += `<span class="Rating_count">(${item['text_reviews_count']})</span>`;
                        

                        bookRatingStars.innerHTML = stars;

                        //insert book publication date

                        const bookPublication = document.querySelector(' .modal-dialog .modal-content .container .row .col-sm .pages-PubDate');
                        bookPublication.textContent = '';
                        bookPublication.textContent += 'pages: ';
                        bookPublication.textContent += item['pages'];
                        bookPublication.textContent += ' --- publication date: ';
                        bookPublication.textContent += item['publication_date'];
                        bookPublication.textContent += ' --- publisher: ';
                        bookPublication.textContent += item['publisher'];



                        
                        //inset book isbn 10 & isbn13
                        const bookISBN = document.querySelector(' .modal-dialog .modal-content .container .row .col-sm .isbn');
                        bookISBN.textContent = '';
                        bookISBN.textContent += 'ISBN10: ';
                        bookISBN.textContent += item['isbn'];
                        bookISBN.textContent += ' --- ISBN13: ';
                        bookISBN.textContent += item['isbn13'];



                        
                        myModal.show();
                        
            

                    });
                });

                
            }
            



                // Add event listeners to "Next" and "Previous" buttons
            document.getElementById('nextButton').addEventListener('click', function() {
                if (currentPage < Math.ceil(items.length / itemsPerPage)) {
                    currentPage++;
                    displayPage(currentPage);
                }
            });

            document.getElementById('prevButton').addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    displayPage(currentPage);
                }
            });

            // Add event listeners to "Sort" buttons
            document.getElementById('sort-rtng-asc-btn').addEventListener('click', function() {
                console.log(sortItems('asc', 'average_rating'));
                sortItems('asc', 'average_rating');
                displayPage(currentPage);
                
            });
            document.getElementById('sort-rtng-desc-btn').addEventListener('click', function(){
                console.log(sortItems('desc', 'average_rating'));
                sortItems('desc', 'average_rating');
                displayPage(currentPage);
            });
            document.getElementById('sort-popl-asc-btn').addEventListener('click', function() {
                console.log(sortItems('asc', 'ratings_count'));
                sortItems('asc', 'ratings_count');
                displayPage(currentPage);
            });
            document.getElementById('sort-popl-desc-btn').addEventListener('click', function() {
                console.log(sortItems('desc', 'ratings_count'));
                sortItems('desc', 'ratings_count');
                displayPage(currentPage);
            });

            

            // document.getElementById('sort-asc-btn').addEventListener('click', function () {
            //     console.log('asc');
            // });

            

            




        })
        .catch(error => console.error('Error:', error));


    //reset



