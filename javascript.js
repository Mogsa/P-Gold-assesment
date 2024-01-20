document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from CSV file
    fetch('books.csv')
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const rows = data.split('\n');
            const headers = rows[0].split(',');

            // Create table header
            const table = document.getElementById('bookTable');
            const headerRow = table.insertRow(0);

            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            // Populate table with data
            for (let i = 1; i < rows.length; i++) {
                const rowData = rows[i].split(',');
                const row = table.insertRow(i);

                rowData.forEach(cellData => {
                    const cell = row.insertCell();
                    cell.textContent = cellData;
                });
            }
        })
        .catch(error => console.error('Error fetching CSV:', error));
});
