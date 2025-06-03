

// Find all books in the 'Gothic Fiction' genre
db.books.find({genre:"Gothic Fiction"})


// Find all books published after 2004
db.books.find({published_year:{$gt:2004}})

// Find all books by author 'Herman Melville'
db.books.find({author:"Herman Melville"})


// Update the price of the book titled 'To Kill a Mockingbird' to 210
db.books.updateOne(
{title:"To Kill a Mockingbird"},
{$set:{price:210}}
)


// Delete the book titled 'Brave New World' from the collection
db.books.deleteOne({title:"Brave New World"})

// Find all books that are available im_stock and are above the year 2010
db.books.find({in_stock:true, published_year:{$gt:2010}})

//use projection to return only the title and author and price of all books
db.books.find({}, {title: 1, author: 1, price: 1})

//Implement sorting to display books by price (both ascending and descending)
// Ascending order by price
db.books.find().sort({price: 1})
// Descending order by price
db.books.find().sort({price: -1})

//Use the limit and skip methods to implement pagination (5 books per page)
// Page 1
db.books.find().skip((1-1)*5).limit(5)

//Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
     {
         $group: {
             _id: "$genre",  // Group by genre
             averagePrice: { $avg: "$price" }  // Calculate average price
         }
     }
 ])

//Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
    {
        $group: {
            _id: "$author",  // Group by author
            bookCount: { $sum: 1 }  // Count books per author
        }
    },
    {
        $sort: { bookCount: -1 }  // Sort by highest book count
    },
    {
        $limit: 1  // Get only the top author
    }
]);

//Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
    {
        $project: {
            decade: { $floor: { $divide: ["$publishedYear", 10] } } // Convert year to decade
        }
    },
    {
        $group: {
            _id: "$decade",
            bookCount: { $sum: 1 } // Count books per decade
        }
    },
    {
        $sort: { _id: 1 } // Sort decades in ascending order
    }
]);

//Create an index on the title field for faster searches
db.books.createIndex({ title: 1 })

//Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

//Use the explain() method to demonstrate the performance improvement with your indexes
db.books.find({ title: "Moby Dick" }).explain("executionStats")